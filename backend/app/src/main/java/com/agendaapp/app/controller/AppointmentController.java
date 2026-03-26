package com.agendaapp.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;
import com.agendaapp.app.dto.AppointmentRequest;

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
}
