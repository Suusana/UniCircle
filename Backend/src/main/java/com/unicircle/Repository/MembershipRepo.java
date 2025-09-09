package com.unicircle.Repository;

import com.unicircle.Bean.Membership;
import com.unicircle.Bean.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MembershipRepo extends JpaRepository<Membership, Integer> {
    List<Membership> findByClubClubIdAndRole(Integer clubId, String role);
}



