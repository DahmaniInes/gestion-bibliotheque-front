import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { PostService } from '../../services/post.service';
import { CommentService } from '../../services/comment.service';
import { CategoryService } from '../../services/category.service';
import { Post } from '../../models/post';
import {  Comment} from '../../models/comment';
import {  Category } from '../../models/category';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css'],
  animations: [
    trigger('cardAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('0.5s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('commentAnimation', [
      state('void', style({ opacity: 0, maxHeight: '0px' })),
      state('*', style({ opacity: 1, maxHeight: '600px' })),
      transition(':enter', animate('0.4s ease-out')),
      transition(':leave', animate('0.3s ease-in'))
    ])
  ]
})
export class BlogsComponent implements OnInit {
  posts: Post[] = [];
  categories: Category[] = [];
  comments: { [key: number]: Comment[] } = {};
  showComments: { [key: number]: boolean } = {};
  newComment: Comment = { username: '', content: '' };
  selectedCategoryId: string = '';
  page: number = 0;
  totalPages: number = 1;
  pageSize: number = 9; // 3x3 grid
  isLoading: boolean = false;

  constructor(
    private postService: PostService,
    private commentService: CommentService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadPosts();
  }

  loadCategories(): void {
    this.isLoading = true;
    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load categories:', err);
        this.isLoading = false;
      }
    });
  }

  loadPosts(): void {
    this.isLoading = true;
    if (this.selectedCategoryId) {
      this.postService.getPostsByCategory(+this.selectedCategoryId).subscribe({
        next: (data) => {
          this.posts = data;
          this.totalPages = Math.ceil(data.length / this.pageSize);
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Failed to load posts by category:', err);
          this.isLoading = false;
        }
      });
    } else {
      this.postService.getAllPosts(this.page, this.pageSize).subscribe({
        next: (data) => {
          this.posts = data.content;
          this.totalPages = data.totalPages;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Failed to load posts:', err);
          this.isLoading = false;
        }
      });
    }
  }

  filterPosts(): void {
    this.page = 0;
    this.loadPosts();
  }

  toggleComments(postId: number): void {
    this.showComments[postId] = !this.showComments[postId];
    if (this.showComments[postId] && !this.comments[postId]) {
      this.isLoading = true;
      this.commentService.getCommentsByPost(postId).subscribe({
        next: (data) => {
          this.comments[postId] = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Failed to load comments:', err);
          this.isLoading = false;
        }
      });
    }
  }

  addComment(postId: number): void {
    if (this.newComment.content && this.newComment.username) {
      this.isLoading = true;
      this.commentService.createComment(this.newComment, postId).subscribe({
        next: (comment) => {
          this.comments[postId] = [...(this.comments[postId] || []), comment];
          this.newComment = { username: '', content: '' };
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Failed to add comment:', err);
          this.isLoading = false;
        }
      });
    }
  }

  onPageChange(newPage: number): void {
    if (newPage >= 0 && newPage < this.totalPages) {
      this.page = newPage;
      this.loadPosts();
    }
  }

  handleCardKeydown(event: KeyboardEvent, postId: number): void {
    if (event.key === 'Enter' || event.key === ' ') {
      this.toggleComments(postId);
      event.preventDefault();
    }
  }
}