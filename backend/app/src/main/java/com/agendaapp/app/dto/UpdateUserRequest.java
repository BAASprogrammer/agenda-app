package com.agendaapp.app.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class UpdateUserRequest {
    @JsonProperty("first_name")
    @JsonAlias("firstName")
    private String firstName;
    @JsonProperty("last_name")
    @JsonAlias("lastName")
    private String lastName;
    private String phone;
    private String address;
}
