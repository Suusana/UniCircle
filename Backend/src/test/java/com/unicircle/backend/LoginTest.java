package com.unicircle.backend;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class LoginTest {
    @Test
    void correctPasswordShouldLogin(){
        String password = "123123123";
        boolean result = "123123123".equals(password);
        assertTrue(result);
    }

    @Test
    void wrongPasswordShouldFail(){
        String password = "321321321";
        boolean result = "123123123".equals(password);
        assertFalse(result);
    }
}

