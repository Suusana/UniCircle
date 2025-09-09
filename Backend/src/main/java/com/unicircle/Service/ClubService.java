package com.unicircle.Service;

import com.unicircle.Bean.Club;
import com.unicircle.Repository.ClubRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClubService {
    @Autowired
    private ClubRepo clubRepo;

    //get all clubs
    public List<Club> getAllClub() {
        return clubRepo.findAll();
    }

    //get club details
    public Club getClub(int id) {
        Optional<Club> club = clubRepo.findById(id);
        return club.orElse(null);
    }
}
