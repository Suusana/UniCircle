package com.unicircle.Controller;

import com.unicircle.Bean.Student;
import com.unicircle.Service.StudentService;
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
    public ResponseEntity<Student> signup(@RequestBody Student student) {
        return ResponseEntity.ok(studentService.register(student));
    }
}
