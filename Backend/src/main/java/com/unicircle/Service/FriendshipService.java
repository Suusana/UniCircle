package com.unicircle.Service;

import com.unicircle.Bean.Friendship;
import com.unicircle.Bean.Student;
import com.unicircle.Repository.FriendshipRepo;
import com.unicircle.Repository.StudentRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

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

    public List<Friendship> getPendingRequests(Integer studentId) {
        return friendshipRepo.findByStudentIdOrStudentId2AndStatus(studentId, studentId, "Pending");
    }

    public List<Integer> getFriendIds(Integer studentId) {
        List<Friendship> friendships = friendshipRepo.findAcceptedFriends(studentId);

        return friendships.stream()
                .map(f -> f.getStudentId().equals(studentId) ? f.getStudentId2() : f.getStudentId())
                .toList();
    }
}