package com.agendaapp.app.controller;

import org.springframework.web.bind.annotation.*;

import com.agendaapp.app.service.SpecialtyService;

import java.util.List;
import java.util.Map;

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
