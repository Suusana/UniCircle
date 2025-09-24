package com.unicircle.backend;

import com.unicircle.Bean.Club;
import com.unicircle.Bean.Membership;
import com.unicircle.Bean.Student;
import com.unicircle.Repository.ClubRepo;
import com.unicircle.Repository.MembershipRepo;
import com.unicircle.Repository.StudentRepo;
import com.unicircle.Service.MembershipService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.junit.jupiter.api.Assertions.*;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.mockito.Mockito.*;
import java.util.Optional;


@ExtendWith(MockitoExtension.class)
public class ClubTest {
    @Mock
    private StudentRepo studentRepo;
    @Mock
    private ClubRepo clubRepo;
    @Mock
    private MembershipRepo membershipRepo;

    @InjectMocks
    private MembershipService membershipService;

    // test if a student is already a member of the club,
    // which means they will not be allow to join the club again
    @Test
    void testJoinClubAlreadyMember() {
        Student student = new Student();
        student.setStudentId(1);
        Club club = new Club();
        club.setClubId(1);
        club.setMembers(5);


        when(studentRepo.findById(1)).thenReturn(Optional.of(student));
        when(clubRepo.findById(1)).thenReturn(Optional.of(club));
        when(membershipRepo.existsByStudentStudentIdAndClubClubId(1, 1)).thenReturn(true);

        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> membershipService.joinClub(1, 1));

        assertEquals("Student is already a member", exception.getMessage());

        verify(membershipRepo, never()).save(any(Membership.class));
    }
}
