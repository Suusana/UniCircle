package com.unicircle.Controller;

import com.unicircle.Bean.Student;
import com.unicircle.Service.StudentService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private StudentService studentService;

    // Login
    @PostMapping("/login")
    public Object login(@RequestBody LoginReq req, HttpSession session) {
        Student student = studentService.validateStudent(req.email(), req.password());
        if (student == null) {
            return "Invalid email or password";
        }
        // set Student in session
        session.setAttribute("student", student);

        return student;
    }

    // Logout
    @PostMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "Logout success";
    }

    // DTO for login request, holds email and password from the client
    public record LoginReq(String email, String password) {}
}
