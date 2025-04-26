import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { FileUploadService } from '../../services/file-upload.service';
import { CategoryService } from '../../services/category.service';
import { Post } from '../../models/post';
import { Category } from '../../models/category';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  page: number = 0;
  size: number = 10;
  totalPages: number = 0;
  selectedFile: File | null = null;
  uploadedFileUrl: string | null = null;
  categories: Category[] = [];
  currentPost: Post = { title: '', content: '', author: '' };
  selectedCategoryId: number | null = null;
  editingPost: boolean = false;
  showForm: boolean = false;

  constructor(
    private postService: PostService,
    private fileUploadService: FileUploadService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadPosts();
    this.loadCategories();
  }

  loadPosts(): void {
    this.postService.getAllPosts(this.page, this.size).subscribe({
      next: (data) => {
        this.posts = data.content;
        this.totalPages = data.totalPages;
      },
      error: (err) => console.error('Error loading posts:', err)
    });
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => console.error('Error loading categories:', err)
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  uploadFile(): void {
    if (this.selectedFile) {
      this.fileUploadService.uploadFile(this.selectedFile).subscribe({
        next: (response) => {
          this.uploadedFileUrl = response.url;
          this.currentPost.imageUrl = response.url;
        },
        error: (err) => console.error('Upload failed:', err)
      });
    }
  }

  createPost(): void {
    if (this.selectedCategoryId && this.currentPost.title && this.currentPost.content) {
      this.postService.createPost(this.currentPost, this.selectedCategoryId).subscribe({
        next: (post) => {
          this.posts.push(post);
          this.resetForm();
          this.loadPosts(); // Refresh table
        },
        error: (err) => console.error('Error creating post:', err)
      });
    }
  }

  editPost(post: Post): void {
    this.currentPost = { ...post, category: post.category ? { ...post.category } : undefined };
    this.selectedCategoryId = post.category?.id || null;
    this.uploadedFileUrl = post.imageUrl || null;
    this.editingPost = true;
    this.showForm = true;
  }

  updatePost(): void {
    if (this.currentPost.id && this.selectedCategoryId && this.currentPost.title && this.currentPost.content) {
      this.postService.updatePost(this.currentPost.id, this.currentPost).subscribe({
        next: (updatedPost) => {
          const index = this.posts.findIndex(p => p.id === updatedPost.id);
          if (index !== -1) {
            this.posts[index] = updatedPost;
          }
          this.resetForm();
          this.loadPosts(); // Refresh table
        },
        error: (err) => console.error('Error updating post:', err)
      });
    }
  }

  deletePost(id: number | undefined): void {
    if (id === undefined) {
      console.error('Cannot delete post with undefined ID');
      return;
    }
    if (confirm('Are you sure you want to delete this post?')) {
      this.postService.deletePost(id).subscribe({
        next: () => {
          this.posts = this.posts.filter(post => post.id !== id);
          this.loadPosts(); // Refresh table
        },
        error: (err) => console.error('Error deleting post:', err)
      });
    }
  }

  showCreateForm(): void {
    this.resetForm();
    this.editingPost = false;
    this.showForm = true;
  }

  cancelEdit(): void {
    this.resetForm();
  }

  resetForm(): void {
    this.currentPost = { title: '', content: '', author: '' };
    this.selectedCategoryId = null;
    this.uploadedFileUrl = null;
    this.selectedFile = null;
    this.editingPost = false;
    this.showForm = false;
  }

  onPageChange(newPage: number): void {
    if (newPage >= 0 && newPage < this.totalPages) {
      this.page = newPage;
      this.loadPosts();
    }
  }
}