package com.unicircle.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.unicircle.Bean.ClassEntity;

@Repository
public interface ClassEntityRepo extends JpaRepository<ClassEntity, Integer> {
    @Query("SELECT c FROM ClassEntity c WHERE c.subject.subjectId IN " +
            "(SELECT e.subject.subjectId FROM Enrollment e WHERE e.student.studentId = :studentId)")
    List<ClassEntity> findClassesForStudent(@Param("studentId") int studentId);

}
