package com.unicircle.Service;

import com.unicircle.Bean.Appointment;
import com.unicircle.Repository.AppointmentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {
    @Autowired
    private AppointmentRepo appointmentRepo;

    //get all appointment records
    public List<Appointment> getAllAppointments(Integer studentId) {
        return appointmentRepo.findByStudentStudentId(studentId);
    }

    //check in appointment
    public void checkIn(Integer appointmentId) {
        Appointment a = appointmentRepo.findByAppointmentId(appointmentId);
        a.setStatus("Completed");
        appointmentRepo.save(a);
    }

    //cancel appointment
    public void cancel(Integer appointmentId) {
        Appointment a = appointmentRepo.findByAppointmentId(appointmentId);
        a.setStatus("Cancelled");
        appointmentRepo.save(a);
    }
}
