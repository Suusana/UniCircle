package com.unicircle.Service;

import com.unicircle.Bean.Club;
import com.unicircle.Repository.ClubRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClubService {
    @Autowired
    private ClubRepo clubRepo;

    public List<Club> getAllClub() {
        return clubRepo.findAll();
    }
}
