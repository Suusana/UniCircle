package com.unicircle.Controller;

import com.unicircle.Bean.Club;
import com.unicircle.Service.ClubService;
import com.unicircle.Service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    // get all the clubs
    @GetMapping("/getAll")
    public List<Club> getClubs() {
        return clubService.getAllClub();
    }

    // get club details
    @GetMapping("/{id}")
    public Map<String, Object> getClubById(@PathVariable int id) {
        Map<String, Object> data = new HashMap<>();
        data.put("club", clubService.getClub(id));
        data.put("owner", studentService.getClubOwnerById(id,"Club Owner"));
        data.put("admin", studentService.getClubOwnerById(id,"Club Admin"));
        return data;
    }
}
