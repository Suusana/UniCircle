package com.unicircle.Controller;

import com.unicircle.Bean.Comment;
import com.unicircle.Bean.Discussion;
import com.unicircle.Repository.CommentRepo;
import com.unicircle.Repository.DiscussionRepo;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/discussion")
public class DiscussionController {

  private final DiscussionRepo discussionRepo;
  private final CommentRepo commentRepo;

  public DiscussionController(DiscussionRepo discussionRepo, CommentRepo commentRepo) {
    this.discussionRepo = discussionRepo;
    this.commentRepo = commentRepo;
  }

  @GetMapping
  public List<Discussion> all() {
    return discussionRepo.findAll();
  }

  @PostMapping
  public Discussion create(@RequestBody Discussion d) {
    d.setCreatedAt(LocalDateTime.now());
    // comments should be null on create; tags allowed
    return discussionRepo.save(d);
  }

  @PostMapping("/{id}/comments")
  public Comment addComment(@PathVariable Long id, @RequestBody Comment c) {
    Discussion d = discussionRepo.findById(id).orElseThrow();
    c.setDiscussion(d);
    c.setCreatedAt(LocalDateTime.now());
    return commentRepo.save(c);
  }
}
