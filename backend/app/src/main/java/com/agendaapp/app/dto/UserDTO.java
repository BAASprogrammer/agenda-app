package com.agendaapp.app.dto;

public class UserDTO {
	private String firstName;
	private String lastName;
	private String email;
	private Boolean isProfessional;
	private String subSpecialtyId;
	
	public UserDTO(){}
	
	public UserDTO(String firstName, String lastName, String email, Boolean isProfessional, String subSpecialtyId)
	{
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.isProfessional = isProfessional;
		this.subSpecialtyId = subSpecialtyId;
		
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Boolean getIsProfessional() {
		return isProfessional;
	}

	public void setIsProfessional(Boolean isProfessional) {
		this.isProfessional = isProfessional;
	}

	public String getSubSpecialtyId() {
		return subSpecialtyId;
	}

	public void setSubSpecialtyId(String subSpecialtyId) {
		this.subSpecialtyId = subSpecialtyId;
	}
	
	
	
}
