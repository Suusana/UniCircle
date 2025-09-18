package com.unicircle.Service;

import com.unicircle.Repository.MembershipRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MembershipService {
    @Autowired
    private MembershipRepo membershipRepo;

    //get the current user's joined club ids
    public List<Integer> getUserClubIds(Integer studentId) {
        return membershipRepo.getClubClubIdByStudentStudentId(studentId);
    }
}
