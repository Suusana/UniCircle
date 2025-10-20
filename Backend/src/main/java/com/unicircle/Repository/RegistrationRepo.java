package com.unicircle.Repository;

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
// @Query("""
//   select r.event
//   from Registration r
//   where r.student.studentId = :studentId
//     and r.event.startTime >= CURRENT_TIMESTAMP
//   order by r.event.startTime asc
// """)
// List<Event> findUpcomingEventsByStudent(@Param("studentId") Integer studentId);
    @Query("""
      select r.event
      from Registration r
      where r.student.studentId = :studentId and r.checkedIn = false
      and r.event.startTime >= CURRENT_TIMESTAMP
      order by r.event.startTime asc
    """)
    List<Event> findByStudentId(@Param("studentId") Integer studentId);
}
//  and r.event.startTime >= CURRENT_TIMESTAMP