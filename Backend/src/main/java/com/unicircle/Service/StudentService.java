package com.unicircle.Service;

import com.unicircle.Bean.Student;
import com.unicircle.Repository.StudentRepo;
import org.springframework.stereotype.Service;

@Service
public class StudentService {
    private final StudentRepo studentRepo;
    public StudentService(StudentRepo studentRepo) {
        this.studentRepo = studentRepo;
    }
    public Student register(Student student) {
        if (studentRepo.existsByEmail(student.getEmail())){
            throw new RuntimeException("Email Already Exists");
        }
        return studentRepo.save(student);
    }
}
