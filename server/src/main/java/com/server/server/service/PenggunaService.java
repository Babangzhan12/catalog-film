package com.server.server.service;

import java.util.regex.Pattern;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.server.server.entity.Pengguna;
import com.server.server.exception.BadRequestException;
import com.server.server.exception.ResourceNotFoundException;
import com.server.server.repository.PenggunaRepository;

import jakarta.validation.Valid;

@Service
public class PenggunaService {

    @Autowired
    private PenggunaRepository penggunaRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    private static final Pattern EMAIL_PATTERN = Pattern.compile(
            "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");

    private static final Pattern PASSWORD_PATTERN = Pattern.compile(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#])[A-Za-z\\d@$!%*?&#]{6,100}$");

    private boolean isValidPassword(String password) {
        return PASSWORD_PATTERN.matcher(password).matches();
    }

    private boolean isValidEmail(String email) {
        return EMAIL_PATTERN.matcher(email).matches();
    }

    public List<Pengguna> findAll(){
        return penggunaRepository.findAll();
    }

    public Pengguna findByUsername(String username) {
        return penggunaRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User with username " + username + " not found"));
    }

    public Pengguna findById(Integer id) {
        return penggunaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pengguna dengan id " + id + " tidak ditemukan"));
    }

    public Pengguna create(@Valid Pengguna pengguna) {
        if (!StringUtils.hasText(pengguna.getUsername()) || pengguna.getUsername().length() < 4) {
            throw new BadRequestException("Username must be filled atau minimum 4 characters");
        }

        if (pengguna.getUsername().contains(" ")) {
            throw new BadRequestException("Username must not contain spaces");
        }

        if (penggunaRepository.existsByUsername(pengguna.getUsername())) {
            throw new BadRequestException("User " + pengguna.getUsername() + " already registered");
        }

        if (pengguna.getPassword().contains(" ")) {
            throw new BadRequestException("Password must not contain spaces");
        }

        if (!StringUtils.hasText(pengguna.getPassword()) || pengguna.getPassword().length() < 6) {
            throw new BadRequestException("Password must be filled atau minimum 6 characters");
        }

        System.out.println("Password " + pengguna.getPassword());

        if (!isValidPassword(pengguna.getPassword())) {
            throw new BadRequestException(
                    "Password harus diisi atau memenuhi persyaratan kompleksitas: minimal harus mengandung satu huruf besar, simbol dan angka.");
        }

        pengguna.setPassword(passwordEncoder.encode(pengguna.getPassword()));

        if (!StringUtils.hasText(pengguna.getEmail())) {
            throw new BadRequestException("Email must be filled");
        }

        if (!isValidEmail(pengguna.getEmail())) {
            throw new BadRequestException("Email invalid");
        }

        if (penggunaRepository.existsByEmail(pengguna.getEmail())) {
            throw new BadRequestException("Email " + pengguna.getEmail() + "  already registered");
        }

        return penggunaRepository.save(pengguna);
    }

    public Pengguna edit(Pengguna pengguna) {
        if (!StringUtils.hasText(pengguna.getUsername())) {
            throw new BadRequestException("Username must be filled and minimum 4 characters");
        }
        if (!StringUtils.hasText(pengguna.getEmail())) {
            throw new BadRequestException("Email must be filled");
        }
        return penggunaRepository.save(pengguna);
    }

    public void deleteByUId(Integer id) {
        penggunaRepository.deleteById(id);
    }
}
