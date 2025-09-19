package com.unicircle.Repository;

import com.unicircle.Bean.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepo extends JpaRepository<Event, Integer> {
    List<Event> findByClubClubId(int id);

    Event findByClubClubIdAndEventId(int id, int eventId);

    Event findByEventId(Integer eventId);
}
