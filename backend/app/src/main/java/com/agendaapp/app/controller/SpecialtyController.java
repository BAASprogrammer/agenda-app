package com.agendaapp.app.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.agendaapp.app.service.SpecialtyService;

@RestController
@RequestMapping("/api")
public class SpecialtyController extends BaseController {

    private final SpecialtyService specialtyService;

    public SpecialtyController(SpecialtyService specialtyService) {
        this.specialtyService = specialtyService;
    }

    @GetMapping("/specialties")
    public List<Map<String, Object>> getSpecialties() {
        return specialtyService.getSpecialties();
    }

    @GetMapping("/subspecialties")
    public List<Map<String, Object>> getSubSpecialties(@RequestParam String specialtyId) {
        return specialtyService.getSubSpecialties(specialtyId);
    }
}
