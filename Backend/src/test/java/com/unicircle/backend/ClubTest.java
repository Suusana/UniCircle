package com.unicircle.backend;

import com.unicircle.Bean.Club;
import com.unicircle.Bean.Membership;
import com.unicircle.Bean.Student;
import com.unicircle.Repository.ClubRepo;
import com.unicircle.Repository.MembershipRepo;
import com.unicircle.Repository.RegistrationRepo;
import com.unicircle.Repository.StudentRepo;
import com.unicircle.Service.MembershipService;
import com.unicircle.Service.RegistrationService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.junit.jupiter.api.Assertions.*;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
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

    @Mock
    private RegistrationRepo registrationRepo;

    @InjectMocks
    private RegistrationService registrationService;

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

    // Test when a student want to check in an event that they havent apply for
    @Test
    void testCheckInWithoutRegistration() {
//        havent apply for this event
        Mockito.when(registrationRepo.findByStudentStudentIdAndEventEventId(1, 100))
                .thenReturn(null);

//        is not allow to check in
        IllegalStateException ex = assertThrows(IllegalStateException.class, () -> {
            registrationService.CheckIn(1, 100);
        });

        assertEquals("Student is not registered for this event", ex.getMessage());

        Mockito.verify(registrationRepo, Mockito.never()).save(Mockito.any());
    }
}
