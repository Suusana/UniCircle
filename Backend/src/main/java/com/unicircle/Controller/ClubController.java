package com.unicircle.Controller;

import com.unicircle.Bean.Club;
import com.unicircle.Service.ClubService;
import com.unicircle.Service.EventService;
import com.unicircle.Service.MembershipService;
import com.unicircle.Service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/clubs")
public class ClubController {
    @Autowired
    private ClubService clubService;
    @Autowired
    private StudentService studentService;
    @Autowired
    private EventService eventService;
    @Autowired
    private MembershipService membershipService;

    // get all the clubs
    @GetMapping("/getAll")
    public List<Club> getClubs() {
        return clubService.getAllClub();
    }

    // get club details with their corresponding events
    @GetMapping("/{id}")
    public Map<String, Object> getClubById(@PathVariable int id) {
        Map<String, Object> data = new HashMap<>();
        data.put("club", clubService.getClub(id));
        data.put("owner", studentService.getClubOwnerById(id,"Club Owner"));
        data.put("admin", studentService.getClubOwnerById(id,"Club Admin"));
        data.put("events",eventService.getEventsByClubId(id));
        return data;
    }

    //get the current user's joined club ids
    @GetMapping("/getUserClubIds")
    public List<Integer> getUserClubIds(@RequestParam Integer studentId) {
        return membershipService.getUserClubIds(studentId);
    }

    // current user leave the club
    @DeleteMapping("leave")
    public void leaveClub(@RequestParam Integer studentId,@RequestParam Integer clubId) {
        membershipService.leaveClub(studentId,clubId);
    }

    // current user join the club
    @PostMapping("/join")
    public void joinClub(@RequestParam Integer studentId,@RequestParam Integer clubId) {
        membershipService.joinClub(studentId,clubId);
    }
}
