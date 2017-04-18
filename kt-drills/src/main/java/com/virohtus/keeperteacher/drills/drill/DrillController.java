package com.virohtus.keeperteacher.drills.drill;

import com.virohtus.keeperteacher.drills.base.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/drills")
public class DrillController {

    private final DrillService drillService;

    @Autowired
    public DrillController(DrillService drillService) {
        this.drillService = drillService;
    }

    @GetMapping
    public Page<Drill> findAllPaged(
            Pageable pageable
    ) {
        return drillService.findAllPaged(pageable);
    }

    @PostMapping
    public Drill create(
            @Valid @RequestBody Drill drill
    ) {
        drill.setId(null);
        return drillService.create(drill);
    }

    @GetMapping("{drillId}")
    public Drill read(
            @PathVariable String drillId
    ) throws ResourceNotFoundException {
        return drillService.findById(drillId);
    }

    @PutMapping("{drillId}")
    public Drill update (
            @PathVariable String drillId,
            @Valid @RequestBody Drill drill
    ) throws ResourceNotFoundException {
        drill.setId(drillId);
        return drillService.update(drill);
    }

    @DeleteMapping("{drillId}")
    public Drill delete(
            @PathVariable String drillId
    ) throws ResourceNotFoundException {
        return drillService.delete(drillId);
    }
}
