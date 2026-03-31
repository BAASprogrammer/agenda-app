package com.agendaapp.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import com.agendaapp.app.dto.RegisterUserRequest;
import com.agendaapp.app.dto.UserDTO;
import com.agendaapp.app.dto.UserResponseDTO;

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
            throw new RuntimeException("Usuario no encontrado");
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
        return jdbc.queryForMap(sql, userId);
    }

    public UserResponseDTO updateProfile(String userId, RegisterUserRequest body) {
        String subSpecialtyIdStr = body.getSubSpecialtyId();
        if (subSpecialtyIdStr != null && subSpecialtyIdStr.trim().isEmpty()) {
            subSpecialtyIdStr = null;
        }

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