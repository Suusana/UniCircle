package com.unicircle.Bean;


import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer studentId;
    private String email;
    private String password;
    @Column(name = "first_name")
    private String firstName;
    @Column(name = "last_name")
    private String lastName;
    private String preferredName;
    private String degree;
    private String major;
    private Integer year;
    private String description;
    private Boolean type;
    private Double academicRecord;
    private Integer credit;


    public Student(int studentId) {
        this.studentId = studentId;
    }

    @OneToMany(mappedBy = "student")
    private List<Enrollment> enrollments;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL)
    private List<Timetable> timetables = new ArrayList<>();


    @PrePersist
    @PreUpdate
    private void normalizeEmail(){
        if(email != null){
            email = email.trim().toLowerCase();
        }
    }

}
