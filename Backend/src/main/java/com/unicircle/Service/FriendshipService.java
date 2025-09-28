package com.unicircle.Service;

import com.unicircle.Bean.Friendship;
import com.unicircle.Bean.Student;
import com.unicircle.Repository.FriendshipRepo;
import com.unicircle.Repository.StudentRepo;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
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

    public List<Map<String, Object>> getFriends(Integer studentId) {
        List<Friendship> friendships = friendshipRepo.findByStudentIdOrStudentId2AndStatus(studentId, studentId,
                "Accepted");

        return friendships.stream().map(f -> {
            Integer friendId = f.getStudentId().equals(studentId) ? f.getStudentId2() : f.getStudentId();
            Student friend = studentRepo.findById(friendId).orElse(null);

            Map<String, Object> friendData = new HashMap<>();
            if (friend != null) {
                friendData.put("id", friend.getStudentId());
                friendData.put("name", friend.getFirstName());
                friendData.put("year", friend.getYear());
                friendData.put("degree", friend.getDegree());
                friendData.put("class", friend.getMajor());
            }
            friendData.put("friendshipId", f.getFriendshipId());
            friendData.put("status", f.getStatus());

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
                data.put("class", requester.getMajor());
            }
            // Include raw relationship info
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

        // Get accepted friends
        List<Integer> friendIds = getFriendIds(studentId);

        // Get pending requests
        List<Friendship> pending = friendshipRepo.findByStudentIdOrStudentId2AndStatus(studentId, studentId, "Pending");
        Map<Integer, Integer> pendingMap = pending.stream()
                .collect(Collectors.toMap(
                        f -> f.getStudentId().equals(studentId) ? f.getStudentId2() : f.getStudentId(),
                        Friendship::getFriendshipId,
                        (existing, replacement) -> existing // just keep the first one
                ));

        return allStudents.stream()
                .filter(s -> !s.getStudentId().equals(studentId)) // exclude self
                .filter(s -> !friendIds.contains(s.getStudentId())) // exclude accepted friends
                .map(s -> {
                    Map<String, Object> m = new HashMap<>();
                    m.put("id", s.getStudentId());
                    m.put("name", s.getFirstName());
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