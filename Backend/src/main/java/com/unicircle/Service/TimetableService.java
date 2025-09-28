package com.unicircle.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.unicircle.Bean.Student;
import com.unicircle.Bean.TimetableItem;
import com.unicircle.Bean.Timetable;
import com.unicircle.Repository.TimetableRepo;
import com.unicircle.Repository.TimetableItemRepo;
import com.unicircle.Bean.Event;
import com.unicircle.Bean.ClassEntity;



@Service
public class TimetableService {
    private final TimetableRepo timetableRepo;
    private final TimetableItemRepo itemRepo;

    public TimetableService(TimetableRepo timetableRepo, TimetableItemRepo itemRepo) {
        this.timetableRepo = timetableRepo;
        this.itemRepo = itemRepo;
    }

    public List<TimetableItem> getTimetableForStudent(Student student, String semester, int year) {
        Timetable timetable = timetableRepo
            .findByStudentAndSemesterAndYear(student, semester, year)
            .orElseThrow(() -> new RuntimeException("No timetable found"));

        return itemRepo.findByTimetable(timetable);
    }

    public TimetableItem addItem(int timetableId, int classId, int eventId) {
        Timetable timetable = timetableRepo.findById(timetableId)
            .orElseThrow(() -> new RuntimeException("Timetable not found"));

        TimetableItem item = new TimetableItem();
        item.setTimetable(timetable);
        if (classId != null) {
            item.setClassEntity(new ClassEntity(classId));
        }
        if (eventId != null) {
            item.setEvent(new Event(eventId));
        }
        return itemRepo.save(item);
    }

    public void removeItem(int itemId) {
        itemRepo.deleteById(itemId);
    }
}
