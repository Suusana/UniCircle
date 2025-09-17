package com.unicircle.Controller;

import com.unicircle.Bean.Student;
import com.unicircle.Service.StudentService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StudentController {
    @Autowired
    private StudentService studentService;
    @PostMapping({"/signup", "/register"})
    public Object signup(@RequestBody Student student, HttpSession session) {
        if (studentService.existsByEmail(student.getEmail())) {
            return "Email already exists";
        }

        Student saved = studentService.createStudent(student);
        session.setAttribute("student", saved);
        return saved;
    }
}
