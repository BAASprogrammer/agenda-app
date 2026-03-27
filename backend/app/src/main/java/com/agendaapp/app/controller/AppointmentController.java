package com.agendaapp.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;
import com.agendaapp.app.dto.AppointmentRequest;

import java.util.List;
import java.util.Map;

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
}
