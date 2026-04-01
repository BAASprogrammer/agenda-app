package com.agendaapp.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.agendaapp.app.dto.AppointmentRequest;
import com.agendaapp.app.service.AppointmentAlreadyExistsException;
import com.agendaapp.app.service.AppointmentService;
import jakarta.validation.Valid;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.dao.DataAccessException;
import java.util.UUID;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController extends BaseController {

    private static final Logger logger = LoggerFactory.getLogger(AppointmentController.class);

    @Autowired
    private AppointmentService appointmentService;

    private String requireUserId(Jwt jwt) {
        if (jwt == null || jwt.getSubject() == null || jwt.getSubject().isBlank()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Token de autenticación inválido o ausente");
        }
        return jwt.getSubject();
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createAppointment(@Valid @RequestBody AppointmentRequest body) {
        try {
            Map<String, Object> result = appointmentService.createAppointment(body);
            return ResponseEntity.ok(result);
        } catch (AppointmentAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("message", e.getMessage()));
        }
    }

    @PutMapping
    public void setStatus(@RequestBody Map<String, String> payload) {
        String id = payload.get("id");
        String status = payload.get("status");
        appointmentService.setAppointmentStatus(id, status);
    }

    @PutMapping("/reschedule")
    public void rescheduleAppointment(@RequestBody Map<String, String> payload) {
        String id = payload.get("id");
        String newDate = payload.get("appointment_date");
        appointmentService.rescheduleAppointment(id, newDate);
    }

    @GetMapping("/appointmentsbyid")
    public ResponseEntity<Object> getAppointmentsByPatient(
            @AuthenticationPrincipal Jwt jwt,
            @RequestParam(required = false) String patientId,
            @RequestParam String order) {
        String requesterId = requireUserId(jwt);

        if (patientId == null || patientId.isBlank()) {
            patientId = requesterId;
        }

        if (!patientId.equals(requesterId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                    "No estás autorizado para acceder al historial de otro paciente");
        }

        try {
            UUID.fromString(patientId);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "patientId tiene un formato inválido", e);
        }

        try {
            return ResponseEntity.ok(appointmentService.getAppointmentsByPatient(patientId, order));
        } catch (DataAccessException e) {
            logger.error("Error obteniendo historial médico para patientId={}", patientId, e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Error interno al obtener historial médico", e);
        }
    }

    @GetMapping("/professional/dates")
    public List<Map<String, Object>> getProfessionalAppointmentsDates(
            @AuthenticationPrincipal Jwt jwt,
            @RequestParam String startDate,
            @RequestParam String endDate) {
        String professionalId = requireUserId(jwt);
        return appointmentService.getProfessionalAppointmentsDates(professionalId, startDate, endDate);
    }

    @GetMapping("/professional/day")
    public List<Map<String, Object>> getProfessionalAppointmentsDay(
            @AuthenticationPrincipal Jwt jwt,
            @RequestParam String date) {
        String professionalId = requireUserId(jwt);
        return appointmentService.getProfessionalAppointmentsDay(professionalId, date);
    }

    @GetMapping("/professional/all")
    public List<Map<String, Object>> getAllProfessionalAppointments(
            @AuthenticationPrincipal Jwt jwt) {
        try {
            String professionalId = requireUserId(jwt);
            return appointmentService.getAllProfessionalAppointments(professionalId);
        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            logger.error("Error retrieving professional appointments", e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Error interno al obtener las citas del profesional", e);
        }
    }

    @GetMapping("/professional/dashboard")
    public Map<String, Object> getProfessionalDashboardStats(
            @AuthenticationPrincipal Jwt jwt,
            @RequestParam String date) {
        String professionalId = requireUserId(jwt);
        return appointmentService.getProfessionalDashboardStats(professionalId, date);
    }
}
