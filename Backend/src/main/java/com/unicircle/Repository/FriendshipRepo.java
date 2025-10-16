//contributor: gurpreet 
package com.unicircle.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.unicircle.Bean.Friendship;

@Repository
public interface FriendshipRepo extends JpaRepository<Friendship, Integer> {
        List<Friendship> findByStudentIdOrStudentId2AndStatus(Integer studentId, Integer studentId2, String status);

        @Query("SELECT f FROM Friendship f " +
                        "WHERE (f.studentId = :studentId OR f.studentId2 = :studentId) " +
                        "AND f.status = 'Accepted'")
        List<Friendship> findAcceptedFriends(@Param("studentId") Integer studentId);

        @Query("SELECT f FROM Friendship f " +
                        "WHERE (f.studentId = :studentId1 AND f.studentId2 = :studentId2) " +
                        "   OR (f.studentId = :studentId2 AND f.studentId2 = :studentId1)")
        Optional<Friendship> findByStudentPair(@Param("studentId1") Integer studentId1,
                        @Param("studentId2") Integer studentId2);

        @Query("SELECT f FROM Friendship f " +
                        "WHERE f.studentId2 = :studentId " +
                        "AND f.status = 'Pending'")
        List<Friendship> findIncomingRequests(@Param("studentId") Integer studentId);
}