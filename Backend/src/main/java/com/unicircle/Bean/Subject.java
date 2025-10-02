package com.unicircle.Bean;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Subject")
public class Subject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "subject_id")
    private Integer subjectId;

    private String name;
    private String faculty;
    private Integer credit;

    @OneToMany(mappedBy = "subject", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<ClassEntity> classes;
}