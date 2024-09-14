package com.server.server.controller;

import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.server.server.entity.Pengguna;
import com.server.server.model.JwtResponse;
import com.server.server.model.LoginRequest;
import com.server.server.model.RefreshTokenRequest;
import com.server.server.model.SignupRequest;
import com.server.server.security.jwt.JwtUtils;
import com.server.server.security.service.UserDetailsImpl;
import com.server.server.security.service.UserDetailsServiceImpl;
import com.server.server.service.PenggunaService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    PenggunaService penggunaService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    private UserDetailsServiceImpl userDetailsServiceImpl;

    private static final Pattern PASSWORD_PATTERN = Pattern.compile(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#])(?=\\S+$).{4,}$");

    private boolean isValid(String input) {    
        return PASSWORD_PATTERN.matcher(input).matches();
        
    }

    private String cleanInput(String input){
        if (input == null){
            return null;
        }

        String cleaned = input.trim();

        cleaned = cleaned.replaceAll("[^a-zA-Z0-9._@-]", "");
        return cleaned;
    }

    @PostMapping("/signin")
    public ResponseEntity<JwtResponse> authenticateUser(@RequestBody LoginRequest request) {


        if (!isValid(request.getPassword())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new JwtResponse(false, "Invalid username or password"));
        }

        String cleanedUsername = cleanInput(request.getUsername());

        try {
            Authentication authentication = authenticationManager
                    .authenticate(
                            new UsernamePasswordAuthenticationToken(cleanedUsername, request.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String token = jwtUtils.generateJwtToken(authentication);
            String refreshToken = jwtUtils.generateRefreshJwtToken(authentication);
            UserDetailsImpl principal = (UserDetailsImpl) authentication.getPrincipal();

            System.out.println("CHECK : " + token + refreshToken + principal.getUsername() +
                    principal.getEmail() + principal.getRole());

            return ResponseEntity.ok().body(new JwtResponse(token, refreshToken, principal.getUsername(),
                    principal.getEmail(), principal.getRole()));
        } catch (LockedException e) {
            JwtResponse jwtResponse = new JwtResponse(false, e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(jwtResponse);
        } catch (BadCredentialsException e) {
            JwtResponse jwtResponse = new JwtResponse(false, "Invalid username or password.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(jwtResponse);
        } catch (Exception e) {
            JwtResponse jwtResponse = new JwtResponse(false, "An error occurred during authentication.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(jwtResponse);
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<Pengguna> signup(@RequestBody SignupRequest request) {
        Pengguna pengguna = new Pengguna();
        pengguna.setUsername(request.getUsername());
        pengguna.setPassword(request.getPassword());
        pengguna.setEmail(request.getEmail());
        pengguna.setRole("User");

        Pengguna created = penggunaService.create(pengguna);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @PostMapping("/refreshToken")
    public ResponseEntity<JwtResponse> refreshToken(@RequestBody RefreshTokenRequest request) {
        String token = request.getRefreshToken();
        boolean valid = jwtUtils.validateJwtToken(token);
        if (!valid) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        String username = jwtUtils.getUsernameFromJwtToken(token);
        UserDetailsImpl userDetailsImpl = (UserDetailsImpl) userDetailsServiceImpl.loadUserByUsername(username);
        Authentication authentication = new UsernamePasswordAuthenticationToken(userDetailsImpl, null,
                userDetailsImpl.getAuthorities());
        String newToken = jwtUtils.generateJwtToken(authentication);
        String refreshToken = jwtUtils.generateRefreshJwtToken(authentication);
        return ResponseEntity.ok(new JwtResponse(newToken, refreshToken, username, userDetailsImpl.getEmail(),
                userDetailsImpl.getRole()));
    }
}
