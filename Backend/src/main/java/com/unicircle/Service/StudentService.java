package com.unicircle.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    public boolean existsByEmail(String email) {
        if (email == null) return false;
        String norm = email.trim().toLowerCase();
        return studentRepo.existsByEmail(norm);
    }

    @Transactional
    public Student createStudent(Student student) {
        if (student == null) throw new IllegalArgumentException("Invalid student");

        String email = student.getEmail() == null ? null : student.getEmail().trim().toLowerCase();
        String password = student.getPassword() == null ? null : student.getPassword().trim();
        student.setEmail(email);
        student.setPassword(password);
        if (student.getFirstName() != null) student.setFirstName(student.getFirstName().trim());
        if (student.getLastName()  != null) student.setLastName(student.getLastName().trim());
        if (student.getMajor()     != null) student.setMajor(student.getMajor().trim());

        if (email == null || !email.matches("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$"))
            throw new IllegalArgumentException("Invalid email");
        if (password == null || password.length() < 8)
            throw new IllegalArgumentException("Password must be at least 8 characters");
        if (student.getYear() == null || student.getYear() < 1) student.setYear(1);
        if (student.getDegree() == null || student.getDegree().isEmpty()) student.setDegree("Bachelor");

        return studentRepo.save(student);
    }

    public Student validateStudent(String email, String password) {
        if (email == null || password == null) return null;
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

    // public Student getUser() {
    //     System.out.println("Getting the first user in Student Table :from Service");
    //     return studentRepo.findByStudentId(1);
    // }
     public Student getLoggedInUser(int id) {
        return studentRepo.findByStudentId(id);
    }
    @Transactional
    public Student updateStudent (Integer id,Student newInfo ) { //update on studentProfile page -> name, major, degree, desciprtion, academic record
        Student currentStudent = studentRepo.findByStudentId(id);

        currentStudent.setFirstName(newInfo.getFirstName());
        currentStudent.setLastName(newInfo.getLastName());
        currentStudent.setPreferredName(newInfo.getPreferredName());
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
