package com.unicircle.Service;

import com.unicircle.Bean.Friendship;
import com.unicircle.Repository.FriendshipRepo;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FriendshipService {
        private final FriendshipRepo friendshipRepo;
    
        public FriendshipService(FriendshipRepo friendshipRepository) {
        this.friendshipRepo = friendshipRepository;
    }

    public List<Friendship> getFriends(Integer studentId) {
        return friendshipRepo.findByStudentIdOrStudentId2AndStatus(studentId, studentId, "Accepted");
    }

    public Friendship addFriend(Integer studentId, Integer studentId2) {
        Friendship f = new Friendship();
        f.setStudentId(studentId);
        f.setStudentId2(studentId2);
        f.setStatus("Pending");
        return friendshipRepo.save(f);
    }

    public void removeFriend(Integer friendshipId) {
        friendshipRepo.deleteById(friendshipId);
    }
}
