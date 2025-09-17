package com.unicircle.Repository;

import com.unicircle.Bean.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepo extends JpaRepository<Student, Integer> {
    boolean existsByEmail(String email);

    Student findByEmailAndPassword(String email, String password);

    Student findByStudentId(int i);
}
