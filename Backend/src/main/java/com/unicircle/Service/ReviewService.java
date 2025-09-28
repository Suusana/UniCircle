package com.unicircle.Service;

import com.unicircle.Bean.Review;
import com.unicircle.Repository.ReviewRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepo reviewRepo;

    public Review addReview(Review review) {
        return reviewRepo.save(review);
    }
//    public Review updateReview(Review review) {
//        return reviewRepo.save(review);
//    }

//    public void deleteById(Integer id) {
//        reviewRepo.deleteById(id);
//    }

//    public Review findById(Integer id) {
//        return reviewRepo.findById(id).get();
//    }

    public List<Review> getReviewBySubject(Integer subjectId){
        return reviewRepo.findBySubjectId(subjectId);
    }

    public List<Review> getReviewByLecturer(Integer lecturerId){
        return reviewRepo.findByLecturerId(lecturerId);
    }

    public List<Review> getReviewByStudent(Integer studentId){
        return reviewRepo.findByStudentId(studentId);
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


}
