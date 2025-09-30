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
    List<Review> findByStudentId(Integer studentId);

    @Query("SELECT r.subjectId, AVG(r.rate), COUNT(r) FROM Review r GROUP BY r.subjectId")
    List<Object[]> getAllSubjectStats();

    @Query("SELECT r.lecturerId, AVG(r.rate), COUNT(r) FROM Review r GROUP BY r.lecturerId")
    List<Object[]> getAllLecturerStats();
}
