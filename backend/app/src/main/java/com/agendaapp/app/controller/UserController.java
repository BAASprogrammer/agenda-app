package com.agendaapp.app.controller;

import java.util.Map;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
import com.agendaapp.app.dto.UpdateUserRequest;
import com.agendaapp.app.dto.UserDTO;
import com.agendaapp.app.dto.UserResponseDTO;
import com.agendaapp.app.dto.UserUpdateResponseDTO;
import com.agendaapp.app.service.UserService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
public class UserController extends BaseController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public UserDTO getMyUser(@AuthenticationPrincipal Jwt jwt) {
        String userId = requireUserId(jwt);
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
            String userId = requireUserId(jwt);
            return userService.registerUser(body, userId);
        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            logger.error("Error interno al registrar usuario", e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error interno del servidor", e);
        }
    }

    @GetMapping("/professionals")
    public List<Map<String, Object>> getProfessionals(@RequestParam String subspecialtyId) {
        return userService.getProfessionals(subspecialtyId);
    }

    @GetMapping("/profile")
    public Map<String, Object> getProfile(@AuthenticationPrincipal Jwt jwt) {
        try {
            String userId = requireUserId(jwt);
            return userService.getProfile(userId);
        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            logger.error("Error interno al obtener el perfil", e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error interno del servidor", e);
        }
    }

    @PutMapping("/profile")
    public ResponseEntity<UserUpdateResponseDTO> updateProfile(
            @AuthenticationPrincipal Jwt jwt,
            @Valid @RequestBody UpdateUserRequest body) {
        try {
            String userId = requireUserId(jwt);
            UserUpdateResponseDTO result = userService.updateProfile(userId, body);
            return ResponseEntity.ok(result);
        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            logger.error("Error interno al actualizar perfil", e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error interno del servidor", e);
        }
    }
}
