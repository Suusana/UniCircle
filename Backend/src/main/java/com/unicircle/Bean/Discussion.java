package com.unicircle.Bean;

import com.unicircle.utils.LocalDateTimeConverter;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Discussion {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String title;

  @Column(length = 2000)
  private String body;

  @Convert(converter = LocalDateTimeConverter.class)
  private LocalDateTime createdAt;

  // simple tag strings (creates a join table)
  @ElementCollection
  private List<String> tags;

  @OneToMany(mappedBy = "discussion", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Comment> comments;
}
