package com.agendaapp.app.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;

public class UserUpdateResponseDTO {
    private String id;
    @JsonProperty("first_name")
    @JsonAlias("firstName")
    private String firstName;
    @JsonProperty("last_name")
    @JsonAlias("lastName")
    private String lastName;
    private String phone;
    private String address;
   
    public UserUpdateResponseDTO() {}

    public UserUpdateResponseDTO(String id, String firstName, String lastName, String phone, String address) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.address = address;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    @JsonProperty("first_name")
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    @JsonProperty("last_name")
    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
	public String getAddress() {return address;}
	public void setAddress(String address) {this.address = address;}
}
