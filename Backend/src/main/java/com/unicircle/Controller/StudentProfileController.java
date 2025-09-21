package com.unicircle.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.unicircle.Bean.Shortcut;
import com.unicircle.Bean.Student;
import com.unicircle.Service.ShortcutService;
import com.unicircle.Service.StudentService;

@RestController
//@CrossOrigin(origins = { "http://localhost:5174", "http://localhost:5173" },
//             allowedHeaders = "*",
//             methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS },
//             allowCredentials = "true",
//             maxAge = 3600)
@RequestMapping("/studentProfile")
public class StudentProfileController {
    @Autowired
    private ShortcutService shortcutService;

    @Autowired
    private StudentService studentService;

    @GetMapping("/allShortcuts")
    public List<Shortcut> allLinks() {
        return shortcutService.getAllShortcuts();
    }

    @GetMapping("/getUser")
    public Student loggedInUser() {
        //("Getting the first user in Student Table :from Controller");
        return studentService.getUser();
    }

@PutMapping("/updateInfo") 
public ResponseEntity<Student> updateStudentInfo(@RequestBody Student entity) 
{ Student updatedInfo = studentService.updateStudent(entity); 
    return ResponseEntity.ok(updatedInfo); }
    
}
