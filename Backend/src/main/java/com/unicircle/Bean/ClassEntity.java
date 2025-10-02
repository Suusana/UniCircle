package com.unicircle.Bean;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters.LocalTimeConverter;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

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

    @Column(name = "day_of_week")
    private String dayOfWeek;

    @Column(name = "start_time")
    private Date startTime;

    @Column(name = "end_time")
    private Date endTime;

    @Column(name = "location")
    private String location;

    @Column(name = "semester")
    private String semester;

    @Column(name = "year")
    private int year;

    public ClassEntity() {
    }

    public ClassEntity(int classId) {
        this.classId = classId;
    }

    @ManyToOne
    @JoinColumn(name = "subject_id", nullable = false)
    @JsonIgnoreProperties({ "classes" })
    private Subject subject;

    public int getClassId() {
        return classId;
    }

    public void setClassId(int classId) {
        this.classId = classId;
    }

    public Subject getSubject() {
        return subject;
    }

    public String getType() {
        return type;
    }

    public String getDayOfWeek() {
        return dayOfWeek;
    }

    public Date getStartTime() {
        return startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public String getLocation() {
        return location;
    }

    public String getSemester() {
        return semester;
    }

    public int getYear() {
        return year;
    }

}
