package com.unicircle.Bean;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
    @JsonBackReference
    private Club club;

    @ManyToOne
    @JoinColumn(name = "student_id")
    @JsonBackReference
    private Student creator;

    private String title;
    private String description;
    private String location;

    //@Temporal(TemporalType.TIMESTAMP)

    @Column(name = "start_time")
    private Date startTime;

    //@Temporal(TemporalType.TIMESTAMP)
   @Column(name = "end_time")
    private Date endTime;

    private String status;

    public Event(int eventId) {
        this.eventId = eventId;
    }

}
