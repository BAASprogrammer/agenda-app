package com.agendaapp.app.controller;

import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.server.ResponseStatusException;

public abstract class BaseController {

    protected String requireUserId(Jwt jwt) {
        if (jwt == null || jwt.getSubject() == null || jwt.getSubject().isBlank()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Token de autenticación inválido o ausente");
        }
        return jwt.getSubject();
    }
}