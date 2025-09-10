package com.unicircle.Service;

import com.unicircle.Bean.Event;
import com.unicircle.Repository.EventRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {
    @Autowired
    private EventRepo eventRepo;
    // get all the events by club id
    public List<Event> getEventsByClubId(int id) {
        return eventRepo.findByClubClubId(id);
    }

    //get the event by their club id and event id
    public Event getEventByClubIdAndEventId(int id, int eventId) {
        return eventRepo.findByClubClubIdAndEventId(id,eventId);
    }
}
