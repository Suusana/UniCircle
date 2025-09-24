package com.unicircle.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import com.unicircle.Bean.Club;
import com.unicircle.Bean.Shortcut;
import com.unicircle.Bean.Student;
import com.unicircle.Service.MembershipService;
import com.unicircle.Service.ShortcutService;
import com.unicircle.Service.StudentService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/studentProfile")
public class StudentProfileController {
    @Autowired
    private ShortcutService shortcutService;

    @Autowired
    private StudentService studentService;
    @Autowired
    private MembershipService membershipService;

    @GetMapping("/allShortcuts")
    public List<Shortcut> allLinks() {
        return shortcutService.getAllShortcuts();
    }

    @GetMapping("/loggedInUser")
    public Student loggedInUser(HttpSession session) {
        //("Getting the first user in Student Table :from Controller");
        Student sessionStudent = (Student) session.getAttribute("student");
        if(sessionStudent==null){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "No loggedInUser");
        }
        return studentService.getLoggedInUser(sessionStudent.getStudentId());
    }

    @GetMapping("/MembershipList")
    public List<Club> getUserMembershipList(@RequestParam Integer studentId){
        return membershipService.getUserMembershipList(studentId);
    }

    @PutMapping("/updateInfo") 
    public ResponseEntity<Student> updateStudentInfo(@RequestBody Student entity, HttpSession session) 
    { 
        Student sessionStudent = (Student) session.getAttribute("student");

        Student updatedInfo = studentService.updateStudent(sessionStudent.getStudentId(),entity); 
        session.setAttribute("student", updatedInfo);
        return ResponseEntity.ok(updatedInfo); 
    }
    
}
