package com.taskflow.taskflowbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.taskflow.taskflowbackend.entity.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {

}