package com.unicircle.Bean;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


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
    @Column(name = "created_at")
    private LocalDateTime createAt;

    @Column(name = "updated_at")
    private LocalDateTime updateAt;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "subject_id", insertable = false, updatable = false)
    private Subject subject;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "lecturer_id", insertable = false, updatable = false)
    private Lecturer lecturer;

    @PrePersist
    void onCreate() {
        createAt = LocalDateTime.now();
        updateAt = createAt;
    }

    @PreUpdate
    void onUpdate() {
        updateAt = LocalDateTime.now();
    }

}
