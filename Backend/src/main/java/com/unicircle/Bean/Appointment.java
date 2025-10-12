package com.unicircle.Bean;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.unicircle.utils.LocalDateConverter;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer appointmentId;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @Convert(converter = LocalDateConverter.class)
    private LocalDate date;
    private String timeSlot;

    private String status;
    private String title;
    private String description;
}
