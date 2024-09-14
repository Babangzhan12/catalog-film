package com.server.server.repository;

import java.util.List;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.server.server.entity.Film;

public interface FilmRepository extends JpaRepository<Film, String>{
    List<Film> findByTitleContainingIgnoreCase(String title);

    Page<Film> findByTitleContaining(String filterText, Pageable pageable);
}
