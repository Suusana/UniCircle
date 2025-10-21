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

    //add a review for either a subject or a lecturer
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

    //Delete a review if the requester owns it
    @DeleteMapping("/{id}")
    public String deleteReview(@PathVariable("id") Integer id,
                               @RequestParam("studentId") Integer studentId) {
        reviewService.deleteReview(id, studentId);
        return "deleted";
    }

    //Update an existing review's rating or description
    @PutMapping("/{id}")
    public Review updateReview(@PathVariable("id") Integer id,
                               @RequestParam("studentId") Integer studentId,
                               @RequestParam("rate") Integer rate,
                               @RequestParam("description") String description) {
        return reviewService.updateReview(id, studentId, rate, description);

    }

    //Get average ratings and review counts for all subjects
    @GetMapping("/subjects")
    public List<Object[]> getAllSubjects(){
        return reviewService.getAllSubjectStats();
    }
    //Get average ratings and review counts for all lecturers
    @GetMapping("/lecturers")
    public List<Object[]> getAllLecturers(){
        return reviewService.getAllLecturerStats();
    }

    //Get individual reviews for a specific subject
    @GetMapping("/subject/{id}")
    public List<Review> getSubjectReviews(@PathVariable("id") Integer id) {
        return reviewService.getReviewBySubject(id);
    }
    //Get individual reviews for a specific lecturer
    @GetMapping("/lecturer/{id}")
    public List<Review> getLectureReviews(@PathVariable("id") Integer id) {
        return reviewService.getReviewByLecturer(id);
    }

    //Get average rating and total count for one subject
    @GetMapping("/subject/{id}/stats")
    public Object getSubjectStats(@PathVariable("id") Integer id) {
        return reviewService.getSubjectStats(id);
    }
    //Get average rating and total count for one lecturer
    @GetMapping("/lecturer/{id}/stats")
    public Object getLecturerStats(@PathVariable("id") Integer id) {
        return reviewService.getLecturerStats(id);
    }

    //Fetch the most recently created review for the given subject
    @GetMapping("/subject/{id}/latest")
    public Review getLatestReview(@PathVariable("id") Integer id) {
       return reviewService.getLatestReviewForSubject(id);
    }
    //Fetch the most recently created review for the given lecturer
    @GetMapping("/lecturer/{id}/latest")
    public Review getLatestReviewForLecturer(@PathVariable("id") Integer id) {
        return reviewService.getLatestReviewForLecturer(id);
    }

}
