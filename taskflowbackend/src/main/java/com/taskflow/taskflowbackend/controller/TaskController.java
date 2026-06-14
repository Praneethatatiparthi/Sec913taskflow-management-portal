package com.taskflow.taskflowbackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.taskflow.taskflowbackend.entity.Task;
import com.taskflow.taskflowbackend.service.TaskService;

@RestController

@RequestMapping("/api/tasks")

@CrossOrigin("*")

public class TaskController {

    @Autowired

    private TaskService taskService;

    // CREATE TASK

    @PostMapping

    public Task createTask(@RequestBody Task task) {

        return taskService.createTask(task);

    }

    // GET ALL TASKS

    @GetMapping

    public List<Task> getAllTasks() {

        return taskService.getAllTasks();

    }

    // DELETE TASK

    @DeleteMapping("/{id}")

    public String deleteTask(@PathVariable Long id) {

        taskService.deleteTask(id);

        return "Task deleted successfully";

    }

}