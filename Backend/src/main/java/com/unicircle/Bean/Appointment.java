package com.unicircle.Bean;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Appointment {
    private Integer id;
    private Date date;
    private String title;
    private String description;
    private String status;
}
