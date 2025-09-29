package com.unicircle.Repository;

//mport java.time.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.unicircle.Bean.Event;
import com.unicircle.Bean.Registration;
@Repository
public interface RegistrationRepo extends JpaRepository<Registration, Integer> {
    Boolean existsByStudentStudentIdAndEventEventId(Integer studentId, Integer eventId);

    void deleteByStudentStudentIdAndEventEventId(Integer studentId, Integer eventId);

    Registration findByStudentStudentIdAndEventEventId(Integer studentId, Integer eventId);

    Integer countByEventEventId(Integer eventId);

    // @Query("""
    //         select r.event from Registration r
    //         where r.student.studentId = :studentId
    //         and r.event.startTime >= :now
    //         order by r.event.startTime asc
    //         """)
    @Query(value = """
        SELECT e.*
        FROM Registration r
        JOIN Event e ON e.event_id = r.event_id
        WHERE r.student_id = :studentId
          AND datetime(e.start_time) >= datetime('now','localtime')  -- use 'now' if you store UTC
        ORDER BY datetime(e.start_time) ASC
    """, nativeQuery = true)
    List<Event> findAllRegisteredEventsByStudentId(@Param("studentId") Integer studentId);
}
