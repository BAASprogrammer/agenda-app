package com.agendaapp.app.dto;


public class AppointmentRequest {
    private String patientId;
    private String subSpecialtyId;
    private String professionalId;
    private String appointmentDate; // We will parse this to LocalDateTime if needed, or keep as string
    private String reason;
    private String status;

    public AppointmentRequest() {}

    public String getPatientId() { return patientId; }
    public void setPatientId(String patientId) { this.patientId = patientId; }

    public String getSubSpecialtyId() { return subSpecialtyId; }
    public void setSubSpecialtyId(String subSpecialtyId) { this.subSpecialtyId = subSpecialtyId; }

    public String getProfessionalId() { return professionalId; }
    public void setProfessionalId(String professionalId) { this.professionalId = professionalId; }

    public String getAppointmentDate() { return appointmentDate; }
    public void setAppointmentDate(String appointmentDate) { this.appointmentDate = appointmentDate; }

    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
