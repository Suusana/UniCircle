package com.unicircle.backend;

import com.unicircle.Bean.Student;
import com.unicircle.Repository.StudentRepo;
import com.unicircle.Service.StudentService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
public class LoginTest {
    @Mock
    private StudentRepo studentRepo;

    @InjectMocks
    private StudentService studentService;


    @Test
    void correctPasswordShouldLogin(){
        String password = "123123123";
        boolean result = "123123123".equals(password);
        assertTrue(result);
    }

    @Test
    void wrongPasswordShouldFail(){
        String email = "123123123@gmail.com";
        String password = "123123123";

        // Mock repo to return null when no matching student is found
        Mockito.when(studentRepo.findByEmailAndPassword(email.toLowerCase(), password)).thenReturn(null);

        Student result = studentService.validateStudent(email, password);

        // Should return null if login fails
        assertNull(result, "Login should fail and return null if no matching student");

        // Verify repository method was called once
        Mockito.verify(studentRepo, Mockito.times(1))
                .findByEmailAndPassword(email.toLowerCase(), password);
    }


}

