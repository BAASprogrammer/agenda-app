package com.agendaapp.app.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
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
}
