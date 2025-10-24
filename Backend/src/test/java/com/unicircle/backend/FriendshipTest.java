//contributor: gurpreet 
package com.unicircle.backend;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.*;

import java.util.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import com.unicircle.Repository.EnrollmentRepo;
import com.unicircle.Repository.FriendshipRepo;
import com.unicircle.Repository.MembershipRepo;
import com.unicircle.Repository.StudentRepo;
import com.unicircle.Service.FriendshipService;
import com.unicircle.Bean.Student;
import com.unicircle.Bean.Friendship;

public class FriendshipTest {

    @Mock
    private FriendshipRepo friendshipRepo;

    @Mock
    private StudentRepo studentRepo;

    @Mock
    private EnrollmentRepo enrollmentRepo;

    @Mock
    private MembershipRepo membershipRepo;

    @InjectMocks
    private FriendshipService friendshipService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetFriends() {
        Student alice = new Student();
        alice.setStudentId(2);
        alice.setFirstName("Alice");
        alice.setLastName("Smith");
        alice.setYear(2);
        alice.setDegree("Computer Science");
        alice.setMajor("CS2");

        Friendship f = new Friendship();
        f.setFriendshipId(1);
        f.setStudentId(1);
        f.setStudentId2(2);
        f.setStatus("Accepted");

        when(friendshipRepo.findByStudentIdOrStudentId2AndStatus(1, 1, "Accepted"))
                .thenReturn(List.of(f));
        when(studentRepo.findById(2)).thenReturn(Optional.of(alice));
        when(enrollmentRepo.findByStudentStudentId(anyInt())).thenReturn(Collections.emptyList());
        when(membershipRepo.findByStudentStudentId(anyInt())).thenReturn(Collections.emptyList());

        List<Map<String, Object>> friends = friendshipService.getFriends(1);

        assertEquals(1, friends.size());
        Map<String, Object> friendData = friends.get(0);
        assertEquals(2, friendData.get("id"));
        assertEquals("Alice Smith", friendData.get("name"));
        assertEquals("Computer Science", friendData.get("degree"));
        assertEquals(2, friendData.get("year"));
        assertEquals("CS2", friendData.get("major"));
        assertEquals("Accepted", friendData.get("status"));
        assertEquals(1, friendData.get("friendshipId"));
    }

    @Test
    void testAddFriendSuccess() {
        when(friendshipRepo.findByStudentPair(1, 2)).thenReturn(Optional.empty());
        
        Friendship saved = new Friendship();
        saved.setFriendshipId(10);
        saved.setStudentId(1);
        saved.setStudentId2(2);
        saved.setStatus("Pending");
        
        when(friendshipRepo.save(any(Friendship.class))).thenReturn(saved);
        
        Friendship result = friendshipService.addFriend(1, 2);
        
        assertNotNull(result);
        assertEquals(1, result.getStudentId());
        assertEquals(2, result.getStudentId2());
        assertEquals("Pending", result.getStatus());
        assertEquals(10, result.getFriendshipId());
    }

    @Test
    void testRemoveFriend() {
        doNothing().when(friendshipRepo).deleteById(5);
        
        friendshipService.removeFriend(5);
        
        verify(friendshipRepo, times(1)).deleteById(5);
    }
}
