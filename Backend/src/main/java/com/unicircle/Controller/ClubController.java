package com.unicircle.Controller;

import com.unicircle.Bean.Club;
import com.unicircle.Service.ClubService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ClubController {
    @Autowired
    private ClubService clubService;

    // get all the clubs
    @GetMapping("/clubs/getAll")
    public List<Club> getClubs() {
        return clubService.getAllClub();
    }
}
