package com.agendaapp.app.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentRequest {

    @NotBlank(message = "El ID del paciente es obligatorio")
    private String patientId;

    @NotBlank(message = "El ID de la subespecialidad es obligatorio")
    private String subSpecialtyId;

    @NotBlank(message = "El ID del profesional es obligatorio")
    private String professionalId;

    @NotBlank(message = "La fecha de la cita es obligatoria")
    private String appointmentDate;

    private String reason;

    @NotBlank(message = "El estado es obligatorio")
    private String status;
}
