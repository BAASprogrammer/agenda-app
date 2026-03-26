package com.agendaapp.app.dto;

public class UserResponseDTO {

    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private Boolean isProfessional;

    public UserResponseDTO() {}

    public UserResponseDTO(String id, String firstName, String lastName, String email, String phone, Boolean isProfessional) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.isProfessional = isProfessional;
    }

    public String getId() { return id; }
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public String getEmail() { return email; }
    public String getPhone() { return phone; }
    public Boolean getIsProfessional() { return isProfessional; }
}