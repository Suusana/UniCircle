package com.unicircle.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.unicircle.Bean.Appointment;
import com.unicircle.Repository.AppointmentRepo;

@Service
public class AppointmentService {
    @Autowired
    private AppointmentRepo appointmentRepo;

    //get all appointment records
    public List<Appointment> getAllAppointments(Integer studentId) {
        return appointmentRepo.findByStudentStudentIdOrderByAppointmentIdDesc(studentId);
    }

    public List<Appointment> getAllUpcomingAppointments(Integer studentId){
        LocalDateTime now = LocalDateTime.now(ZoneOffset.UTC);
        return appointmentRepo.findByStudentIdUpcomingAppointmentInOrder(studentId, now);
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
    //get all the time slot occupied based on the selected date
    public List<String> getTimeSlots(LocalDate date) {
        List<Appointment> appointments = appointmentRepo.findByDate(date);
        List<String> timeSlots = new ArrayList<>();
        appointments.forEach(a->
                timeSlots.add(a.getTimeSlot()));
        return timeSlots;
    }

    //submit an appointment
    public void submitAppointment(Appointment appointment) {
        appointmentRepo.save(appointment);
    }
}
