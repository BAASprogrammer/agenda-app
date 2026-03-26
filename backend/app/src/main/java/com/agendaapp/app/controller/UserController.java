package com.agendaapp.app.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.agendaapp.app.dto.RegisterUserRequest;
import com.agendaapp.app.dto.UserDTO;
import com.agendaapp.app.dto.UserResponseDTO;

@RestController
@RequestMapping("/api/users/")
@CrossOrigin(origins = "*")
public class UserController {
	@Autowired
	private JdbcTemplate jdbc;

	@GetMapping("/me")
	public UserDTO getMyUser(@AuthenticationPrincipal Jwt jwt) {
		String userId = jwt.getSubject();

		var result = jdbc.query(
				"SELECT first_name, last_name, email, is_professional FROM public.users WHERE id = ?::uuid LIMIT 1",
				(rs, rowNum) -> new UserDTO(
						rs.getString("first_name"),
						rs.getString("last_name"),
						rs.getString("email"),
						rs.getBoolean("is_professional")),
				userId);
		if (result.isEmpty()) {
			throw new RuntimeException("Usuario no encontrado");
		}
		return result.get(0);
	}

	@PostMapping("/register")
	public UserResponseDTO registerUser(
	        @RequestBody RegisterUserRequest body,
	        @AuthenticationPrincipal Jwt jwt
	) {
	    try {
	        String userId = jwt.getSubject(); // 🔐 seguro

	        jdbc.update(
	            "INSERT INTO public.users (id, first_name, last_name, email, phone, is_professional) VALUES (?::uuid, ?, ?, ?, ?, ?)",
	            userId,
	            body.getFirstName(),
	            body.getLastName(),
	            body.getEmail(),
	            body.getPhone(),
	            body.getIsProfessional()
	        );

	        return new UserResponseDTO(
	            userId,
	            body.getFirstName(),
	            body.getLastName(),
	            body.getEmail(),
	            body.getPhone(),
	            body.getIsProfessional()
	        );

	    } catch (Exception e) {
	        throw new RuntimeException("Error al registrar usuario");
	    }
	}

}
