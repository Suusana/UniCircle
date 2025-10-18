//contributor: gurpreet
package com.unicircle.Controller;

import com.unicircle.Bean.Friendship;
import com.unicircle.Bean.Student;
import com.unicircle.Service.FriendshipService;
import com.unicircle.Repository.StudentRepo;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/friends")
public class FriendshipController {

    private final FriendshipService friendshipService;
    private final StudentRepo studentRepo;

    public FriendshipController(FriendshipService friendshipService, StudentRepo studentRepo) {
        this.friendshipService = friendshipService;
        this.studentRepo = studentRepo;
    }

    @GetMapping("/{studentId}")
    public List<Map<String, Object>> getFriends(@PathVariable Integer studentId) {
        return friendshipService.getFriends(studentId);
    }

    @GetMapping("/all")
    public List<Student> getAllStudents() {
        return studentRepo.findAll();
    }

    @PostMapping("/add")
    public Friendship addFriend(@RequestParam Integer studentId, @RequestParam Integer studentId2) {
        return friendshipService.addFriend(studentId, studentId2);
    }

    @DeleteMapping("/remove/{friendshipId}")
    public void removeFriend(@PathVariable Integer friendshipId) {
        friendshipService.removeFriend(friendshipId);
    }

    @PutMapping("/{friendshipId}/accept")
    public Friendship acceptFriend(@PathVariable Integer friendshipId) {
        return friendshipService.acceptFriend(friendshipId);
    }

    @PutMapping("/{friendshipId}/decline")
    public Friendship declineFriend(@PathVariable Integer friendshipId) {
        return friendshipService.declineFriend(friendshipId);
    }

    @GetMapping("/{studentId}/requests")
    public List<Map<String, Object>> getPendingRequests(@PathVariable Integer studentId) {
        return friendshipService.getPendingRequests(studentId);
    }

    @GetMapping("/{studentId}/addable")
    public List<Map<String, Object>> getAddableStudents(@PathVariable Integer studentId) {
        return friendshipService.getAddFriendList(studentId);
    }
}
