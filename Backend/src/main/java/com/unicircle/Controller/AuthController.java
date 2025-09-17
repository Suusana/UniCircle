package com.unicircle.Controller;

import com.unicircle.Bean.Student;
import com.unicircle.Service.StudentService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    private final StudentService studentService;

    public AuthController(StudentService studentService) {
        this.studentService = studentService;
    }

    // Login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginReq req, HttpSession session) {
        Student student = studentService.validateStudent(req.email(), req.password());
        if (student == null) {
            return ResponseEntity.status(401).body("Invalid email or password");
        }

        //
        StudentView view = new StudentView(
                student.getStudentId(),
                student.getEmail(),
                student.getFirstName(),
                student.getLastName(),
                student.getDegree(),
                student.getMajor(),
                student.getYear()
        );

        session.setAttribute("student", view);
        return ResponseEntity.ok(view);
    }

    // Logout
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok("Logout success");
    }

    // Get email and password from frontend, pack them
    public record LoginReq(String email, String password) {}

    // return student safe information
    public record StudentView(
            Integer studentId,
            String email,
            String firstName,
            String lastName,
            String degree,
            String major,
            Integer year
    ) {}
}
