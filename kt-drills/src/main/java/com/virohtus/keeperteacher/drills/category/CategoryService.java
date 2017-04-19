package com.virohtus.keeperteacher.drills.category;

import com.virohtus.keeperteacher.drills.base.ResourceNotFoundException;
import com.virohtus.keeperteacher.drills.drill.Drill;
import com.virohtus.keeperteacher.drills.drill.DrillDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Set;

@Service
@Transactional
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final DrillDao drillDao;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository, DrillDao drillDao) {
        this.categoryRepository = categoryRepository;
        this.drillDao = drillDao;
    }

    public Page<Category> findAllPaged(Pageable pageable) {
        return categoryRepository.findAll(pageable);
    }

    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    public Category findById(String categoryId) throws ResourceNotFoundException {
        Category category = categoryRepository.findOne(categoryId);
        if(category == null) {
            throw new ResourceNotFoundException(categoryId);
        }
        return category;
    }

    public Category create(Category category) {
        return categoryRepository.save(category);
    }

    public Category update(Category category) throws ResourceNotFoundException {
        guardCategoryExists(category.getId());
        return categoryRepository.save(category);
    }

    public Category delete(String categoryId) throws ResourceNotFoundException {
        guardCategoryExists(categoryId);
        Category category = categoryRepository.findOne(categoryId);
        categoryRepository.delete(category);

        Set<Drill> drills = drillDao.findAllByCategoryId(categoryId);
        drills.forEach(drill -> drill.setCategoryId(null));
        drillDao.save(drills);

        return category;
    }

    private void guardCategoryExists(String categoryId) throws ResourceNotFoundException {
        if(StringUtils.isEmpty(categoryId) || !categoryRepository.exists(categoryId)) {
            throw new ResourceNotFoundException(categoryId);
        }
    }
}
