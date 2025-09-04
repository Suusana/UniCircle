package com.unicircle.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.unicircle.Bean.Shortcut;
import com.unicircle.Service.ShortcutService;

@RestController
@CrossOrigin(origins = { "http://localhost:5174", "http://localhost:5173" },
             allowedHeaders = "*",
             methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS },
             allowCredentials = "true",
             maxAge = 3600)
@RequestMapping("/api/studentProfile")
public class StudentProfileController {
    private final ShortcutService shortcutService;

    public StudentProfileController (ShortcutService shortcutService){
        this.shortcutService = shortcutService;
    }

    @GetMapping
    public List<Shortcut> allLinks() {
        return shortcutService.getAllShortcuts();
    }
    
}
