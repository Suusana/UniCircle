//contributor: Zizhu Zhao
package com.unicircle.Bean;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer reviewId;
    private Integer studentId;
    private String targetType;

    @Column(name = "subject_id")
    private Integer subjectId;

    @Column(name = "lecturer_id")
    private Integer lecturerId;

    private Integer rate;
    private String description;


    @Column(name = "created_at", columnDefinition = "TEXT")
    @JsonProperty("createTime")
    private String createAt;

    @Column(name = "updated_at", columnDefinition = "TEXT")
    @JsonProperty("updateTime")
    private String updateAt;

    //many reviews can belong to one subject
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "subject_id", insertable = false, updatable = false)
    private Subject subject;

    //many reviews can belong to one lecturer
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "lecturer_id", insertable = false, updatable = false)
    private Lecturer lecturer;

    //shaped formatter for timestamp (yyyy-MM-dd HH:mm:ss)
    private static final DateTimeFormatter F=
            DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    //Automatically set creation and update timestamps before saving a new record
    @PrePersist
    void onCreate() {
        String now = LocalDateTime.now().format(F);
        createAt = now;
        updateAt = now;
    }

    //Automatically update the timestamp when an existing record is modified
    @PreUpdate
    void onUpdate() {
        updateAt = LocalDateTime.now().format(F);
    }

}
