package com.unicircle.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.unicircle.Bean.Shortcut;
import com.unicircle.Repository.ShortcutRepo;

@Service
public class ShortcutService {
    private final ShortcutRepo shortcutRepo;

    public ShortcutService(ShortcutRepo shortcutRepo){
        this.shortcutRepo = shortcutRepo;
    }

    public List<Shortcut> getAllShortcuts(){
        return shortcutRepo.findAll();
    }
}
