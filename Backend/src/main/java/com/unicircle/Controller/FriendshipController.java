package com.unicircle.Controller;

import com.unicircle.Bean.Friendship;
import com.unicircle.Service.FriendshipService;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/friends")
@CrossOrigin(origins = "*")
public class FriendshipController {

    private final FriendshipService friendshipService;

    public FriendshipController(FriendshipService friendshipService) {
        this.friendshipService = friendshipService;
    }

    @GetMapping("/{studentId}")
    public List<Friendship> getFriends(@PathVariable Integer studentId) {
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
}
