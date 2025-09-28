package com.unicircle.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.unicircle.Service.TimetableService;
import com.unicircle.Bean.TimetableItem;
import com.unicircle.Bean.Student;





@RestController
@RequestMapping("/api/timetable")
public class TimetableController {
    private final TimetableService timetableService;

    public TimetableController(TimetableService timetableService) {
        this.timetableService = timetableService;
    }

    @GetMapping("/{studentId}/{semester}/{year}")
    public List<TimetableItem> viewTimetable(
            @PathVariable int studentId,
            @PathVariable String semester,
            @PathVariable int year) {
        Student student = new Student(studentId); 
        return timetableService.getTimetableForStudent(student, semester, year);
    }

    @PostMapping("/{timetableId}/add")
    public TimetableItem addItem(
            @PathVariable int timetableId,
            @RequestParam(required = false) int classId,
            @RequestParam(required = false) int eventId) {
        return timetableService.addItem(timetableId, classId, eventId);
    }

    @DeleteMapping("/remove/{itemId}")
    public void removeItem(@PathVariable int itemId) {
        timetableService.removeItem(itemId);
    }
}

