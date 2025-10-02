package com.unicircle.Bean;

import com.unicircle.utils.LocalDateTimeConverter;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Comment {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String by;

  @Column(length = 2000)
  private String text;

  @Convert(converter = LocalDateTimeConverter.class)
  private LocalDateTime createdAt;

  @ManyToOne
  @JoinColumn(name = "discussion_id")
  private Discussion discussion;
}
