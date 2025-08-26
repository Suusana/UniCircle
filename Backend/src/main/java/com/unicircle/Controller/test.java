package com.unicircle.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class test {

    @GetMapping("/api/hello")
    public String hello() {
        return "TEST TEST TEST TEST TEST";
    }
}


