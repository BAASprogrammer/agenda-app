package com.agendaapp.app.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;

public class RegisterUserRequest {

	@JsonProperty("first_name")
	@JsonAlias("firstName")
	private String firstName;
	@JsonProperty("last_name")
	@JsonAlias("lastName")
	private String lastName;
	private String email;
	private String phone;
	@JsonProperty("is_professional")
	@JsonAlias("isProfessional")
	private Boolean isProfessional;
	@JsonProperty("subspecialty_id")
	@JsonAlias("subSpecialtyId")
	private String subSpecialtyId;
	private String address;

	public RegisterUserRequest() {
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

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
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

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}
}
