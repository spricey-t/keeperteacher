package com.virohtus.keeperteacher.drills.drill;

import com.virohtus.keeperteacher.drills.base.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

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

    public Drill findById(String drillId) throws ResourceNotFoundException {
        Drill drill = drillDao.findOne(drillId);
        if(drill == null) {
            throw new ResourceNotFoundException(drillId);
        }
        return drill;
    }

    public Drill create(Drill drill) {
        return drillDao.save(drill);
    }

    public Drill update(Drill drill) throws ResourceNotFoundException {
        guardDrillExists(drill.getId());
        return drillDao.save(drill);
    }

    public Drill delete(String drillId) throws ResourceNotFoundException {
        guardDrillExists(drillId);
        Drill drill = drillDao.findOne(drillId);
        drillDao.delete(drill);
        return drill;
    }

    private void guardDrillExists(String drillId) throws ResourceNotFoundException {
        if(StringUtils.isEmpty(drillId) || !drillDao.exists(drillId)) {
            throw new ResourceNotFoundException(drillId);
        }
    }
}
