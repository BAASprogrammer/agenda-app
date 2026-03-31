package com.agendaapp.app.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class RegisterUserRequest {

	@NotBlank(message = "El nombre es obligatorio")
	@Size(min = 2, max = 50, message = "El nombre debe tener entre 2 y 50 caracteres")
	@JsonProperty("first_name")
	@JsonAlias("firstName")
	private String firstName;

	@NotBlank(message = "El apellido es obligatorio")
	@Size(min = 2, max = 50, message = "El apellido debe tener entre 2 y 50 caracteres")
	@JsonProperty("last_name")
	@JsonAlias("lastName")
	private String lastName;

	@NotBlank(message = "El email es obligatorio")
	@Email(message = "El email debe tener un formato válido")
	@JsonProperty("email")
	private String email;

	@Size(max = 20, message = "El teléfono no puede tener más de 20 caracteres")
	@JsonProperty("phone")
	private String phone;

	@NotNull(message = "Debe especificar si es profesional")
	@JsonProperty("is_professional")
	@JsonAlias("isProfessional")
	private Boolean isProfessional;

	@JsonProperty("subspecialty_id")
	@JsonAlias("subSpecialtyId")
	private String subSpecialtyId;

	@Size(max = 200, message = "La dirección no puede tener más de 200 caracteres")
	@JsonProperty("address")
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
