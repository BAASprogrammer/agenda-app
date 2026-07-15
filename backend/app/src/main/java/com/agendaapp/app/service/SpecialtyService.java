package com.agendaapp.app.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class SpecialtyService {

    @Autowired
    private JdbcTemplate jdbc;

    public List<Map<String, Object>> getSpecialties() {
        return jdbc.queryForList("SELECT id, name FROM public.medical_specialties");
    }

    public List<Map<String, Object>> getSubSpecialties(String specialtyId) {
        String sql = "SELECT id, name FROM public.medical_subspecialties WHERE specialty_id = ?::uuid";
        return jdbc.queryForList(sql, specialtyId);
    }
}
