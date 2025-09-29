package com.unicircle.Service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.unicircle.Bean.Event;
import com.unicircle.Bean.Registration;
import com.unicircle.Bean.Student;
import com.unicircle.Repository.EventRepo;
import com.unicircle.Repository.RegistrationRepo;
import com.unicircle.Repository.StudentRepo;

import jakarta.transaction.Transactional;

@Service
public class RegistrationService {
    @Autowired
    private RegistrationRepo registrationRepo;

    @Autowired
    private StudentRepo studentRepo;

    @Autowired
    private EventRepo eventRepo;

    //cancel the event
    @Transactional
    public void cancelEvent(Integer studentId, Integer eventId) {
        registrationRepo.deleteByStudentStudentIdAndEventEventId(studentId,eventId);
    }

    //apply for the event
    public void applyForEvent(Integer studentId, Integer eventId) {
        Student student = studentRepo.findByStudentId(studentId);
        Event event = eventRepo.findByEventId(eventId);
        Registration registration = new Registration();
        registration.setStudent(student);
        registration.setEvent(event);
        registration.setCheckedIn(false);
        registrationRepo.save(registration);
    }

    //check in event
    public void CheckIn(Integer studentId, Integer eventId) {
        Registration registration = registrationRepo.findByStudentStudentIdAndEventEventId(studentId,eventId);
        registration.setCheckedIn(true);
        registrationRepo.save(registration);
    }

    public Boolean getRegistrationStatus(Integer studentId, Integer eventId) {
        Registration registration = registrationRepo.findByStudentStudentIdAndEventEventId(studentId,eventId);
        if (registration==null){ // havent apply for the event, no recortd in DB
            return false;
        }
        return registration.getCheckedIn();
    }

    //get the number of attndees
    public Integer getNum(Integer eventId) {
        return registrationRepo.countByEventEventId(eventId);
    }

    public List<Event> getRegisteredEventsList(int id){
        return registrationRepo.findAllRegisteredEventsByStudentId(id);
    }
}
