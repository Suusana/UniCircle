package com.unicircle.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.unicircle.Bean.Membership;
import com.unicircle.Bean.Student;
import com.unicircle.Repository.MembershipRepo;
import com.unicircle.Repository.StudentRepo;


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
        System.out.println("Getting the first user in Student Table :from Service");
        return studentRepo.findByStudentId(1);
    }

    public Student updateStudentInfo (Student newInfo ) { //update on studentProfile page -> name, major, degree, desciprtion, academic record
        Student currentStudent = studentRepo.findByStudentId(1);

        currentStudent.setFirstName(newInfo.getFirstName());
        currentStudent.setLastName(newInfo.getLastName());
        currentStudent.setMajor(newInfo.getMajor());
        currentStudent.setDegree(newInfo.getDegree());
        currentStudent.setDescription(newInfo.getDescription());
        currentStudent.setAcademicRecord(newInfo.getAcademicRecord());

        return studentRepo.save(currentStudent);
    }
    // public Student getLoggedInUser(String email) {
    // return studentRepo.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
    // }
}
