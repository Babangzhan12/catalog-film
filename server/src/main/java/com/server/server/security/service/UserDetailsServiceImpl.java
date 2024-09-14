package com.server.server.security.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.server.server.entity.Pengguna;
import com.server.server.repository.PenggunaRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private PenggunaRepository penggunaRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
         Pengguna pengguna = penggunaRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Username " + username + " tidak ditemukan"));
        return UserDetailsImpl.build(pengguna);
    }
    
}
