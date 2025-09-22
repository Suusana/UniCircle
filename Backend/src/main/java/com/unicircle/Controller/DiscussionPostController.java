package com.unicircle.controller;

import com.unicircle.entity.DiscussionPost;
import com.unicircle.service.DiscussionPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "*")
public class DiscussionPostController {

    @Autowired
    private DiscussionPostService service;

    @GetMapping("/sort")
    public List<DiscussionPost> getSorted(@RequestParam String type) {
        return service.getSortedPosts(type);
    }
}
