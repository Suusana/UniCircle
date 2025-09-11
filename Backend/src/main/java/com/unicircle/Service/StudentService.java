package com.unicircle.Service;

import com.unicircle.Bean.Membership;
import com.unicircle.Bean.Student;
import com.unicircle.Repository.MembershipRepo;
import com.unicircle.Repository.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class StudentService {
    @Autowired
    private StudentRepo studentRepo;

    @Autowired
    private MembershipRepo membershipRepo;

    public Student register(Student student) {
        if (studentRepo.existsByEmail(student.getEmail())){
            throw new RuntimeException("Email Already Exists");
        }
        return studentRepo.save(student);
    }

    // get student by their club id and role
    public List<Student> getClubOwnerById(int id, String role) {
        List<Membership> memberships = membershipRepo.findByClubClubIdAndRole(id, role);
        List<Student> students = new ArrayList<>();
        for (Membership membership : memberships) {
            students.add(membership.getStudent());
        }
        return students;
    }

    public Student getUser() {
        return studentRepo.findByStudentId(1);
    }
}
