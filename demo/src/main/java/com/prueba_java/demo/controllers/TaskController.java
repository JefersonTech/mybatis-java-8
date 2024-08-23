package com.prueba_java.demo.controllers;

import com.prueba_java.demo.connection.Connection;
import com.prueba_java.demo.mappers.TaskMapper;
import com.prueba_java.demo.models.Task;
import org.apache.ibatis.session.SqlSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = "*")
public class TaskController {

    @GetMapping(value = "", produces = {MediaType.APPLICATION_JSON_VALUE})
    @ResponseStatus(HttpStatus.OK)
    public List<Task> tasks() {
        try (SqlSession session = Connection.getSessionFactory().openSession()) {
            TaskMapper mapper = session.getMapper(TaskMapper.class);
            return mapper.findAll();
        }
    }

    @PostMapping(value = "", consumes = {MediaType.APPLICATION_JSON_VALUE}, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        try (SqlSession session = Connection.getSessionFactory().openSession()) {
            TaskMapper mapper = session.getMapper(TaskMapper.class);
            mapper.insert(task);
            session.commit();
            return ResponseEntity.status(HttpStatus.CREATED).body(task);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
