package com.unicircle.Controller;

import com.unicircle.Bean.Appointment;
import com.unicircle.Bean.AppointmentDTO;
import com.unicircle.Service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
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

    //get all the time slot occupied based on the selected date
    @GetMapping("/getTimeSlots")
    public List<String> getTimeSlots(@RequestParam LocalDate date) {
        return appointmentService.getTimeSlots(date);
    }

    //submit an appointment
    @PostMapping("/submitAppointment")
    public void submitAppointment(@RequestBody AppointmentDTO dto) {
        appointmentService.submitAppointment(dto);
    }
}
