package com.agendaapp.app.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users/")
@CrossOrigin(origins = "*")
public class UserController {
	@Autowired
	private JdbcTemplate jdbc;

	@GetMapping("/{id}")
	public Map<String, Object> getUser(@PathVariable String id) {
		try {
			return jdbc.queryForMap(
					"SELECT first_name, last_name, email, is_professional FROM users WHERE id = ?::uuid LIMIT 1", id);
		} catch (Exception e) {
			return Map.of("error", e.getMessage());
		}
	}

	@PostMapping("/register")
	public Map<String, Object> registerUser(@RequestBody Map<String, Object> body) {
		try {
			// Get data
			String userId = (String) body.get("id");
			String firstName = (String) body.get("firstName");
			String lastName = (String) body.get("lastName");
			String email = (String) body.get("email");
			String phone = (String) body.get("phone");

			Object isProfessionalObj = body.get("isProfessional");
			Boolean isProfessional = isProfessionalObj != null && isProfessionalObj.toString().equalsIgnoreCase("true");
			// Insert data
			jdbc.update(
					"INSERT INTO users (id, first_name, last_name, email, phone, is_professional) VALUES (?::uuid, ?, ?, ?, ?, ?)",
					userId, firstName, lastName, email, phone, isProfessional);

			// Return data
			return Map.of(
					"id", userId,
					"firstName", firstName,
					"lastName", lastName,
					"email", email,
					"phone", phone,
					"isProfessional", isProfessional);
		} catch (Exception e) {
			System.err.println("Error en registro: " + e.getMessage());
			return Map.of("error", e.getMessage());
		}

	}

}
