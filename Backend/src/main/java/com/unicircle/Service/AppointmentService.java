package com.unicircle.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

import com.unicircle.Bean.AppointmentDTO;
import com.unicircle.Bean.Student;
import com.unicircle.Repository.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.unicircle.Bean.Appointment;
import com.unicircle.Repository.AppointmentRepo;

@Service
public class AppointmentService {
    @Autowired
    private AppointmentRepo appointmentRepo;
    @Autowired
    private StudentRepo studentRepo;

    //get all appointment records
    public List<Appointment> getAllAppointments(Integer studentId) {
        return appointmentRepo.findByStudentStudentIdOrderByAppointmentIdDesc(studentId);
    }

    public List<Appointment> getAllUpcomingAppointments(Integer studentId){
        LocalDate today = ZonedDateTime.now(ZoneId.of("Australia/Sydney")).toLocalDate();
        return appointmentRepo.findByStudentIdUpcomingAppointmentInOrder(studentId, today);
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
    public void submitAppointment(AppointmentDTO dto) {
        Student student = studentRepo.findById(dto.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Appointment appointment = new Appointment();
        appointment.setStudent(student);
        appointment.setTitle(dto.getTitle());
        appointment.setDescription(dto.getDescription());
        appointment.setDate(LocalDate.parse(dto.getDate()));
        appointment.setTimeSlot(dto.getTimeSlot());
        appointment.setStatus(dto.getStatus());

        //check if the time is empty or not
        if (appointment.getDate() == null) {
            throw new IllegalArgumentException("Appointment date cannot be null");
        }

        // check if the time is after today or not
        if (!appointment.getDate().isAfter(LocalDate.now())) {
            throw new IllegalArgumentException("Appointment date must be in the future");
        }
        appointmentRepo.save(appointment);
    }
}
