package com.unicircle.Bean;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentDTO {
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String degree;
    private String major;
    private Integer year;
}


