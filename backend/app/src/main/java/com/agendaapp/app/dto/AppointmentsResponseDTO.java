package com.agendaapp.app.dto;

public class AppointmentsResponseDTO {
	private String id;
	private String appointmentDate;
	private String status;
	private String professionalId;
	private String reason;
	
	public AppointmentsResponseDTO(){}
	
	public AppointmentsResponseDTO(String id, String appointmentDate, String status, String professionalId, String reason) {
		this.id = id;
		this.appointmentDate = appointmentDate;
		this.status = status;
		this.professionalId = professionalId;
		this.reason = reason;
	}
	
	public String getId() { return id; }
    public String appointmentDate() { return appointmentDate; }
    public String status() { return status; }
    public String professionalId() { return professionalId; }
    public String reason() { return reason; }

}