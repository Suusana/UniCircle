package com.unicircle.Repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.unicircle.Bean.Shortcut;

@Repository
public interface  ShortcutRepo extends JpaRepository<Shortcut, Integer>{
    
}
