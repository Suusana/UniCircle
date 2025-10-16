//contributor: gurpreet
package com.unicircle.Service;

import com.unicircle.Bean.Enrollment;
import com.unicircle.Bean.Friendship;
import com.unicircle.Bean.Membership;
import com.unicircle.Bean.Student;
import com.unicircle.Repository.EnrollmentRepo;
import com.unicircle.Repository.FriendshipRepo;
import com.unicircle.Repository.MembershipRepo;
import com.unicircle.Repository.StudentRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class FriendshipService {
    private final FriendshipRepo friendshipRepo;

    public FriendshipService(FriendshipRepo friendshipRepo) {
        this.friendshipRepo = friendshipRepo;
    }

    @Autowired
    private StudentRepo studentRepo;

    @Autowired
    private EnrollmentRepo enrollmentRepo;

    @Autowired
    private MembershipRepo membershipRepo;

    public List<Map<String, Object>> getFriends(Integer studentId) {
        List<Friendship> friendships = friendshipRepo.findByStudentIdOrStudentId2AndStatus(studentId, studentId,
                "Accepted");

        // get student enrollments and memberships
        List<Enrollment> myEnrollments = enrollmentRepo.findByStudentStudentId(studentId);
        Set<Integer> mySubjectIds = myEnrollments.stream()
                .map(e -> e.getSubject().getSubjectId())
                .collect(Collectors.toSet());

        List<Membership> myMemberships = membershipRepo.findByStudentStudentId(studentId);
        Set<Integer> myClubIds = myMemberships.stream()
                .map(m -> m.getClub().getClubId())
                .collect(Collectors.toSet());

        return friendships.stream().map(f -> {
            Integer friendId = f.getStudentId().equals(studentId) ? f.getStudentId2() : f.getStudentId();
            Student friend = studentRepo.findById(friendId).orElse(null);

            Map<String, Object> friendData = new HashMap<>();
            if (friend != null) {
                friendData.put("id", friend.getStudentId());
                friendData.put("name", friend.getFirstName() + " " + friend.getLastName());
                friendData.put("year", friend.getYear());
                friendData.put("degree", friend.getDegree());
                friendData.put("major", friend.getMajor());
            }
            friendData.put("friendshipId", f.getFriendshipId());
            friendData.put("status", f.getStatus());

            // Common courses
            List<Enrollment> friendEnrollments = enrollmentRepo.findByStudentStudentId(friendId);
            Set<Integer> friendSubjectIds = friendEnrollments.stream()
                    .map(e -> e.getSubject().getSubjectId())
                    .collect(Collectors.toSet());
            Set<Integer> commonSubjectIds = new HashSet<>(mySubjectIds);
            commonSubjectIds.retainAll(friendSubjectIds);
            List<String> commonCourses = friendEnrollments.stream()
                    .filter(e -> commonSubjectIds.contains(e.getSubject().getSubjectId()))
                    .map(e -> e.getSubject().getName())
                    .distinct()
                    .toList();
            friendData.put("commonCourses", commonCourses);

            // Common clubs
            List<Membership> friendMemberships = membershipRepo.findByStudentStudentId(friendId);
            Set<Integer> friendClubIds = friendMemberships.stream()
                    .map(m -> m.getClub().getClubId())
                    .collect(Collectors.toSet());
            Set<Integer> commonClubIds = new HashSet<>(myClubIds);
            commonClubIds.retainAll(friendClubIds);
            List<String> commonClubs = friendMemberships.stream()
                    .filter(m -> commonClubIds.contains(m.getClub().getClubId()))
                    .map(m -> m.getClub().getName())
                    .distinct()
                    .toList();
            friendData.put("commonClubs", commonClubs);

            return friendData;
        }).toList();
    }

    public Friendship addFriend(Integer studentId, Integer studentId2) {
        Optional<Friendship> existing = friendshipRepo.findByStudentPair(studentId, studentId2);
        if (existing.isPresent()) {
            throw new RuntimeException("Friend request already exists");
        }

        Friendship f = new Friendship();
        f.setStudentId(studentId);
        f.setStudentId2(studentId2);
        f.setStatus("Pending");
        return friendshipRepo.save(f);
    }

    public void removeFriend(Integer friendshipId) {
        friendshipRepo.deleteById(friendshipId);
    }

    public boolean existsFriendship(Integer studentId, Integer studentId2) {
        return friendshipRepo.findByStudentPair(studentId, studentId2).isPresent();
    }

    public Friendship acceptFriend(Integer friendshipId) {
        Friendship f = friendshipRepo.findById(friendshipId)
                .orElseThrow(() -> new IllegalArgumentException("Friendship not found"));
        f.setStatus("Accepted");
        return friendshipRepo.save(f);
    }

    public Friendship declineFriend(Integer friendshipId) {
        Friendship f = friendshipRepo.findById(friendshipId)
                .orElseThrow(() -> new IllegalArgumentException("Friendship not found"));
        f.setStatus("Declined");
        return friendshipRepo.save(f);
    }

    public List<Map<String, Object>> getPendingRequests(Integer studentId) {
        List<Friendship> requests = friendshipRepo.findIncomingRequests(studentId);

        return requests.stream().map(f -> {
            Student requester = studentRepo.findById(f.getStudentId()).orElse(null);
            Map<String, Object> data = new HashMap<>();
            if (requester != null) {
                data.put("id", requester.getStudentId()); // display info
                data.put("name", requester.getFirstName() + " " + requester.getLastName());
                data.put("year", requester.getYear());
                data.put("degree", requester.getDegree());
                data.put("major", requester.getMajor());
            }

            data.put("friendshipId", f.getFriendshipId());
            data.put("status", f.getStatus());
            data.put("studentId", f.getStudentId());
            data.put("studentId2", f.getStudentId2());
            return data;
        }).toList();
    }

    public List<Integer> getFriendIds(Integer studentId) {
        List<Friendship> friendships = friendshipRepo.findAcceptedFriends(studentId);

        return friendships.stream()
                .map(f -> f.getStudentId().equals(studentId) ? f.getStudentId2() : f.getStudentId())
                .toList();
    }

    public List<Map<String, Object>> getAddFriendList(Integer studentId) {
        List<Student> allStudents = studentRepo.findAll();

        // accepted friends
        List<Integer> friendIds = getFriendIds(studentId);

        // pending requests
        List<Friendship> pending = friendshipRepo.findByStudentIdOrStudentId2AndStatus(studentId, studentId, "Pending");
        Map<Integer, Integer> pendingMap = pending.stream()
                .collect(Collectors.toMap(
                        f -> f.getStudentId().equals(studentId) ? f.getStudentId2() : f.getStudentId(),
                        Friendship::getFriendshipId,
                        (existing, replacement) -> existing));

        return allStudents.stream()
                .filter(s -> !s.getStudentId().equals(studentId)) // exclude self
                .filter(s -> !friendIds.contains(s.getStudentId())) // exclude accepted friends
                .map(s -> {
                    Map<String, Object> m = new HashMap<>();
                    m.put("id", s.getStudentId());
                    m.put("name", s.getFirstName() + " " + s.getLastName());
                    m.put("year", s.getYear());
                    m.put("degree", s.getDegree());
                    m.put("major", s.getMajor());
                    if (pendingMap.containsKey(s.getStudentId())) {
                        m.put("requested", true);
                        m.put("friendshipId", pendingMap.get(s.getStudentId()));
                    } else {
                        m.put("requested", false);
                        m.put("friendshipId", null);
                    }
                    return m;
                })
                .toList();
    }
}