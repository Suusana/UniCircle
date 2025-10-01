package com.unicircle.Bean;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;

@Entity
@Table(name = "Class")
public class ClassEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    
    @Column(name = "class_id")
    private int classId;

    @Column(name = "type")
    private String type;

    public ClassEntity() {
    }

    public ClassEntity(int classId) {
        this.classId = classId;
    }

    @ManyToOne
    @JoinColumn(name = "subject_id", nullable = false)
    @JsonBackReference
    private Subject subject;

    public int getClassId() {
        return classId;
    }

    // @OneToMany(mappedBy = "classEntity")
    // private List<Enrollment> enrollments;

    public void setClassId(int classId) {
        this.classId = classId;
    }

    public Subject getSubject() {
        return subject;
    }

    public String getType() {
        return type; 
    }
}
