package com.unicircle.Bean;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "Timetable")
public class Timetable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long timetableId;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    private String semester;
    private int year;

    @OneToMany(mappedBy = "timetable", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TimetableItem> items = new ArrayList<>();

    public String getSemester() {
        return this.semester;
    }

    public int getYear() {
        return this.year;
    }


}
