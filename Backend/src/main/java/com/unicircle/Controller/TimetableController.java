//contributors: gurpreet
package com.unicircle.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.unicircle.Service.TimetableService;
import com.unicircle.Bean.TimetableItem;
import com.unicircle.Bean.ClassEntity;
import com.unicircle.Bean.Event;
import com.unicircle.Bean.Timetable;

@RestController
@RequestMapping("/timetable")
public class TimetableController {

    private final TimetableService timetableService;

    public TimetableController(TimetableService timetableService) {
        this.timetableService = timetableService;
    }

    // add class or event to timetable
    @PostMapping("/{timetableId}/items")
    public ResponseEntity<TimetableItem> addItem(
            @PathVariable int timetableId,
            @RequestParam(required = false) Integer classId,
            @RequestParam(required = false) Integer eventId) {

        TimetableItem item = timetableService.addItem(timetableId, classId, eventId);
        return ResponseEntity.ok(item);
    }

    // replace items in timetable with new list
    @PostMapping("/{timetableId}/update")
    public ResponseEntity<Void> updateTimetable(
            @PathVariable int timetableId,
            @RequestBody List<Map<String, Integer>> items) {
        timetableService.updateTimetableItems(timetableId, items);
        return ResponseEntity.ok().build();
    }

    // get all items in timetable
    @GetMapping("/{timetableId}/items")
    public List<TimetableItem> getItems(@PathVariable int timetableId) {
        return timetableService.getItems(timetableId);
    }


    // delete one item from timetable
    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<Void> deleteItem(@PathVariable int itemId) {
        timetableService.deleteItem(itemId);
        return ResponseEntity.noContent().build();
    }

    // get club events
    @GetMapping("/student/{studentId}/events/available")
    public ResponseEntity<List<Event>> getAvailableEvents(@PathVariable int studentId) {
        return ResponseEntity.ok(timetableService.getAvailableEvents(studentId));
    }

    // get classes
    @GetMapping("/student/{studentId}/classes/available")
    public ResponseEntity<List<ClassEntity>> getAvailableClasses(@PathVariable int studentId) {
        return ResponseEntity.ok(timetableService.getAvailableClasses(studentId));
    }

    // get students timetable
    @GetMapping("/student/{studentId}")
    public ResponseEntity<Timetable> getTimetableForStudent(@PathVariable int studentId) {
        Timetable timetable = timetableService.getLatestTimetableForStudent(studentId);
        return ResponseEntity.ok(timetable);
    }

    // create new timetable
    @PostMapping
    public ResponseEntity<Timetable> createTimetable(
            @RequestParam int studentId,
            @RequestParam String semester,
            @RequestParam int year) {

        Timetable timetable = timetableService.createTimetable(studentId, semester, year);
        return ResponseEntity.ok(timetable);
    }
}
