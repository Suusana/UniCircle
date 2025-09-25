package com.unicircle.backend;

import com.unicircle.Repository.*;
import com.unicircle.Service.*;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;

import com.unicircle.Bean.Appointment;
import com.unicircle.Repository.StudentRepo;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
public class AppointmentTest {
    @Mock
    private StudentRepo studentRepo;
    @Mock
    private AppointmentRepo appointmentRepo;

    @InjectMocks
    private AppointmentService appointmentService;

//    submit an appointment that applied for the past date.
    @Test
    void testSubmitAppointment_PastDate() {
        Appointment pastAppointment = new Appointment();
        pastAppointment.setDate(LocalDate.now().minusDays(1));
        pastAppointment.setTimeSlot("09:00-10:00");

        Exception ex = assertThrows(IllegalArgumentException.class, () -> {
            appointmentService.submitAppointment(pastAppointment);
        });

        assertEquals("Appointment date must be in the future", ex.getMessage());

        // 确认没有保存到 repo
        Mockito.verify(appointmentRepo, Mockito.never()).save(Mockito.any());
    }
}
