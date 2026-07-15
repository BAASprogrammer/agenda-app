package com.agendaapp.app.service;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
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

    private static final String GET_USER_BY_ID =
            "SELECT first_name, last_name, email, is_professional, subspecialty_id " +
            "FROM public.users WHERE id = ?::uuid LIMIT 1";

    private static final String CHECK_EMAIL =
            "SELECT COUNT(*) FROM public.users WHERE email = ?";

    private static final String INSERT_USER =
            "INSERT INTO public.users (id, first_name, last_name, email, phone, is_professional, subspecialty_id) " +
            "VALUES (?::uuid, ?, ?, ?, ?, ?, ?::uuid)";

    private static final String GET_PROFESSIONALS =
            "SELECT id, first_name, last_name FROM public.users " +
            "WHERE is_professional = true AND subspecialty_id = ?::uuid";

    private static final String GET_PROFILE =
            "SELECT first_name, last_name, email, phone, address FROM public.users WHERE id = ?::uuid LIMIT 1";

    private static final String UPDATE_PROFILE =
            "UPDATE public.users SET first_name = ?, last_name = ?, phone = ?, address = ? WHERE id = ?::uuid";

    private final JdbcTemplate jdbc;

    public UserService(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public UserDTO getUserById(String userId) {
        var result = jdbc.query(GET_USER_BY_ID,
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
        Integer count = jdbc.queryForObject(CHECK_EMAIL, Integer.class, email);
        return count != null && count > 0;
    }

    public UserResponseDTO registerUser(RegisterUserRequest body, String userId) {
        jdbc.update(INSERT_USER,
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
        return jdbc.queryForList(GET_PROFESSIONALS, subspecialtyId);
    }

    public Map<String, Object> getProfile(String userId) {
        try {
            return jdbc.queryForMap(GET_PROFILE, userId);
        } catch (EmptyResultDataAccessException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado", e);
        }
    }

    public UserUpdateResponseDTO updateProfile(String userId, UpdateUserRequest body) {
        jdbc.update(UPDATE_PROFILE,
                body.getFirstName(),
                body.getLastName(),
                body.getPhone(),
                body.getAddress(),
                userId);

        return new UserUpdateResponseDTO(
                userId,
                body.getFirstName(),
                body.getLastName(),
                body.getPhone(),
                body.getAddress());
    }
}