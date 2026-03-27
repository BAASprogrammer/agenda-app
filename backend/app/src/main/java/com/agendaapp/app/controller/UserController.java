package com.agendaapp.app.controller;

import java.util.Map;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import com.agendaapp.app.dto.RegisterUserRequest;
import com.agendaapp.app.dto.UserDTO;
import com.agendaapp.app.dto.UserResponseDTO;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {
	@Autowired
	private JdbcTemplate jdbc;

	@GetMapping("/me")
	public UserDTO getMyUser(@AuthenticationPrincipal Jwt jwt) {
		String userId = jwt.getSubject();

		var result = jdbc.query(
				"SELECT first_name, last_name, email, is_professional, subspecialty_id FROM public.users WHERE id = ?::uuid LIMIT 1",
				(rs, rowNum) -> new UserDTO(
						rs.getString("first_name"),
						rs.getString("last_name"),
						rs.getString("email"),
						rs.getBoolean("is_professional"),
						rs.getString("subspecialty_id")),
				userId);
		if (result.isEmpty()) {
			throw new RuntimeException("Usuario no encontrado");
		}
		return result.get(0);
	}

	@GetMapping("/check-email")
	public Map<String, Boolean> checkEmail(@RequestParam String email) {
		Integer count = jdbc.queryForObject(
				"SELECT COUNT(*) FROM public.users WHERE email = ?",
				Integer.class,
				email);
		return Map.of("exists", count != null && count > 0);
	}

	@PostMapping("/register")
	public UserResponseDTO registerUser(
			@RequestBody RegisterUserRequest body,
			@AuthenticationPrincipal Jwt jwt) {
		try {
			String userId = jwt.getSubject();
			jdbc.update(
					"INSERT INTO public.users (id, first_name, last_name, email, phone, is_professional, subspecialty_id) VALUES (?::uuid, ?, ?, ?, ?, ?, ?::uuid)",
					userId,
					body.getFirstName(),
					body.getLastName(),
					body.getEmail(),
					body.getPhone(),
					body.getIsProfessional(),
					body.getSubSpecialtyId());

			return new UserResponseDTO(
					userId,
					body.getFirstName(),
					body.getLastName(),
					body.getEmail(),
					body.getPhone(),
					body.getIsProfessional(),
					body.getSubSpecialtyId());

		} catch (ResponseStatusException e) {
			throw e;
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException("Error interno del servidor");
		}
	}

	@GetMapping("/professionals")
	public List<Map<String, Object>> getProfessionals(@RequestParam String subspecialtyId) {
		String sql = "SELECT id, first_name, last_name FROM public.users " +
				"WHERE is_professional = true AND subspecialty_id = ?::uuid";
		return jdbc.queryForList(sql, subspecialtyId);
	}

	@GetMapping("/profile")
	public Map<String, Object> getProfile(@AuthenticationPrincipal Jwt jwt) {
		String userId = jwt.getSubject();
		String sql = "SELECT first_name, last_name, email, phone, address FROM public.users WHERE id = ?::uuid LIMIT 1";
		return jdbc.queryForMap(sql, userId);
	}

	@PutMapping("/profile")
	public UserResponseDTO updateProfile(
			@AuthenticationPrincipal Jwt jwt,
			@RequestBody RegisterUserRequest body) {
		String userId = jwt.getSubject();
		String sql = "UPDATE public.users SET first_name = ?, last_name = ?, phone = ?, address = ? WHERE id = ?::uuid";
		jdbc.update(sql,
				body.getFirstName(),
				body.getLastName(),
				body.getPhone(),
				body.getAddress(),
				userId);
		
		return new UserResponseDTO(
				userId,
				body.getFirstName(),
				body.getLastName(),
				body.getEmail(),
				body.getPhone(),
				body.getIsProfessional(),
				body.getSubSpecialtyId());
	}

}
