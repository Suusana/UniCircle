package com.unicircle.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.unicircle.Bean.TimetableItem;
import com.unicircle.Bean.Timetable;

@Repository
public interface TimetableItemRepo extends JpaRepository<TimetableItem, Integer> {
    List<TimetableItem> findByTimetable(Timetable timetable);

    List<TimetableItem> findByTimetable_TimetableId(int timetableId);

}
