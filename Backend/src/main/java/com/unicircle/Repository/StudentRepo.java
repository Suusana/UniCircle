package com.unicircle.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.unicircle.Bean.Student;

@Repository //it handles SQL Queries
public interface StudentRepo extends JpaRepository<Student, Integer> {
    boolean existsByEmail(String email);

    Student findByEmailAndPassword(String email, String password);

    Student findByStudentId(int i);

    Optional<Student> findByEmail(String email);
}
