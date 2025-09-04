package com.unicircle.Bean;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity @Table(name="Shortcut")
public class Shortcut {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="shortcut_id")
    private int id;
    @Column(name="name")
    private String name;
    @Column(name="url")
    private String url;

    public Shortcut() {} //Contructor -> ==  @@NoArgsConstructor
    public Shortcut(int id, String name, String url){ //== @AllArgsConstructor
        this.id = id;
        this.name = name;
        this.url = url;
    }

    //getters and setters
    public int getId(){return id;}
    // public void setId(int id){this.id = id;}
    
    public String getName(){return name;}
    public void setName(String name){this.name = name;}

    public String getUrl(){return url;}
    public void setUrl(String url){this.url = url;}
}
