package com.unicircle.Bean;


// @Entity @Table(name="shortcut")
public class Shortcut {
    // @ID 
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String url;

    public Shortcut() {} //Contructor
    public Shortcut(int id, String name, String url){
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
