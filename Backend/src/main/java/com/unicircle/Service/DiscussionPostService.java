package com.unicircle.service;

import com.unicircle.entity.DiscussionPost;
import com.unicircle.repository.DiscussionPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DiscussionPostService {

    @Autowired
    private DiscussionPostRepository repository;

    public List<DiscussionPost> getSortedPosts(String type) {
        switch (type.toLowerCase()) {
            case "newest":
                return repository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
            case "most_commented":
                return repository.findMostCommented();
            case "trending":
                return repository.findTrending();
            default:
                return repository.findAll();
        }
    }
}
