package com.unicircle.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.unicircle.Bean.TimetableItem;
import com.unicircle.Bean.Timetable;


public interface TimetableItemRepo extends JpaRepository<TimetableItem, Integer> {
    List<TimetableItem> findByTimetable(Timetable timetable);
}

