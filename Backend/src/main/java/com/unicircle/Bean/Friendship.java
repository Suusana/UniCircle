package com.unicircle.Bean;

import jakarta.persistence.*;

@Entity
@Table(name = "Friendship")
public class Friendship {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer friendshipId;

    @Column(nullable = false)
    private Integer studentId;

    @Column(nullable = false)
    private Integer studentId2;

    @Column(nullable = false)
    private String status;

    public Integer getFriendshipId() {
        return friendshipId;
    }

    public void setFriendshipId(Integer friendshipId) {
        this.friendshipId = friendshipId;
    }

    public Integer getStudentId() {
        return studentId;
    }

    public void setStudentId(Integer studentId) {
        this.studentId = studentId;
    }

    public Integer getStudentId2() {
        return studentId2;
    }

    public void setStudentId2(Integer studentId2) {
        this.studentId2 = studentId2;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

}