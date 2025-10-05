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

    //Register
    @PostMapping({"/signup", "/register"})
    public Object signup(@RequestBody Student student, HttpSession session) {
        if (student == null || student.getEmail() == null || student.getPassword() == null) {
            return "Email or password are required";
        }
        String norm = student.getEmail().trim().toLowerCase();
        student.setEmail(norm);

        if (studentService.existsByEmail(norm)) {
            return "Email already exists";
        }
        Student saved = studentService.createStudent(student);
        session.setAttribute("student", saved);
        return "Register success";
    }
}
