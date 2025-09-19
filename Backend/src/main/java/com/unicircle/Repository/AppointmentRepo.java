package com.unicircle.Repository;

import com.unicircle.Bean.Appointment;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepo extends CrudRepository<Appointment, Integer> {
    List<Appointment> findByStudentStudentId(Integer studentId);

    Appointment findByAppointmentId(Integer appointmentId);
}
