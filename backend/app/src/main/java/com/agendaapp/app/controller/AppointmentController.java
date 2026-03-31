package com.agendaapp.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;
import com.agendaapp.app.dto.AppointmentRequest;

import java.util.List;
import java.util.Map;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "*")
public class AppointmentController {

    @Autowired
    private JdbcTemplate jdbc;

    @PostMapping
    public Map<String, Object> createAppointment(@RequestBody AppointmentRequest body) {
        String sql = "INSERT INTO public.medical_appointments " +
                     "(patient_id, subspecialty_id, professional_id, appointment_date, reason, status) " +
                     "VALUES (?::uuid, ?::uuid, ?::uuid, ?::timestamp, ?, ?)";
        
        jdbc.update(sql, 
                    body.getPatientId(), 
                    body.getSubSpecialtyId(), 
                    body.getProfessionalId(), 
                    body.getAppointmentDate(), 
                    body.getReason(), 
                    body.getStatus());
        
        return Map.of("message", "Cita agendada exitosamente");
    }
    
    @PutMapping
    public void setStatus(@RequestBody Map<String, String> payload) {
        String id = payload.get("id");
        String status = payload.get("status");
        jdbc.update("UPDATE public.medical_appointments SET status = ? WHERE id = ?::uuid", status, id);
    }

    @PutMapping("/reschedule")
    public void rescheduleAppointment(@RequestBody Map<String, String> payload) {
        String id = payload.get("id");
        String newDate = payload.get("appointment_date");
        jdbc.update("UPDATE public.medical_appointments SET appointment_date = ?::timestamp WHERE id = ?::uuid", newDate, id);
    }
    
    @GetMapping("/appointmentsbyid")
    public List<Map<String, Object>> getAppointmentsByPatient(@RequestParam String patientId) {
        String sql = "SELECT a.id, a.appointment_date, a.status, a.professional_id, a.reason, " +
                     "u.first_name as professional_first_name, u.last_name as professional_last_name " +
                     "FROM public.medical_appointments a " +
                     "JOIN public.users u ON a.professional_id = u.id " +
                     "WHERE a.patient_id = ?::uuid " +
                     "ORDER BY a.appointment_date DESC";
                     
        return jdbc.queryForList(sql, patientId);
    }

    @GetMapping("/professional/dates")
    public List<Map<String, Object>> getProfessionalAppointmentsDates(
            @AuthenticationPrincipal Jwt jwt,
            @RequestParam String startDate,
            @RequestParam String endDate) {
        String professionalId = jwt.getSubject();
        String sql = "SELECT appointment_date FROM public.medical_appointments " +
                     "WHERE professional_id = ?::uuid AND status = 'agendada' " +
                     "AND appointment_date >= ?::timestamp AND appointment_date <= ?::timestamp";
                     
        return jdbc.queryForList(sql, professionalId, startDate + " 00:00:00", endDate + " 23:59:59");
    }

    @GetMapping("/professional/day")
    public List<Map<String, Object>> getProfessionalAppointmentsDay(
            @AuthenticationPrincipal Jwt jwt,
            @RequestParam String date) {
        String professionalId = jwt.getSubject();
        String sql = "SELECT a.id, a.appointment_date, a.status, a.reason, " +
                     "u.first_name, u.last_name " +
                     "FROM public.medical_appointments a " +
                     "LEFT JOIN public.users u ON a.patient_id = u.id " +
                     "WHERE a.professional_id = ?::uuid AND a.status = 'agendada' " +
                     "AND a.appointment_date >= ?::timestamp AND a.appointment_date <= ?::timestamp " +
                     "ORDER BY a.appointment_date ASC";
                     
        return jdbc.queryForList(sql, professionalId, date + " 00:00:00", date + " 23:59:59");
    }

    @GetMapping("/professional/all")
    public List<Map<String, Object>> getAllProfessionalAppointments(
            @AuthenticationPrincipal Jwt jwt) {
        String professionalId = jwt.getSubject();
        String sql = "SELECT a.id, a.reason, a.appointment_date, a.status, a.patient_id, " +
                     "u.id as patient_user_id, u.first_name, u.last_name " +
                     "FROM public.medical_appointments a " +
                     "LEFT JOIN public.users u ON a.patient_id = u.id " +
                     "WHERE a.professional_id = ?::uuid " +
                     "ORDER BY a.appointment_date DESC";
                     
        return jdbc.queryForList(sql, professionalId);
    }

    @GetMapping("/professional/dashboard")
    public Map<String, Object> getProfessionalDashboardStats(
            @AuthenticationPrincipal Jwt jwt,
            @RequestParam String date) {
        String professionalId = jwt.getSubject();
        
        Integer todayCount = jdbc.queryForObject(
            "SELECT COUNT(*) FROM public.medical_appointments " +
            "WHERE professional_id = ?::uuid AND appointment_date >= ?::timestamp AND appointment_date <= ?::timestamp",
            Integer.class, professionalId, date + " 00:00:00", date + " 23:59:59");
            
        Integer patientCount = jdbc.queryForObject(
            "SELECT COUNT(DISTINCT patient_id) FROM public.medical_appointments " +
            "WHERE professional_id = ?::uuid",
            Integer.class, professionalId);
            
        List<Map<String, Object>> upcoming = jdbc.queryForList(
            "SELECT a.id, a.appointment_date, a.status, a.reason, u.first_name, u.last_name " +
            "FROM public.medical_appointments a " +
            "LEFT JOIN public.users u ON a.patient_id = u.id " +
            "WHERE a.professional_id = ?::uuid AND a.status = 'agendada' AND a.appointment_date >= ?::timestamp " +
            "ORDER BY a.appointment_date ASC LIMIT 4",
            professionalId, date + " 00:00:00");
            
        return Map.of(
            "todayCount", todayCount != null ? todayCount : 0,
            "patientCount", patientCount != null ? patientCount : 0,
            "upcomingAppts", upcoming
        );
    }
}
