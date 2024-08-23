package com.prueba_java.demo.mappers;

import com.prueba_java.demo.models.Task;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface TaskMapper {
    @Select("SELECT * FROM tasks")
    List<Task> findAll();
    @Insert("INSERT INTO tasks (name, description, start_date) VALUES (#{name}, #{description},#{start_date})")
    void insert(Task task);
}
