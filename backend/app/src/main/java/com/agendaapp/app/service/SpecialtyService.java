package com.agendaapp.app.service;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class SpecialtyService {

    private static final String GET_SPECIALTIES =
            "SELECT id, name FROM public.medical_specialties";

    private static final String GET_SUBSPECIALTIES =
            "SELECT id, name FROM public.medical_subspecialties WHERE specialty_id = ?::uuid";

    private final JdbcTemplate jdbc;

    public SpecialtyService(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public List<Map<String, Object>> getSpecialties() {
        return jdbc.queryForList(GET_SPECIALTIES);
    }

    public List<Map<String, Object>> getSubSpecialties(String specialtyId) {
        return jdbc.queryForList(GET_SUBSPECIALTIES, specialtyId);
    }
}
