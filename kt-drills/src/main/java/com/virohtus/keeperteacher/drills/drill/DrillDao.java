package com.virohtus.keeperteacher.drills.drill;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DrillDao extends JpaRepository<Drill, String> {

    Drill findByName(String name);
}
