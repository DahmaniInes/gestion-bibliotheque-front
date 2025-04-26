import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];
  newCategory: Category = { name: '', description: '' };
  editingCategory: Category | null = null;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Error loading categories:', err);
      }
    });
  }

  createCategory(): void {
    if (this.newCategory.name) {
      this.categoryService.createCategory(this.newCategory).subscribe({
        next: (category) => {
          this.categories.push(category);
          this.newCategory = { name: '', description: '' };
        },
        error: (err) => {
          console.error('Error creating category:', err);
        }
      });
    }
  }

  editCategory(category: Category): void {
    this.editingCategory = { ...category };
  }

  updateCategory(): void {
    if (this.editingCategory && this.editingCategory.id && this.editingCategory.name) {
      this.categoryService.updateCategory(this.editingCategory.id, this.editingCategory).subscribe({
        next: (updatedCategory) => {
          const index = this.categories.findIndex(c => c.id === updatedCategory.id);
          if (index !== -1) {
            this.categories[index] = updatedCategory;
          }
          this.editingCategory = null;
        },
        error: (err) => {
          console.error('Error updating category:', err);
        }
      });
    }
  }

  deleteCategory(id: number | undefined): void {
    if (id === undefined) {
      console.error('Cannot delete category with undefined ID');
      return;
    }
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(id).subscribe({
        next: () => {
          this.categories = this.categories.filter(category => category.id !== id);
        },
        error: (err) => {
          console.error('Error deleting category:', err);
        }
      });
    }
  }

  cancelEdit(): void {
    this.editingCategory = null;
  }
}