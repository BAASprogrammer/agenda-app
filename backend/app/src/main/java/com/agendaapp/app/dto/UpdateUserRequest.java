package com.agendaapp.app.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateUserRequest {

    @NotBlank(message = "El nombre es obligatorio")
    @JsonProperty("first_name")
    @JsonAlias("firstName")
    private String firstName;

    @NotBlank(message = "El apellido es obligatorio")
    @JsonProperty("last_name")
    @JsonAlias("lastName")
    private String lastName;

    @NotBlank(message = "El teléfono es obligatorio")
    @JsonProperty("phone")
    private String phone;

    @NotBlank(message = "La dirección es obligatoria")
    @JsonProperty("address")
    private String address;
}