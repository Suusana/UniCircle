package com.unicircle.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.unicircle.Bean.Event;
import com.unicircle.Repository.EventRepo;
import com.unicircle.Repository.RegistrationRepo;

@Service
public class EventService {
    @Autowired
    private EventRepo eventRepo;

    @Autowired
    private RegistrationRepo registrationRepo;
    // get all the events by club id
    public List<Event> getEventsByClubId(int id) {
        return eventRepo.findByClubClubId(id);
    }

    //get the event by their club id and event id
    public Event getEventByClubIdAndEventId(int id, int eventId) {
        return eventRepo.findByClubClubIdAndEventId(id,eventId);
    }

    public Boolean isApply(Integer studentId, Integer eventId) {
        return registrationRepo.existsByStudentStudentIdAndEventEventId(studentId,eventId);
    }

    // public List<Event> getEventsByStudentId(int id){
    //     return eventRepo.findByStudentId(id);
    // }
}
