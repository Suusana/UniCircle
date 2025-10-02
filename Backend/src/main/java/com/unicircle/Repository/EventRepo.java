package com.unicircle.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.unicircle.Bean.Event;

@Repository
public interface EventRepo extends JpaRepository<Event, Integer> {
    List<Event> findByClubClubId(int id);

    Event findByClubClubIdAndEventId(int id, int eventId);

    Event findByEventId(Integer eventId);
  
    //List<Event> findByStudentId(int studentId);

    // [gurpreet] - need this for timetable but lmk if you want it removed
    // find all events from clubs that the student is a member of
    @Query("SELECT ev FROM Event ev JOIN ev.club c JOIN Membership m ON m.club = c WHERE m.student.studentId = :studentId")
    List<Event> findEventsForStudent(@Param("studentId") int studentId);
}
