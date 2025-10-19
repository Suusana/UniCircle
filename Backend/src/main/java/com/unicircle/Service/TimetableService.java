//contributors: gurpreet 
package com.unicircle.Service;

import java.util.List;
import java.util.Map;

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
import com.unicircle.Repository.StudentRepo;

@Service
public class TimetableService {

    private final TimetableRepo timetableRepo;
    private final TimetableItemRepo itemRepo;
    private final ClassEntityRepo classRepo;
    private final EventRepo eventRepo;
    private final StudentRepo studentRepo;

    public TimetableService(TimetableRepo timetableRepo, TimetableItemRepo itemRepo, ClassEntityRepo classRepo,
            EventRepo eventRepo, StudentRepo studentRepo) {
        this.timetableRepo = timetableRepo;
        this.itemRepo = itemRepo;
        this.classRepo = classRepo;
        this.eventRepo = eventRepo;
        this.studentRepo = studentRepo;
    }

    // ---- helpers ----
    private Student getStudentOrThrow(int id) {
        return studentRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));
    }

    private Timetable getTimetableOrThrow(int id) {
        return timetableRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Timetable not found"));
    }

    private ClassEntity getClassOrThrow(int id) {
        return classRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Class not found"));
    }

    private Event getEventOrThrow(int id) {
        return eventRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));
    }

    // get the latest timetable that the student created
    public Timetable getLatestTimetableForStudent(int studentId) {
        Student student = getStudentOrThrow(studentId);
        List<Timetable> timetables = timetableRepo.findByStudent(student);

        if (timetables.isEmpty()) {
            throw new RuntimeException("No timetable found for this student");
        }
        return timetables.get(timetables.size() - 1);
    }

    // add item to existing timetable
    public TimetableItem addItem(Integer timetableId, Integer classId, Integer eventId) {
        Timetable timetable = getTimetableOrThrow(timetableId);

        TimetableItem item = new TimetableItem();
        item.setTimetable(timetable);
        if (classId != null) {
            item.setClassEntity(getClassOrThrow(classId));
        }
        if (eventId != null) {
            item.setEvent(getEventOrThrow(eventId));
        }
        return itemRepo.save(item);
    }

    // replace all items in timetable with new set
    @Transactional
    public void updateTimetableItems(int timetableId, List<Map<String, Integer>> items) {
        Timetable timetable = getTimetableOrThrow(timetableId);

        // delete current items
        List<TimetableItem> existing = itemRepo.findByTimetable_TimetableId(timetableId);
        itemRepo.deleteAll(existing);

        // add new items
        for (Map<String, Integer> map : items) {
            TimetableItem item = new TimetableItem();
            item.setTimetable(timetable);

            Integer classId = map.get("classId");
            Integer eventId = map.get("eventId");

            if (classId != null) {
                item.setClassEntity(getClassOrThrow(classId));
            }

            if (eventId != null) {
                item.setEvent(getEventOrThrow(eventId));
            }

            itemRepo.save(item);
        }
    }

    // get timetable items by timetable id
    public List<TimetableItem> getItems(int timetableId) {
        return itemRepo.findByTimetable_TimetableId(timetableId);
    }

    // delete timetable item by id
    public void deleteItem(int itemId) {
        itemRepo.deleteById(itemId);
    }

    // return available classes based on enrollment
    public List<ClassEntity> getAvailableClasses(int studentId) {
        return classRepo.findClassesForStudent(studentId);
    }

    // return available events based on club membership
    public List<Event> getAvailableEvents(int studentId) {
        return eventRepo.findEventsForStudent(studentId);

    }

    // create new timetable
    public Timetable createTimetable(int studentId, String semester, int year) {
        Student student = getStudentOrThrow(studentId);
        Timetable timetable = new Timetable();
        timetable.setStudent(student);
        timetable.setSemester(semester);
        timetable.setYear(year);
        return timetableRepo.save(timetable);
    }

}
