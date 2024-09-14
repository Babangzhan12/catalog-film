package com.server.server.security.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.StringUtils;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.server.server.entity.Pengguna;

import lombok.Data;

@Data
public class UserDetailsImpl implements UserDetails{

    private Integer id;
    private String username;
    @JsonIgnore
    private String password;
    private String email;
    private String role;

    public UserDetailsImpl(
    Integer id,
    String username, 
    String password, 
    String email,
    String role) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public static UserDetailsImpl build(Pengguna pengguna){
       return new UserDetailsImpl(
        pengguna.getId(), 
        pengguna.getUsername(), 
        pengguna.getPassword(), 
        pengguna.getEmail(), 
        pengguna.getRole());
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities =  new ArrayList<>();
        if (StringUtils.hasText(role)){
            String[] splits = role.replaceAll(" ", "").split(",");
            for (String string : splits) {
                authorities.add(new SimpleGrantedAuthority(string));
            }
        }
        return authorities;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.username;
    }
    
}
