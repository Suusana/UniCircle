//contributors: gurpreet
package com.unicircle.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.unicircle.Bean.Subject;;

@Repository
public interface SubjectRepo extends JpaRepository<Subject, Integer> {

}

