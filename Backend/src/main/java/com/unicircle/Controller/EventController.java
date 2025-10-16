package com.unicircle.Controller;

import com.unicircle.Bean.Event;
import com.unicircle.Bean.EventDTO;
import com.unicircle.Service.EventService;
import com.unicircle.Service.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class EventController {
    @Autowired
    private EventService eventService;

    @Autowired
    private RegistrationService registrationService;

    @GetMapping("/clubs/{id}/events/{eventId}")
    public Event getEvent(@PathVariable int id, @PathVariable int eventId) {
        return eventService.getEventByClubIdAndEventId(id,eventId);
    }

    //check if the current event is apply by the user or not
    @GetMapping("/events/isApply")
    public Boolean isApply(@RequestParam Integer studentId, @RequestParam Integer eventId) {
        return eventService.isApply(studentId,eventId);
    }

    //cancel the event
    @DeleteMapping("/events/cancelEvent")
    public void cancelEvent(@RequestParam Integer studentId, @RequestParam Integer eventId) {
        registrationService.cancelEvent(studentId,eventId);
    }

    //apply for the event
    @PostMapping("/events/applyForEvent")
    public void applyForEvent(@RequestParam Integer studentId, @RequestParam Integer eventId) {
        registrationService.applyForEvent(studentId,eventId);
    }

    //check in event
    @PutMapping("/events/checkIn")
    public void checkIn(@RequestParam Integer studentId, @RequestParam Integer eventId) {
        registrationService.CheckIn(studentId,eventId);
    }

    //get the current status of event registration
    @GetMapping("/events/registrationStatus")
    public Boolean getRegistrationStatus(@RequestParam Integer studentId, @RequestParam Integer eventId) {
        return registrationService.getRegistrationStatus(studentId,eventId);
    }

    //get the number of attndees
    @GetMapping("/events/getNum")
    public Integer getNum(@RequestParam Integer eventId) {
        return registrationService.getNum(eventId);
    }

//    edit event
    @PostMapping("/events/editEvent")
    public void editEvent(@RequestBody EventDTO event) {
        eventService.editEvent(event);
    }

    //    create event
    @PostMapping("/events/createEvent")
    public void createEvent(@RequestBody EventDTO event) {
        eventService.createEvent(event);
    }

    // delete event
    @DeleteMapping("/events/deleteEvent/{eventId}")
    public void deleteEvent(@PathVariable Integer eventId) {
        eventService.deleteEvent(eventId);
    }
}
