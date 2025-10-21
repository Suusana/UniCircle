package com.unicircle.Controller;

import com.unicircle.Bean.Review;
import com.unicircle.Service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/reviews")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    @PostMapping("/add")
    public Review addReview(
            @RequestParam("studentId") Integer studentId,
            @RequestParam("targetType") String targetType,
            @RequestParam(value = "subjectId", required = false) Integer subjectId,
            @RequestParam(value = "lecturerId", required = false) Integer lecturerId,
            @RequestParam("rate") Integer rate,
            @RequestParam("description") String description) {
        return reviewService.addReview(studentId, targetType, subjectId, lecturerId, rate, description);
    }

    @DeleteMapping("/{id}")
    public String deleteReview(@PathVariable("id") Integer id,
                               @RequestParam("studentId") Integer studentId) {
        reviewService.deleteReview(id, studentId);
        return "deleted";
    }

    @PutMapping("/{id}")
    public Review updateReview(@PathVariable("id") Integer id,
                               @RequestParam("studentId") Integer studentId,
                               @RequestParam("rate") Integer rate,
                               @RequestParam("description") String description) {
        return reviewService.updateReview(id, studentId, rate, description);

    }

    @GetMapping("/subjects")
    public List<Object[]> getAllSubjects(){
        return reviewService.getAllSubjectStats();
    }

    @GetMapping("/lecturers")
    public List<Object[]> getAllLecturers(){
        return reviewService.getAllLecturerStats();
    }

    @GetMapping("/subject/{id}")
    public List<Review> getSubjectReviews(@PathVariable("id") Integer id) {
        return reviewService.getReviewBySubject(id);
    }

    @GetMapping("/lecturer/{id}")
    public List<Review> getLectureReviews(@PathVariable("id") Integer id) {
        return reviewService.getReviewByLecturer(id);
    }

    @GetMapping("/subject/{id}/stats")
    public Object getSubjectStats(@PathVariable("id") Integer id) {
        return reviewService.getSubjectStats(id);
    }

    @GetMapping("/lecturer/{id}/stats")
    public Object getLecturerStats(@PathVariable("id") Integer id) {
        return reviewService.getLecturerStats(id);
    }

    @GetMapping("/subject/{id}/latest")
    public Review getLatestReview(@PathVariable("id") Integer id) {
       return reviewService.getLatestReviewForSubject(id);
    }
    
    @GetMapping("/lecturer/{id}/latest")
    public Review getLatestReviewForLecturer(@PathVariable("id") Integer id) {
        return reviewService.getLatestReviewForLecturer(id);
    }

}
