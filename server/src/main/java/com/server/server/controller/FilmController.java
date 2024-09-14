package com.server.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.server.server.entity.Film;
import com.server.server.exception.BadRequestException;
import com.server.server.exception.ResourceNotFoundException;
import com.server.server.model.FilmDTO;
import com.server.server.service.FilmService;

@RestController
@RequestMapping("/api/films")
@PreAuthorize("isAuthenticated()")
public class FilmController {

    @Autowired
    private FilmService filmService;

    @GetMapping
    public ResponseEntity<List<Film>> findAll() {
        List<Film> films = filmService.findAll();
        return new ResponseEntity<>(films, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Film> getFilmById(@PathVariable String id) {
        Film film = filmService.findById(id);
        return new ResponseEntity<>(film, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<List<FilmDTO>> searchFilmsByTitle(@RequestParam String title) {
        List<FilmDTO> films = filmService.findByTitle(title);
        if (films.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(films, HttpStatus.OK);
    }

    @GetMapping("/search-page")
    public ResponseEntity<Page<Film>> searchFilmsByTitlePagination(
            @RequestParam String title,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int limit) {
        try {
            Page<Film> films = filmService.findByRange(title, page, limit);
            if (films.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND); 
            }
            return new ResponseEntity<>(films, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<Film> createFilm(@RequestBody Film film) {
        try {
            Film createdFilm = filmService.create(film);
            return new ResponseEntity<>(createdFilm, HttpStatus.CREATED);
        } catch (BadRequestException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/update")
    public Film updateFilm(@RequestBody Film film) {
            return filmService.edit(film);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteFilm(@PathVariable String id) {
        try {
            filmService.deleteById(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
