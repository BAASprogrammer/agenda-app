package com.agendaapp.app.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;

public class UserResponseDTO {

    private String id;
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

    public UserResponseDTO() {}

    public UserResponseDTO(String id, String firstName, String lastName, String email, String phone, Boolean isProfessional, String subSpecialtyId) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.isProfessional = isProfessional;
        this.subSpecialtyId = subSpecialtyId;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    @JsonProperty("first_name")
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    @JsonProperty("last_name")
    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    @JsonProperty("is_professional")
    public Boolean getIsProfessional() { return isProfessional; }
    public void setIsProfessional(Boolean isProfessional) { this.isProfessional = isProfessional; }
    @JsonProperty("subspecialty_id")
    public String getSubSpecialtyId() { return subSpecialtyId; }
    public void setSubSpecialtyId(String subSpecialtyId) { this.subSpecialtyId = subSpecialtyId; }
}