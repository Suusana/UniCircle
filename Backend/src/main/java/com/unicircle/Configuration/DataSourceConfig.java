package com.unicircle.Configuration;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

// @Configuration
// public class DataSourceConfig {
//
//    @Value("${user.home}")
//    private String userHome;
//
//    @Bean
//    public DataSource dataSource() {
//        String dbPath = userHome + "/unicircle.db";
//        DriverManagerDataSource dataSource = new DriverManagerDataSource();
//        dataSource.setDriverClassName("org.sqlite.JDBC");
//        dataSource.setUrl("jdbc:sqlite:" + dbPath);
//        return dataSource;
//    }
// }

@Configuration
public class DataSourceConfig {
    @Bean
    public DataSource dataSource() {
        String dbPath = "/home/site/wwwroot/unicircle.db";
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("org.sqlite.JDBC");
        dataSource.setUrl("jdbc:sqlite:" + dbPath);
        return dataSource;
    }
}