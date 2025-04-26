import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { BlogsComponent } from './blogs.component';
import { PostListComponent } from '../post-list/post-list.component';
import { BlogsRoutingModule } from './blogs-routing.module';
import { CategoryListComponent } from '../category-list/category-list.component';
import { CommentListComponent } from '../comment-list/comment-list.component';
@NgModule({
  declarations: [
    BlogsComponent,
    PostListComponent,
    CategoryListComponent,
    CommentListComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
    BlogsRoutingModule
  ]
})
export class BlogModule { }