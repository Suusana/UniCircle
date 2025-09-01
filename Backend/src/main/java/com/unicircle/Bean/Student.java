package com.unicircle.Bean;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Student {
    private Integer id;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String degree;
    private String major;
    private Integer year;
    private String Token;
    private Date RegistrationDate;
}
