import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogsComponent } from './blogs.component';
import { PostListComponent } from '../post-list/post-list.component';

const routes: Routes = [
  { path: 'blogs', component: BlogsComponent },
  { path: 'admin/posts', component: PostListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogsRoutingModule { }