package com.agendaapp.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.agendaapp.app.dto.RegisterUserRequest;
import com.agendaapp.app.dto.UpdateUserRequest;
import com.agendaapp.app.dto.UserDTO;
import com.agendaapp.app.dto.UserResponseDTO;
import com.agendaapp.app.dto.UserUpdateResponseDTO;

import java.util.List;
import java.util.Map;

@Service
public class UserService {

    @Autowired
    private JdbcTemplate jdbc;

    public UserDTO getUserById(String userId) {
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
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado");
        }
        return result.get(0);
    }

    public boolean checkEmailExists(String email) {
        Integer count = jdbc.queryForObject(
                "SELECT COUNT(*) FROM public.users WHERE email = ?",
                Integer.class,
                email);
        return count != null && count > 0;
    }

    public UserResponseDTO registerUser(RegisterUserRequest body, String userId) {
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
    }

    public List<Map<String, Object>> getProfessionals(String subspecialtyId) {
        String sql = "SELECT id, first_name, last_name FROM public.users " +
                "WHERE is_professional = true AND subspecialty_id = ?::uuid";
        return jdbc.queryForList(sql, subspecialtyId);
    }

    public Map<String, Object> getProfile(String userId) {
        String sql = "SELECT first_name, last_name, email, phone, address FROM public.users WHERE id = ?::uuid LIMIT 1";
        try {
            return jdbc.queryForMap(sql, userId);
        } catch (EmptyResultDataAccessException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado", e);
        }
    }

    public ResponseEntity<?> updateProfile(String userId, UpdateUserRequest body) {

        if (body.getFirstName() == null || body.getFirstName().isBlank() ||
                body.getLastName() == null || body.getLastName().isBlank() ||
                body.getPhone() == null || body.getPhone().isBlank() ||
                body.getAddress() == null || body.getAddress().isBlank()) {

            return ResponseEntity
                    .badRequest()
                    .body(Map.of("message", "No deben haber campos vacíos"));
        }

        String sql = "UPDATE public.users SET first_name = ?, last_name = ?, phone = ?, address = ? WHERE id = ?::uuid";

        jdbc.update(sql,
                body.getFirstName(),
                body.getLastName(),
                body.getPhone(),
                body.getAddress(),
                userId);

        return ResponseEntity.ok(new UserUpdateResponseDTO(
                userId,
                body.getFirstName(),
                body.getLastName(),
                body.getPhone(),
                body.getAddress()));
    }
}