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
import com.unicircle.Repository.ClassEntityRepo;
import com.unicircle.Repository.EventRepo;
import com.unicircle.Bean.Event;
import com.unicircle.Bean.ClassEntity;

@Service
public class TimetableService {
    private final TimetableRepo timetableRepo;
    private final TimetableItemRepo itemRepo;
    @Autowired
    private ClassEntityRepo classRepo;
    @Autowired
    private EventRepo eventRepo;

    public TimetableService(TimetableRepo timetableRepo, TimetableItemRepo itemRepo) {
        this.timetableRepo = timetableRepo;
        this.itemRepo = itemRepo;
    }

public List<TimetableItem> getTimetableForStudent(Student student, String semester, Integer year) {
    Timetable timetable = timetableRepo
            .findByStudentAndSemesterAndYear(student, semester, year)
            .orElseThrow(() -> new RuntimeException("No timetable found"));

    return itemRepo.findByTimetable(timetable);
}



    public TimetableItem addItem(Integer timetableId, Integer classId, Integer eventId) {
        Timetable timetable = timetableRepo.findById(timetableId)
                .orElseThrow(() -> new RuntimeException("Timetable not found"));

        TimetableItem item = new TimetableItem();
        item.setTimetable(timetable);
        if (classId != null) {
            ClassEntity classEntity = classRepo.findById(classId)
                    .orElseThrow(() -> new RuntimeException("Class not found"));
            item.setClassEntity(classEntity);
        }
        if (eventId != null) {
            Event event = eventRepo.findById(eventId)
                    .orElseThrow(() -> new RuntimeException("Event not found"));
            item.setEvent(event);
        }
        return itemRepo.save(item);
    }

    public List<TimetableItem> getItems(int timetableId) {
        return itemRepo.findByTimetable_TimetableId(timetableId);
    }

    public void deleteItem(int itemId) {
        itemRepo.deleteById(itemId);
    }

    public List<ClassEntity> getAvailableClasses(int studentId) {
        return classRepo.findClassesForStudent(studentId);
    }

    public List<Event> getAvailableEvents(int studentId) {
            return eventRepo.findEventsForStudent(studentId);

    }

    public Timetable createTimetable(int studentId, String semester, int year) {
        Student student = new Student(studentId);
        Timetable timetable = new Timetable();
        timetable.setStudent(student);
        timetable.setSemester(semester);
        timetable.setYear(year);
        return timetableRepo.save(timetable);
    }

}
