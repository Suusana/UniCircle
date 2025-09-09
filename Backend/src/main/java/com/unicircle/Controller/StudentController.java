package com.unicircle.Controller;

import com.unicircle.Bean.Student;
import com.unicircle.Repository.StudentRepo;
import com.unicircle.Service.StudentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class StudentController {
    private final StudentService service;
    public StudentController(StudentService service) {
        this.service = service;
    }
    @PostMapping({"/signup", "/register"})
    public ResponseEntity<Student> signup(@RequestBody Student student) {
        return ResponseEntity.ok(service.register(student));
    }
}
