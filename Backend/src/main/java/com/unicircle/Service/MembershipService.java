package com.unicircle.Service;

import com.unicircle.Bean.Club;
import com.unicircle.Bean.Membership;
import com.unicircle.Bean.Student;
import com.unicircle.Repository.ClubRepo;
import com.unicircle.Repository.MembershipRepo;
import com.unicircle.Repository.StudentRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MembershipService {
    @Autowired
    private MembershipRepo membershipRepo;

    @Autowired
    private StudentRepo studentRepo;

    @Autowired
    private ClubRepo clubRepo;

    //get the current user's joined club ids
    public List<Integer> getUserClubIds(Integer studentId) {
        List<Membership> memberships = membershipRepo.findByStudentStudentId(studentId);
        List<Integer> userClubIds = memberships.stream()
                .map(m->m.getClub().getClubId())
                .collect(Collectors.toList());
        return userClubIds;
    }

    // current user leave the club
    @Transactional
    public void leaveClub(Integer studentId, Integer clubId) {
        membershipRepo.deleteByStudentStudentIdAndClubClubId(studentId,clubId);
        Club club = clubRepo.findById(clubId)
                .orElseThrow(() -> new RuntimeException("Club not found"));
        club.setMembers(club.getMembers()-1); //delete 1 member to the club
    }

    // current user join the club
    @Transactional
    public void joinClub(Integer studentId, Integer clubId) {
        Student student = studentRepo.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        Club club = clubRepo.findById(clubId)
                .orElseThrow(() -> new RuntimeException("Club not found"));
        club.setMembers(club.getMembers()+1); // add 1 member to the club
        Membership membership = new Membership();
        membership.setStudent(student);
        membership.setClub(club);
        membership.setRole("Member");
        membershipRepo.save(membership);
    }

    //check if the current user is a member of a specific club
    public boolean isMember(Integer studentId, Integer clubId) {
        return membershipRepo.existsByStudentStudentIdAndClubClubId(studentId,clubId);
    }
}
