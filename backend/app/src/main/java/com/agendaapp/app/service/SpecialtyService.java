package com.agendaapp.app.service;

import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class SpecialtyService {

    private final JdbcTemplate jdbc;

    public SpecialtyService(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public List<Map<String, Object>> getSpecialties() {
        return jdbc.queryForList("SELECT id, name FROM public.medical_specialties");
    }

    public List<Map<String, Object>> getSubSpecialties(String specialtyId) {
        String sql = "SELECT id, name FROM public.medical_subspecialties WHERE specialty_id = ?::uuid";
        return jdbc.queryForList(sql, specialtyId);
    }
}
