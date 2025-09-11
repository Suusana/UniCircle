package com.unicircle.Controller;

import java.util.List;

import com.unicircle.Bean.Student;
import com.unicircle.Service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.unicircle.Bean.Shortcut;
import com.unicircle.Service.ShortcutService;

@RestController
//@CrossOrigin(origins = { "http://localhost:5174", "http://localhost:5173" },
//             allowedHeaders = "*",
//             methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS },
//             allowCredentials = "true",
//             maxAge = 3600)
@RequestMapping("/api/studentProfile")
public class StudentProfileController {
    @Autowired
    private ShortcutService shortcutService;

    @Autowired
    private StudentService studentService;

    @GetMapping
    public List<Shortcut> allLinks() {
        return shortcutService.getAllShortcuts();
    }

    @GetMapping("/getUser")
    public Student getUser() {
        return studentService.getUser();
    }
    
}
