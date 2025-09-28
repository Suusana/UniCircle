package com.unicircle.Bean;

import jakarta.persistence.*;

@Entity
@Table(name = "Class")
public class ClassEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int classId;

    public ClassEntity() {}
    public ClassEntity(int classId) {
        this.classId = classId;
    }

    public int getClassId() { return classId; }
    public void setClassId(int classId) { this.classId = classId; }
}

