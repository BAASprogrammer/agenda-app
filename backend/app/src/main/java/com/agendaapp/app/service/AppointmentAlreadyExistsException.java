package com.agendaapp.app.service;

public class AppointmentAlreadyExistsException extends RuntimeException {

    public AppointmentAlreadyExistsException(String message) {
        super(message);
    }
}
