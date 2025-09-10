package com.unicircle.Controller;

import com.unicircle.Bean.Event;
import com.unicircle.Service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EventController {
    @Autowired
    private EventService eventService;

    @GetMapping("/clubs/{id}/events/{eventId}")
    public Event getEvent(@PathVariable int id, @PathVariable int eventId) {
        return eventService.getEventByClubIdAndEventId(id,eventId);
    }
}
