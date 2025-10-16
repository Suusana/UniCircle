package com.unicircle.Bean;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentDTO {
    private Integer studentId;
    private String date;
    private String timeSlot;
    private String status;
    private String title;
    private String description;
}
