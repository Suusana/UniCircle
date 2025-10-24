package com.unicircle.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.unicircle.Bean.Appointment;
import com.unicircle.Bean.Club;
import com.unicircle.Bean.Enrollment;
import com.unicircle.Bean.Event;
import com.unicircle.Bean.Shortcut;
import com.unicircle.Bean.Student;
import com.unicircle.Bean.StudentProfileDTO;
import com.unicircle.Service.AppointmentService;
import com.unicircle.Service.EventService;
import com.unicircle.Service.MembershipService;
import com.unicircle.Service.RegistrationService;
import com.unicircle.Service.ShortcutService;
import com.unicircle.Service.StudentService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/studentProfile")
public class StudentProfileController {
    @Autowired
    private ShortcutService shortcutService;

    @Autowired
    private StudentService studentService;
    @Autowired
    private MembershipService membershipService;

    @Autowired
    private EventService eventService;

    @Autowired
    private RegistrationService registrationService;

    @Autowired
    private AppointmentService appointmentService;

    @GetMapping("/allShortcuts") //list all the uni website links
    public List<Shortcut> allLinks() {
        return shortcutService.getAllShortcuts();
    }

    @GetMapping("/loggedInUser")
    public Student loggedInUser(HttpSession session) {
        //("Getting the first user in Student Table :from Controller");
        Student sessionStudent = (Student) session.getAttribute("student");
        if(sessionStudent==null){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "No loggedInUser");
        }
        return studentService.getLoggedInUser(sessionStudent.getStudentId());
    }

    @GetMapping("/MembershipList") //list all the clubs the user joined
    public List<Club> getUserMembershipList(@RequestParam Integer studentId){
        return membershipService.getUserMembershipList(studentId);
    }
// @RequestParam(required=false) Integer studentId,
    @GetMapping("/events") //list all the club events
    public List<Event> getAllRegisteredEvents(@RequestParam Integer studentId){
        List<Event> e = registrationService.getRegisteredEventsList(studentId);
        System.out.println(e);
        return e;
    }
    
    @GetMapping("/appointments") //list all the upcoming appointments
    public List<Appointment> getAllAppointments(@RequestParam Integer studentId){
        return appointmentService.getAllUpcomingAppointments(studentId);
    }

    @GetMapping("/enrollments") //this is to list all the courses on home.jsx
    public List<Enrollment> getAllEnrolledCourses(@RequestParam Integer studentId){
        return studentService.getAllEnrolledCoursesById(studentId);
    }
    @PutMapping("/updateInfo")  //uppdate & save the changes
    public ResponseEntity<Student> updateStudentInfo(@RequestBody StudentProfileDTO entity, HttpSession session) 
    { 
        Student sessionStudent = (Student) session.getAttribute("student");
        Student updatedInfo = studentService.updateStudent(sessionStudent.getStudentId(),entity); 
        session.setAttribute("student", updatedInfo);
        return ResponseEntity.ok(updatedInfo); 
    }


    
}
