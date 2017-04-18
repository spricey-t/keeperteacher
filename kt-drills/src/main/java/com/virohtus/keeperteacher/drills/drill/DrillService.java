package com.virohtus.keeperteacher.drills.drill;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class DrillService {

    private final DrillDao drillDao;

    @Autowired
    public DrillService(DrillDao drillDao) {
        this.drillDao = drillDao;
    }

    public Page<Drill> findAllPaged(Pageable pageable) {
        return drillDao.findAll(pageable);
    }

    public List<Drill> findAll() {
        return drillDao.findAll();
    }

    public Drill save(Drill drill) {
        return drillDao.save(drill);
    }
}
