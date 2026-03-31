package com.agendaapp.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.agendaapp.app.dto.AppointmentRequest;
import com.agendaapp.app.service.AppointmentService;
import jakarta.validation.Valid;

import java.util.List;
import java.util.Map;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController extends BaseController {

    @Autowired
    private AppointmentService appointmentService;

    private String requireUserId(Jwt jwt) {
        if (jwt == null || jwt.getSubject() == null || jwt.getSubject().isBlank()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Token de autenticación inválido o ausente");
        }
        return jwt.getSubject();
    }

    @PostMapping
    public Map<String, Object> createAppointment(@Valid @RequestBody AppointmentRequest body) {
        return appointmentService.createAppointment(body);
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
    public List<Map<String, Object>> getAppointmentsByPatient(@RequestParam String patientId) {
        return appointmentService.getAppointmentsByPatient(patientId);
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
        String professionalId = requireUserId(jwt);
        return appointmentService.getAllProfessionalAppointments(professionalId);
    }

    @GetMapping("/professional/dashboard")
    public Map<String, Object> getProfessionalDashboardStats(
            @AuthenticationPrincipal Jwt jwt,
            @RequestParam String date) {
        String professionalId = requireUserId(jwt);
        return appointmentService.getProfessionalDashboardStats(professionalId, date);
    }
}
