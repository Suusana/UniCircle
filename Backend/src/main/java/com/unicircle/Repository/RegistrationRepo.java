package com.unicircle.Repository;

import com.unicircle.Bean.Registration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegistrationRepo extends JpaRepository<Registration, Integer> {
    Boolean existsByStudentStudentIdAndEventEventId(Integer studentId, Integer eventId);

    void deleteByStudentStudentIdAndEventEventId(Integer studentId, Integer eventId);

    Registration findByStudentStudentIdAndEventEventId(Integer studentId, Integer eventId);

    Integer countByEventEventId(Integer eventId);
}
