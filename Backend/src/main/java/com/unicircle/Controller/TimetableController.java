package com.unicircle.Controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.unicircle.Service.TimetableService;
import com.unicircle.Bean.TimetableItem;
import com.unicircle.Bean.ClassEntity;
import com.unicircle.Bean.Student;
import com.unicircle.Repository.StudentRepo;
import com.unicircle.Repository.TimetableRepo;
import com.unicircle.Repository.TimetableItemRepo;
import com.unicircle.Repository.ClassEntityRepo;
import com.unicircle.Repository.EventRepo;
import com.unicircle.Bean.Event;
import com.unicircle.Bean.Timetable;

@RestController
@RequestMapping("/timetable")
public class TimetableController {

    @Autowired
    private TimetableService timetableService;
    @Autowired
    private StudentRepo studentRepo;
    @Autowired
    private TimetableRepo timetableRepo;
    @Autowired
    private TimetableItemRepo itemRepo;
    @Autowired
    private ClassEntityRepo classRepo;
    @Autowired
    private EventRepo eventRepo;

    //add class or event to timetable 
    @PostMapping("/{timetableId}/items")
    public ResponseEntity<TimetableItem> addItem(
            @PathVariable int timetableId,
            @RequestParam(required = false) Integer classId,
            @RequestParam(required = false) Integer eventId) {

        TimetableItem item = timetableService.addItem(timetableId, classId, eventId);
        return ResponseEntity.ok(item);
    }

    //get all items in timetable
    @GetMapping("/{timetableId}/items")
    public List<TimetableItem> getItems(@PathVariable int timetableId) {
        return timetableService.getItems(timetableId);
    }

    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<Void> deleteItem(@PathVariable int itemId) {
        timetableService.deleteItem(itemId);
        return ResponseEntity.noContent().build();
    }

    //club events
    @GetMapping("/student/{studentId}/events/available")
    public ResponseEntity<List<Event>> getAvailableEvents(@PathVariable int studentId) {
        Student student = studentRepo.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        List<Event> events = eventRepo.findEventsForStudent(student.getStudentId());
        return ResponseEntity.ok(events);
    }

    //classes
    @GetMapping("/student/{studentId}/classes/available")
    public ResponseEntity<List<ClassEntity>> getAvailableClasses(@PathVariable int studentId) {
        Student student = studentRepo.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        List<ClassEntity> classes = classRepo.findClassesForStudent(student.getStudentId());
        return ResponseEntity.ok(classes);
    }


    //get student's timetable 
    @GetMapping("/student/{studentId}")
    public ResponseEntity<Timetable> getTimetableForStudent(@PathVariable int studentId) {
        Student student = studentRepo.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        Optional<Timetable> timetable = timetableRepo.findByStudentAndSemesterAndYear(student, "Semester 1", 2025);

        return timetable.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    //create new timetable 
    @PostMapping
    public ResponseEntity<Timetable> createTimetable(
            @RequestParam int studentId,
            @RequestParam String semester,
            @RequestParam int year) {

        Student student = studentRepo.findById(studentId).orElseThrow();
        Timetable timetable = new Timetable();
        timetable.setStudent(student);
        timetable.setSemester(semester);
        timetable.setYear(year);

        Timetable saved = timetableRepo.save(timetable);
        return ResponseEntity.ok(saved);
    }

}
