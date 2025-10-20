package com.unicircle.Repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.unicircle.Bean.Appointment;

@Repository
public interface AppointmentRepo extends CrudRepository<Appointment, Integer> {
    List<Appointment> findByStudentStudentIdOrderByAppointmentIdDesc(Integer studentId);

    Appointment findByAppointmentId(Integer appointmentId);

    List<Appointment> findByDate(LocalDate date);

    @Query("""
      select  a
      from  Appointment a
      where a.student.studentId = :studentId and a.status = 'Booked'
      and a.date>= :today
      order by a.date asc
    """)
    List<Appointment> findByStudentIdUpcomingAppointmentInOrder(@Param("studentId") Integer studentId, @Param("today") LocalDate today);
}
