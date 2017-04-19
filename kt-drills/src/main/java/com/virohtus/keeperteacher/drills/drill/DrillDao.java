package com.virohtus.keeperteacher.drills.drill;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface DrillDao extends JpaRepository<Drill, String> {

    Drill findByName(String name);
    Set<Drill> findAllByCategoryId(String categoryId);
}
