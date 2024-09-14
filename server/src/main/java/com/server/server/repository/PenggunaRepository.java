package com.server.server.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.server.server.entity.Pengguna;

public interface PenggunaRepository extends JpaRepository <Pengguna, Integer>{
    

    Optional<Pengguna> findByUsername(String username);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    void deleteByUsername(String username);
}
