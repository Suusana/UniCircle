//contributor: Zizhu Zhao
package com.unicircle.backend;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class ReviewTest {
    @Test
    void validRateShouldPass(){
        int rate = 4;
        assertTrue(rate >= 1 && rate <= 5);
    }

    @Test
    void invalidRateShouldFail(){
        int rate = 10;
        assertFalse(rate >= 1 && rate <= 5);
    }
}
