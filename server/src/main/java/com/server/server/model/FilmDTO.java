package com.server.server.model;

import lombok.Data;

@Data
public class FilmDTO {
    private String id;
    private String title;
    private String description;

    public FilmDTO(String id, String title, String description) {
        this.id = id;
        this.title = title;
        this.description = description;
    }
}

