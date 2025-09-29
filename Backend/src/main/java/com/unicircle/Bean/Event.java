package com.unicircle.Bean;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer eventId;

    @ManyToOne
    @JoinColumn(name = "club_id")
    private Club club;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student creator;

    private String title;
    private String description;
    private String location;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="start_time", nullable=false)
    private Date startTime;
    
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name="end_time", nullable=false)
    private Date endTime;

    private String status;
}
