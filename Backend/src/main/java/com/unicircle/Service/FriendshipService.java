//contributor: gurpreet
package com.unicircle.Service;

import com.unicircle.Bean.Friendship;
import com.unicircle.Bean.Student;
import com.unicircle.Repository.EnrollmentRepo;
import com.unicircle.Repository.FriendshipRepo;
import com.unicircle.Repository.MembershipRepo;
import com.unicircle.Repository.StudentRepo;

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
    private final StudentRepo studentRepo;
    private final EnrollmentRepo enrollmentRepo;
    private final MembershipRepo membershipRepo;

    public FriendshipService(FriendshipRepo friendshipRepo, StudentRepo studentRepo, EnrollmentRepo enrollmentRepo,
            MembershipRepo membershipRepo) {
        this.friendshipRepo = friendshipRepo;
        this.studentRepo = studentRepo;
        this.enrollmentRepo = enrollmentRepo;
        this.membershipRepo = membershipRepo;
    }

    // ---- helper functions ----

    // convert student entity to a map
    private Map<String, Object> toStudentMap(Student student) {
        Map<String, Object> map = new HashMap<>();
        map.put("id", student.getStudentId());
        map.put("name", student.getFirstName() + " " + student.getLastName());
        map.put("year", student.getYear());
        map.put("degree", student.getDegree());
        map.put("major", student.getMajor());
        return map;
    }

    // subject names for the subjects the student is enrolled in
    private Set<String> getSubjectNames(Integer studentId) {
        return enrollmentRepo.findByStudentStudentId(studentId).stream()
                .map(enrollment -> enrollment.getSubject().getName())
                .collect(Collectors.toSet());
    }

    // club names for the clubs the student is a member of
    private Set<String> getClubNames(Integer studentId) {
        return membershipRepo.findByStudentStudentId(studentId).stream()
                .map(membership -> membership.getClub().getName())
                .collect(Collectors.toSet());
    }

    //--friendship status ----

    // updates status of friendship
    public Friendship updateStatus(Integer friendshipId, String newStatus) {
        Friendship friendship = friendshipRepo.findById(friendshipId)
                .orElseThrow(() -> new IllegalArgumentException("Friendship not found"));
        friendship.setStatus(newStatus);
        return friendshipRepo.save(friendship);
    }

    // accept friend request
    public Friendship acceptFriend(Integer friendshipId) {
        return updateStatus(friendshipId, "Accepted");
    }

    // decline friend request
    public Friendship declineFriend(Integer friendshipId) {
        return updateStatus(friendshipId, "Declined");
    }

    // ---- friendship retrieval ----

    // friends list with common courses and classes
    public List<Map<String, Object>> getFriends(Integer studentId) {
        var friendships = friendshipRepo.findByStudentIdOrStudentId2AndStatus(studentId, studentId, "Accepted");

        Set<String> mySubjects = getSubjectNames(studentId);
        Set<String> myClubs = getClubNames(studentId);

        return friendships.stream()
                .map(friendship -> {
                    Integer friendId = friendship.getStudentId().equals(studentId) ? friendship.getStudentId2()
                            : friendship.getStudentId();
                    return studentRepo.findById(friendId)
                            .map(friend -> {
                                Map<String, Object> data = new HashMap<>(toStudentMap(friend));
                                data.put("friendshipId", friendship.getFriendshipId());
                                data.put("status", friendship.getStatus());

                                Set<String> friendSubjects = getSubjectNames(friendId);
                                Set<String> friendClubs = getClubNames(friendId);

                                Set<String> commonSubjects = new HashSet<>(mySubjects);
                                commonSubjects.retainAll(friendSubjects);

                                Set<String> commonClubs = new HashSet<>(myClubs);
                                commonClubs.retainAll(friendClubs);

                                data.put("commonCourses", commonSubjects);
                                data.put("commonClubs", commonClubs);
                                return data;
                            });
                })
                .flatMap(Optional::stream)
                .toList();
    }

    public List<Integer> getFriendIds(Integer studentId) {
        List<Friendship> friendships = friendshipRepo.findAcceptedFriends(studentId);

        return friendships.stream()
                .map(friendship -> friendship.getStudentId().equals(studentId) ? friendship.getStudentId2()
                        : friendship.getStudentId())
                .toList();
    }

    // get friend requests
    public List<Map<String, Object>> getPendingRequests(Integer studentId) {
        List<Friendship> requests = friendshipRepo.findIncomingRequests(studentId);

        return requests.stream().map(friendship -> {
            Student requester = studentRepo.findById(friendship.getStudentId()).orElse(null);
            Map<String, Object> data = new HashMap<>();
            if (requester != null) {
                data.putAll(toStudentMap(requester));
            }

            data.put("friendshipId", friendship.getFriendshipId());
            data.put("status", friendship.getStatus());
            data.put("studentId", friendship.getStudentId());
            data.put("studentId2", friendship.getStudentId2());
            return data;
        }).toList();
    }

    // ---- adding & removing ---- 

    // send friend request
    public Friendship addFriend(Integer studentId, Integer studentId2) {
        Optional<Friendship> existing = friendshipRepo.findByStudentPair(studentId, studentId2);
        if (existing.isPresent()) {
            throw new RuntimeException("Friend request already exists");
        }

        Friendship friendship = new Friendship();
        friendship.setStudentId(studentId);
        friendship.setStudentId2(studentId2);
        friendship.setStatus("Pending");
        return friendshipRepo.save(friendship);
    }

    // remove friend from friends list
    public void removeFriend(Integer friendshipId) {
        friendshipRepo.deleteById(friendshipId);
    }

    // check if friendship exists
    public boolean existsFriendship(Integer studentId, Integer studentId2) {
        return friendshipRepo.findByStudentPair(studentId, studentId2).isPresent();
    }

    // hamdle friends list view
    public List<Map<String, Object>> getAddFriendList(Integer studentId) {
        List<Student> allStudents = studentRepo.findAll();

        // accepted friends
        List<Integer> friendIds = getFriendIds(studentId);

        // pending requests
        Map<Integer, Integer> pendingMap = friendshipRepo
                .findByStudentIdOrStudentId2AndStatus(studentId, studentId, "Pending")
                .stream()
                .filter(f -> f.getStudentId().equals(studentId))
                .collect(Collectors.toMap(Friendship::getStudentId2, Friendship::getFriendshipId));

        return allStudents.stream()
                .filter(student -> !student.getStudentId().equals(studentId)) // exclude self
                .filter(student -> !friendIds.contains(student.getStudentId())) // exclude accepted friends
                .map(student -> {
                    Map<String, Object> data = new HashMap<>();
                    data.putAll(toStudentMap(student));

                    if (pendingMap.containsKey(student.getStudentId())) {
                        data.put("requested", true);
                        data.put("friendshipId", pendingMap.get(student.getStudentId()));
                    } else {
                        data.put("requested", false);
                        data.put("friendshipId", null);
                    }
                    return data;
                })
                .toList();
    }
}