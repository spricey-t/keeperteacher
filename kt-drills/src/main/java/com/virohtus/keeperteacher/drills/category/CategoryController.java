package com.virohtus.keeperteacher.drills.category;

import com.virohtus.keeperteacher.drills.base.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    private final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public Page<Category> findAllPaged(
            Pageable pageable
    ) {
        return categoryService.findAllPaged(pageable);
    }

    @PostMapping
    public Category create(
            @Valid @RequestBody Category category
    ) {
        return categoryService.create(category);
    }

    @GetMapping("{categoryId}")
    public Category read(
            @PathVariable String categoryId
    ) throws ResourceNotFoundException {
        return categoryService.findById(categoryId);
    }

    @PutMapping("{categoryId}")
    public Category update(
            @PathVariable String categoryId,
            @Valid @RequestBody Category category
    ) throws ResourceNotFoundException {
        category.setId(categoryId);
        return categoryService.update(category);
    }

    @DeleteMapping("{categoryId}")
    public Category delete(
            @PathVariable String categoryId
    ) throws ResourceNotFoundException {
        return categoryService.delete(categoryId);
    }
}
