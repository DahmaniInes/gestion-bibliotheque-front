import { Component, OnInit } from '@angular/core';
import { CommentService } from '../../services/comment.service';
import { PostService } from '../../services/post.service';
import { Comment } from '../../models/comment';
import { Post } from '../../models/post';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
  comments: Comment[] = [];
  posts: Post[] = [];
  newComment: Comment = { content: '', username: '' };
  selectedPostId: number | null = null;
  editingComment: Comment | null = null;

  constructor(
    private commentService: CommentService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.loadComments();
    this.loadPosts();
  }

  loadComments(): void {
    this.commentService.getAllComments().subscribe({
      next: (data) => {
        this.comments = data;
      },
      error: (err) => {
        console.error('Error loading comments:', err);
      }
    });
  }

  loadPosts(): void {
    this.postService.getAllPosts(0, 100).subscribe({
      next: (data) => {
        this.posts = data.content;
      },
      error: (err) => {
        console.error('Error loading posts:', err);
      }
    });
  }

  createComment(): void {
    if (this.selectedPostId && this.newComment.content) {
      this.commentService.createComment(this.newComment, this.selectedPostId).subscribe({
        next: (comment) => {
          this.comments.push(comment);
          this.newComment = { content: '', username: '' };
          this.selectedPostId = null;
        },
        error: (err) => {
          console.error('Error creating comment:', err);
        }
      });
    }
  }

  editComment(comment: Comment): void {
    this.editingComment = { ...comment };
    this.selectedPostId = comment.post?.id || null;
  }

  updateComment(): void {
    if (this.editingComment && this.editingComment.id && this.selectedPostId) {
      this.commentService.updateComment(this.editingComment.id, this.editingComment).subscribe({
        next: (updatedComment) => {
          const index = this.comments.findIndex(c => c.id === updatedComment.id);
          if (index !== -1) {
            this.comments[index] = updatedComment;
          }
          this.editingComment = null;
          this.selectedPostId = null;
        },
        error: (err) => {
          console.error('Error updating comment:', err);
        }
      });
    }
  }

  deleteComment(id: number | undefined): void {
    if (id === undefined) {
      console.error('Cannot delete comment with undefined ID');
      return;
    }
    if (confirm('Are you sure you want to delete this comment?')) {
      this.commentService.deleteComment(id).subscribe({
        next: () => {
          this.comments = this.comments.filter(comment => comment.id !== id);
        },
        error: (err) => {
          console.error('Error deleting comment:', err);
        }
      });
    }
  }

  getCommentsByPost(): void {
    if (this.selectedPostId) {
      this.commentService.getCommentsByPost(this.selectedPostId).subscribe({
        next: (comments) => {
          this.comments = comments;
        },
        error: (err) => {
          console.error('Error loading comments by post:', err);
        }
      });
    } else {
      this.loadComments();
    }
  }

  cancelEdit(): void {
    this.editingComment = null;
    this.selectedPostId = null;
  }
}