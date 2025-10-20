package com.unicircle.Bean;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentProfileDTO {

    private String firstName;
    private String lastName;
    private String preferredName;
    private String degree;
    private String major;
    private String description;
    private Double academicRecord;
    private Integer credit;
}

