package com.unicircle.Controller;

import com.unicircle.Bean.Friendship;
import com.unicircle.Service.FriendshipService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/friends")
@CrossOrigin(originPatterns = "http://localhost:5173", allowCredentials = "true")
public class FriendshipController {

    private final FriendshipService friendshipService;

    public FriendshipController(FriendshipService friendshipService) {
        this.friendshipService = friendshipService;
    }

    @GetMapping("/{studentId}")
    public List<Map<String, Object>> getFriends(@PathVariable Integer studentId) {
        return friendshipService.getFriends(studentId);
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
    public List<Friendship> getPendingRequests(@PathVariable Integer studentId) {
        return friendshipService.getPendingRequests(studentId);
    }

}
