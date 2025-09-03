package com.unicircle.backend;

import com.unicircle.Bean.Club;
import com.unicircle.Repository.ClubRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class BackendApplicationTests {

    @Autowired
    private ClubRepo clubRepo;

    @Test
    public void insertClubTest() {
        Club club = new Club();
        club.setName("Cheese Club");
        club.setDescription("Here is cheese club. A club for all cheese lover!");

        clubRepo.save(club);

        System.out.println("Successfully insert! The id is " + club.getId());
    }

}
