//contributors: gurpreet 
package com.unicircle.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.unicircle.Bean.Timetable;
import com.unicircle.Bean.Student;

public interface TimetableRepo extends JpaRepository<Timetable, Integer> {
    Optional<Timetable> findByStudentAndSemesterAndYear(Student student, String semester, Integer year);
    List<Timetable> findByStudent(Student student);
}
