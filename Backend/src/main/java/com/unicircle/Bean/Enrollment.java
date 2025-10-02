package com.unicircle.Bean;

import jakarta.persistence.*;

@Entity
public class Enrollment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer enrollmentId;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne
    @JoinColumn(name = "subject_id")
    private Subject subject;

    public Integer getId() {
        return enrollmentId;
    }

    public void setId(Integer enrollmentId) {
        this.enrollmentId = enrollmentId;
    }

}
