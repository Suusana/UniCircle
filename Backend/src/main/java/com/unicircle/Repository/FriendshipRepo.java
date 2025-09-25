package com.unicircle.Repository;

import com.unicircle.Bean.Friendship;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FriendshipRepo extends JpaRepository<Friendship, Integer> {
    List<Friendship> findByStudentIdOrStudentId2AndStatus(Integer studentId, Integer studentId2, String status);
}