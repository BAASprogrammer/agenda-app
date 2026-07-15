package com.agendaapp.app.dto;

public class AppointmentsResponseDTO {
    private String id;
    private String appointmentDate;
    private String status;
    private String professionalId;
    private String reason;

    public AppointmentsResponseDTO() {
    }

    public AppointmentsResponseDTO(String id, String appointmentDate, String status, String professionalId, String reason) {
        this.id = id;
        this.appointmentDate = appointmentDate;
        this.status = status;
        this.professionalId = professionalId;
        this.reason = reason;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAppointmentDate() {
        return appointmentDate;
    }

    public void setAppointmentDate(String appointmentDate) {
        this.appointmentDate = appointmentDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getProfessionalId() {
        return professionalId;
    }

    public void setProfessionalId(String professionalId) {
        this.professionalId = professionalId;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}
