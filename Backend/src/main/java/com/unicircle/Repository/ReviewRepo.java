package com.unicircle.Repository;

import com.unicircle.Bean.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepo extends JpaRepository<Review, Integer> {
    List<Review> findBySubjectId(Integer subjectId);
    List<Review> findByLecturerId(Integer lecturerId);
    List<Review> findBySubjectIdOrderByCreateAtDesc(Integer subjectId);
    List<Review> findByLecturerIdOrderByCreateAtDesc(Integer lecturerId);

    //Get statistics for all subjects, including: subjectId, subject name, faculty, average rating (0 if no reviews), total number of reviews
    @Query("SELECT s.subjectId, s.name, s.faculty, COALESCE(AVG(r.rate), 0), COUNT(r), MAX(r.createAt) " +
            "FROM Subject s LEFT JOIN Review r ON s.subjectId = r.subjectId " +
            "GROUP BY s.subjectId, s.name, s.faculty")
    List<Object[]> getAllSubjectStats();

    //    //Get statistics for all lecturers, including: lecturerId, lecturer full name, faculty, average rating (0 if no reviews), total number of reviews
    @Query("SELECT l.lecturerId, CONCAT(l.firstName, ' ', l.lastName), l.faculty, COALESCE(AVG(r.rate),0), COUNT(r), MAX(r.createAt)" +
        "FROM Lecturer l LEFT JOIN Review r ON l.lecturerId = r.lecturerId " +
        "GROUP BY l.lecturerId, l.firstName, l.lastName, l.faculty")
    List<Object[]> getAllLecturerStats();

}
