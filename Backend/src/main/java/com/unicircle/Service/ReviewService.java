//contributor: Zizhu Zhao
package com.unicircle.Service;

import com.unicircle.Bean.Review;
import com.unicircle.Repository.ReviewRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepo reviewRepo;
    //Determine whether the target is a Subject or Lecturer, and set the corresponding ID
    public Review addReview(Integer studentId, String targetType, Integer subjectId, Integer lecturerId, Integer rate, String description) {
        Review review = new Review();
        review.setStudentId(studentId);
        review.setTargetType(targetType);
        review.setRate(rate);
        review.setDescription(description);

        if("Subject".equals(targetType)){
            review.setSubjectId(subjectId);
            review.setLecturerId(null);
        } else if("Lecturer".equals(targetType)){
            review.setLecturerId(lecturerId);
            review.setSubjectId(null);
        } else {
            throw new IllegalArgumentException("Invalid target type");
        }

        return reviewRepo.save(review);
    }

    //Validate ownership before deletion
    public void deleteReview(Integer id, Integer studentId) {
        Review review = reviewRepo.findById(id).orElseThrow(() -> new IllegalArgumentException("Review not found"));
        if(!review.getStudentId().equals(studentId)){
            throw new RuntimeException("Permission denied");
        }
        reviewRepo.delete(review);
    }

    //Update a review's rating and description
    public Review updateReview(Integer id, Integer studentId, Integer rate, String description) {
        Review review = reviewRepo.findById(id).orElseThrow(() -> new IllegalArgumentException("Review not found"));
        if(!review.getStudentId().equals(studentId)){
            throw new RuntimeException("Permission denied");
        }
        review.setRate(rate);
        review.setDescription(description);
        return reviewRepo.save(review);
    }

    public List<Review> getReviewBySubject(Integer subjectId){
        return reviewRepo.findBySubjectId(subjectId);
    }

    public List<Review> getReviewByLecturer(Integer lecturerId){
        return reviewRepo.findByLecturerId(lecturerId);
    }

    //Retrieve the most recent review record ordered by creation time
    public Map<String, Object> getSubjectStats(Integer subjectId) {
        Object[] row = reviewRepo.getAllSubjectStats().stream()
                .filter(r -> r[0].equals(subjectId))
                .findFirst()
                .orElse(new Object[]{subjectId, 0.0, 0L});

        Map<String, Object> map = new HashMap<>();
        map.put("avg", row[1] != null ? row[1] : 0.0);  // row[1] = AVG
        map.put("count", row[2] != null ? row[2] : 0L); // row[2] = COUNT
        return map;
    }

    public Map<String, Object> getLecturerStats(Integer lecturerId) {
        Object[] row = reviewRepo.getAllLecturerStats().stream()
                .filter(r -> r[0].equals(lecturerId))
                .findFirst()
                .orElse(new Object[]{lecturerId, 0.0, 0L});

        Map<String, Object> map = new HashMap<>();
        map.put("avg", row[1] != null ? row[1] : 0.0);  // row[1] = AVG
        map.put("count", row[2] != null ? row[2] : 0L); // row[2] = COUNT
        return map;
    }

    public Review getLatestReviewForSubject(Integer subjectId) {
        return reviewRepo.findBySubjectIdOrderByCreateAtDesc(subjectId)
                .stream()
                .findFirst()
                .orElse(null);
    }

    public Review getLatestReviewForLecturer(Integer lecturerId) {
        return reviewRepo.findByLecturerIdOrderByCreateAtDesc(lecturerId)
                .stream()
                .findFirst()
                .orElse(null);

    }

    public List<Map<String, Object>> getAllLecturerStatsWithLatest() {
        return reviewRepo.getAllLecturerStats().stream().map(r -> {
            Map<String, Object> map = new LinkedHashMap<>();
            map.put("id", r[0]);
            map.put("name", r[1]);
            map.put("faculty", r[2]);
            map.put("avgRating", ((Number) r[3]).doubleValue());
            map.put("reviewCount", ((Number) r[4]).longValue());
            map.put("latestReviewTime", r[5] != null ? r[5].toString() : null);
            return map;
        }).collect(Collectors.toList());
    }

    public List<Map<String, Object>> getAllSubjectStatsWithLatest() {
        return reviewRepo.getAllSubjectStats().stream().map(r -> {
            Map<String, Object> map = new LinkedHashMap<>();
            map.put("id", r[0]);
            map.put("name", r[1]);
            map.put("faculty", r[2]);           
            map.put("avgRating", ((Number) r[3]).doubleValue());
            map.put("reviewCount", ((Number) r[4]).longValue());
            map.put("latestReviewTime", r[5] != null ? r[5].toString() : null);
            return map;
        }).collect(Collectors.toList());
    }



}
