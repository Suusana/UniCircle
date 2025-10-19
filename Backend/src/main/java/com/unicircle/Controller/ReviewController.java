package com.unicircle.Controller;

import com.unicircle.Bean.Review;
import com.unicircle.Bean.Student;
import com.unicircle.Repository.ReviewRepo;
import com.unicircle.Service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/reviews")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;
    @Autowired
    private ReviewRepo reviewRepo;

    @PostMapping("/add")
    public Review addReview(
            @RequestParam("studentId") Integer studentId,
            @RequestParam("targetType") String targetType,
            @RequestParam(value = "subjectId", required = false) Integer subjectId,
            @RequestParam(value = "lecturerId", required = false) Integer lecturerId,
            @RequestParam("rate") Integer rate,
            @RequestParam("description") String description) {
        Review review = new Review();
        review.setStudentId(studentId);
        review.setTargetType(targetType);
        review.setRate(rate);
        review.setDescription(description);

        if("Subject".equalsIgnoreCase(targetType)){
            review.setSubjectId(subjectId);
            review.setLecturerId(null);
        } else if("Lecturer".equalsIgnoreCase(targetType)){
            review.setLecturerId(lecturerId);
            review.setSubjectId(null);
        } else {
            throw new IllegalArgumentException("Invalid target type");
        }

        return reviewService.addReview(review);
    }

    @DeleteMapping("/{id}")
    public String deleteReview(@PathVariable("id") Integer id,
                               @RequestParam("studentId") Integer studentId) {

        Review review = reviewRepo.findById(id).orElse(null);
        if (review == null) {
            throw new IllegalArgumentException("Review not found");
        }
        if (!review.getStudentId().equals(studentId)) {
            throw new RuntimeException("Permission denied");
        }
        reviewRepo.delete(review);
        return "deleted";
    }

    @GetMapping("/subjects")
    public List<Object[]> getAllSubjects(){
        return reviewRepo.getAllSubjectStats();
    }

    @GetMapping("/lecturers")
    public List<Object[]> getAllLecturers(){
        return reviewRepo.getAllLecturerStats();
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
        return reviewRepo.findBySubjectIdOrderByCreateAtDesc(id)
                .stream()
                .findFirst()
                .orElse(null);
    }
    
    @GetMapping("/lecturer/{id}/latest")
    public Review getLatestReviewForLecturer(@PathVariable("id") Integer id) {
        return reviewRepo.findByLecturerIdOrderByCreateAtDesc(id)
                .stream()
                .findFirst()
                .orElse(null);
    }

}
