package com.unicircle.Repository;

import com.unicircle.Bean.Club;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClubRepo extends JpaRepository<Club, Integer> {
}
