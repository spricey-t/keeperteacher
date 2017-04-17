package com.virohtus.keeperteacher.drills.drill;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/drills")
public class DrillController {

    private final DrillService drillService;

    @Autowired
    public DrillController(DrillService drillService) {
        this.drillService = drillService;
    }

    @GetMapping("")
    public Page<Drill> findAllPaged(
            Pageable pageable
    ) {
        return drillService.findAllPaged(pageable);
    }
}
