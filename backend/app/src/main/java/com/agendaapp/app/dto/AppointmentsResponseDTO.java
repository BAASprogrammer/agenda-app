package com.agendaapp.app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentsResponseDTO {
    private String id;
    private String appointmentDate;
    private String status;
    private String professionalId;
    private String reason;
}
