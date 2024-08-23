package com.prueba_java.demo.models;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class Task {
    private Long id;
    private String name;
    private String description;
    private LocalDate start_date;
}
