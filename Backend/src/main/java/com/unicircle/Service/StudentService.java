package com.unicircle.Service;

import com.unicircle.Bean.Membership;
import com.unicircle.Bean.Student;
import com.unicircle.Repository.MembershipRepo;
import com.unicircle.Repository.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class StudentService {
    @Autowired
    private StudentRepo studentRepo;

    @Autowired
    private MembershipRepo membershipRepo;

    @Transactional
    public Student register(Student student) {
        if (student.getEmail() == null ||
                !student.getEmail().matches("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$")) {
            throw new IllegalArgumentException("Invalid email");
        }
        if (student.getPassword() == null || student.getPassword().length() < 8) {
            throw new IllegalArgumentException("Password must be at least 8 characters");
        }

        if (studentRepo.existsByEmail(student.getEmail())) {
            throw new IllegalStateException("Email already exists");
        }

        Student saved = studentRepo.save(student);

        return saved;
    }

    public Student validateStudent(String email, String password) {
        return studentRepo.findByEmailAndPassword(email, password);
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
