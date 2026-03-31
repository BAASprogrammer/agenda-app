package com.agendaapp.app.controller;

import java.util.Map;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
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
import com.agendaapp.app.service.UserService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
public class UserController extends BaseController {
	@Autowired
	private UserService userService;

	@GetMapping("/me")
	public UserDTO getMyUser(@AuthenticationPrincipal Jwt jwt) {
		String userId = jwt.getSubject();
		return userService.getUserById(userId);
	}

	@GetMapping("/check-email")
	public Map<String, Boolean> checkEmail(@RequestParam String email) {
		return Map.of("exists", userService.checkEmailExists(email));
	}

	@PostMapping("/register")
	public UserResponseDTO registerUser(
			@Valid @RequestBody RegisterUserRequest body,
			@AuthenticationPrincipal Jwt jwt) {
		try {
			String userId = jwt.getSubject();
			return userService.registerUser(body, userId);
		} catch (ResponseStatusException e) {
			throw e;
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException("Error interno del servidor");
		}
	}

	@GetMapping("/professionals")
	public List<Map<String, Object>> getProfessionals(@RequestParam String subspecialtyId) {
		return userService.getProfessionals(subspecialtyId);
	}

	@GetMapping("/profile")
	public Map<String, Object> getProfile(@AuthenticationPrincipal Jwt jwt) {
		String userId = jwt.getSubject();
		return userService.getProfile(userId);
	}

	@PutMapping("/profile")
	public UserResponseDTO updateProfile(
			@AuthenticationPrincipal Jwt jwt,
			@Valid @RequestBody RegisterUserRequest body) {
		String userId = jwt.getSubject();
		return userService.updateProfile(userId, body);
	}

}
