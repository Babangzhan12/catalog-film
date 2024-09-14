package com.server.server.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.server.server.entity.Film;
import com.server.server.exception.BadRequestException;
import com.server.server.exception.ResourceNotFoundException;
import com.server.server.model.FilmDTO;
import com.server.server.repository.FilmRepository;

@Service
public class FilmService {

    @Autowired
    private FilmRepository filmRepository;

    public List<Film> findAll() {
        return filmRepository.findAll();
    }

    public Film findById(String id) {
        return filmRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Movie with id " + id + " not found"));
    }

    public List<FilmDTO> findByTitle(String title) {
        if (title.isEmpty() || title == null) {
            throw new ResourceNotFoundException("Title cannot be empty");
        }
        List<Film> films = filmRepository.findByTitleContainingIgnoreCase(title);
        return films.stream()
                .map(film -> new FilmDTO(film.getId(), film.getTitle(), film.getDescription()))
                .collect(Collectors.toList());
    }

    public Film create(Film film) {
        if (!StringUtils.hasText(film.getTitle())) {
            throw new BadRequestException("Title cannot be empty");
        }
        if (!StringUtils.hasText(film.getDescription())) {
            throw new BadRequestException("Description cannot be empty");
        }
        film.setId(UUID.randomUUID().toString());
        return filmRepository.save(film);
    }

    public Film edit(Film film) {
        if (film.getId() == null || film.getId().isEmpty()) {
            throw new BadRequestException("ID cannot be empty");
        }

        Film existingFilm = filmRepository.findById(film.getId())
                .orElseThrow(() -> new BadRequestException("Film with ID " + film.getId() + " not found"));

        if (film.getTitle() != null && !film.getTitle().isEmpty()) {
            existingFilm.setTitle(film.getTitle());
        }
        if (film.getDescription() != null) {
            existingFilm.setDescription(film.getDescription());
        }
        if (film.getImageThumbnail() != null && !film.getImageThumbnail().isEmpty()) {
            existingFilm.setImageThumbnail(film.getImageThumbnail());
        }
        return filmRepository.save(existingFilm);
    }

    public Film ubahGambar(String id, String image) {
        Film film = findById(id);
        film.setImageThumbnail(image);
        return filmRepository.save(film);
    }

    public void deleteById(String id) {
        Optional<Film> film = filmRepository.findById(id);
        if (film.isPresent()) {
            filmRepository.deleteById(id);
        } else {
            throw new ResourceNotFoundException("Film not found with id " + id);
        }
    }

    public Page<Film> findByRange(String filterText, int page, int limit) {
        PageRequest pageRequest = PageRequest.of(page, limit);
        return filmRepository.findByTitleContaining(filterText, pageRequest);
    }

}
