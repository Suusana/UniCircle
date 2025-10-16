package com.unicircle.Bean;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EventDTO {
    private Integer clubId;
    private Integer eventId;
    private Integer studentId;
    private String title;
    private String description;
    private String location;
    private String status;
    private String startTime;
    private String endTime;
}