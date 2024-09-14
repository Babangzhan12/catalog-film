package com.server.server.model;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class JwtResponse implements Serializable {
    private String token;
    private String refreshToken;
    private String type = "Bearer";
    private String username;
    private String email;
    private String role;
    private boolean login;
    private String errorMessage;

    public JwtResponse(
            String accesToken,
            String refreshToken,
            String username,
            String email,
            String role) {
        this.username = username;
        this.email = email;
        this.token = accesToken;
        this.refreshToken = refreshToken;
        this.role = role;
        this.login = true;
        this.errorMessage = null;
    }

    public JwtResponse(boolean success, String errorMessage) {
        this.login = success;
        this.errorMessage = errorMessage;
    }

    public String getToken() {
        return login ? token : null;
    }

    public String getRefreshToken() {
        return login ? refreshToken : null;
    }

    public String getType() {
        return login ? type : null;
    }

    public String getUsername() {
        return login ? username : null;
    }

    public String getEmail() {
        return login ? email : null;
    }

    public String getRole() {
        return login ? role : null;
    }
};

    
