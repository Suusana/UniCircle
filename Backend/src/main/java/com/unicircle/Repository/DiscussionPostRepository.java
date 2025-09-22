package com.unicircle.repository;

import com.unicircle.entity.DiscussionPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiscussionPostRepository extends JpaRepository<DiscussionPost, Long> {

    @Query("SELECT p FROM DiscussionPost p ORDER BY p.createdAt DESC")
    List<DiscussionPost> findNewest();

    @Query("SELECT p FROM DiscussionPost p ORDER BY p.commentCount DESC")
    List<DiscussionPost> findMostCommented();

    // ✅ Use SQLite native query for trending
    @Query(value = "SELECT * FROM discussion_post " +
                   "WHERE created_at >= DATE('now', '-7 days') " +
                   "ORDER BY comment_count DESC",
           nativeQuery = true)
    List<DiscussionPost> findTrending();
}
