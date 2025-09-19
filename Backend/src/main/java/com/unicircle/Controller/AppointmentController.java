package com.unicircle.Controller;

import com.unicircle.Bean.Appointment;
import com.unicircle.Service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {
    @Autowired
    private AppointmentService appointmentService;

    // get all appointment records
    @GetMapping("/getAll")
    public List<Appointment> getAllAppointments(@RequestParam Integer studentId) {
        return appointmentService.getAllAppointments(studentId);
    }

    //check in the appointment
    @PutMapping("/checkIn")
    public void checkIn(@RequestParam Integer appointmentId) {
        appointmentService.checkIn(appointmentId);
    }

    //cancel appointment
    @DeleteMapping("/cancel")
    public void cancel(@RequestParam Integer appointmentId) {
        appointmentService.cancel(appointmentId);
    }
}
