package com.server.server.entity;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
public class Pengguna implements Serializable{
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true, nullable = false)
    @NotNull(message = "Username cannot be null")
    @Size(min = 4, max = 50, message = "Username must be between 4 and 50 characters")
    private String username;

    @JsonIgnore
    @Column(nullable = false)
    @NotNull(message = "Password cannot be null")
    @Size(min = 6, max = 100, message = "Password must be between 6 and 100 characters")
    private String password;

    @Column(unique = true, nullable = false)
    @NotNull(message = "Email cannot be null")
    @Email(message = "Email should be valid")
    private String email;

    @JsonIgnore
    private String role;
}
