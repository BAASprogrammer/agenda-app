package com.agendaapp.app.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class TestController extends BaseController {
	@GetMapping
	public String test() {
		return "Backend funcionando";
	}
}
