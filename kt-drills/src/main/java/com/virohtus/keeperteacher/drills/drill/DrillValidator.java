package com.virohtus.keeperteacher.drills.drill;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

@Service
@Transactional(readOnly = true)
public class DrillValidator implements Validator {

    private final DrillDao drillDao;

    @Autowired
    public DrillValidator(DrillDao drillDao) {
        this.drillDao = drillDao;
    }

    @Override
    public boolean supports(Class<?> aClass) {
        return Drill.class.isAssignableFrom(aClass);
    }

    @Override
    public void validate(Object o, Errors errors) {
        Drill drill = (Drill)o;
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "name", "drill name is empty");
        Drill existing = drillDao.findByName(drill.getName());
        if(existing != null && !drill.getId().equals(existing.getId())) {
            errors.rejectValue("name", "that name already exists!");
        }
    }
}
