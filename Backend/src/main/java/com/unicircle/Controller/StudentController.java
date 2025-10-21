package com.unicircle.Controller;

import com.unicircle.Bean.Student;
import com.unicircle.Bean.StudentDTO;
import com.unicircle.Service.StudentService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class StudentController {
    @Autowired
    private StudentService studentService;

    //Register
    @PostMapping({"/signup", "/register"})
    public ResponseEntity<Map<String, String>> signup(@RequestBody StudentDTO dto, HttpSession session) {
        String norm = dto.getEmail().trim().toLowerCase();
        if (studentService.existsByEmail(norm)) {
            return ResponseEntity.ok(Map.of("message", "Email already exists"));
        }

        Student student = new Student();
        student.setEmail(norm);
        student.setPassword(dto.getPassword());
        student.setFirstName(dto.getFirstName());
        student.setLastName(dto.getLastName());
        student.setDegree(dto.getDegree());
        student.setMajor(dto.getMajor());
        student.setYear(dto.getYear());

        Student saved = studentService.createStudent(student);
        session.setAttribute("student", saved);

        return ResponseEntity.ok(Map.of("message", "Success"));
    }
}
