package com.agendaapp.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class SpecialtyController extends BaseController {

    @Autowired
    private JdbcTemplate jdbc;

    @GetMapping("/specialties")
    public List<Map<String, Object>> getSpecialties() {
        return jdbc.queryForList("SELECT id, name FROM public.medical_specialties");
    }

    @GetMapping("/subspecialties")
    public List<Map<String, Object>> getSubSpecialties(@RequestParam String specialtyId) {
        String sql = "SELECT id, name FROM public.medical_subspecialties WHERE specialty_id = ?::uuid";
        return jdbc.queryForList(sql, specialtyId);
    }
}
