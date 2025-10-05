package com.unicircle.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

import com.unicircle.Bean.Club;
import com.unicircle.Bean.EventDTO;
import com.unicircle.Bean.Student;
import com.unicircle.Repository.ClubRepo;
import com.unicircle.Repository.StudentRepo;
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

    @Autowired
    private StudentRepo studentRepo;

    @Autowired
    private ClubRepo clubRepo;

    // get all the events by club id
    public List<Event> getEventsByClubId(int id) {
        return eventRepo.findByClubClubId(id);
    }

    //get the event by their club id and event id
    public Event getEventByClubIdAndEventId(int id, int eventId) {
        return eventRepo.findByClubClubIdAndEventId(id, eventId);
    }

    public Boolean isApply(Integer studentId, Integer eventId) {
        return registrationRepo.existsByStudentStudentIdAndEventEventId(studentId, eventId);
    }

    //    edit the event
    public void editEvent(EventDTO dto) {
        Event event = eventRepo.findById(dto.getEventId())
                .orElseThrow(() -> new RuntimeException("Event not found"));

        event.setTitle(dto.getTitle());
        event.setDescription(dto.getDescription());
        event.setLocation(dto.getLocation());
        event.setStatus(dto.getStatus());

        eventRepo.save(event);
    }

    //    create a new Event
    public void createEvent(EventDTO dto) {
        Event event = new Event();

        // find the club ann student
        Club club = clubRepo.findById(dto.getClubId())
                .orElseThrow(() -> new RuntimeException("Club not found"));
        Student student = studentRepo.findById(dto.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        event.setClub(club);
        event.setCreator(student);

        event.setTitle(dto.getTitle());
        event.setDescription(dto.getDescription());
        event.setLocation(dto.getLocation());
        event.setStatus(dto.getStatus());

        LocalDate startLocalDate = LocalDate.parse(dto.getStartTime());
        LocalDate endLocalDate = LocalDate.parse(dto.getEndTime());

        Date startDate = Date.from(startLocalDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
        Date endDate = Date.from(endLocalDate.atStartOfDay(ZoneId.systemDefault()).toInstant());

        event.setStartTime(startDate);
        event.setEndTime(endDate);

        eventRepo.save(event);
    }
}
