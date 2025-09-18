package com.unicircle.Service;

import com.unicircle.Bean.Membership;
import com.unicircle.Repository.MembershipRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MembershipService {
    @Autowired
    private MembershipRepo membershipRepo;

    //get the current user's joined club ids
    public List<Integer> getUserClubIds(Integer studentId) {
        List<Membership> memberships = membershipRepo.findByStudentStudentId(studentId);
        List<Integer> userClubIds = memberships.stream()
                .map(m->m.getClub().getClubId())
                .collect(Collectors.toList());
        return userClubIds;
    }
}
