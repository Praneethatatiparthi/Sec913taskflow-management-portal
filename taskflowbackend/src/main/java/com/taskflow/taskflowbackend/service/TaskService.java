package com.taskflow.taskflowbackend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.taskflow.taskflowbackend.entity.Task;
import com.taskflow.taskflowbackend.repository.TaskRepository;

@Service

public class TaskService {

    @Autowired

    private TaskRepository taskRepository;

    // CREATE TASK

    public Task createTask(Task task) {

        return taskRepository.save(task);

    }

    // GET ALL TASKS

    public List<Task> getAllTasks() {

        return taskRepository.findAll();

    }

    // DELETE TASK

    public void deleteTask(Long id) {

        taskRepository.deleteById(id);

    }

}