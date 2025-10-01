package com.unicircle.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.unicircle.Bean.Event;

@Repository
public interface EventRepo extends JpaRepository<Event, Integer> {
    List<Event> findByClubClubId(int id);

    Event findByClubClubIdAndEventId(int id, int eventId);

    Event findByEventId(Integer eventId);

   
    //List<Event> findByStudentId(int studentId);
}
