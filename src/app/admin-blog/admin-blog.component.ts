import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';
@Component({
  selector: 'app-admin-blog',
  templateUrl: './admin-blog.component.html',
  styleUrls: ['./admin-blog.component.scss']
})
export class AdminBlogComponent implements OnInit {
  currentAdminPage: string = 'blogs';
  blogs: any[] = [];
  newBlog: any = { name: '', title: '', description: '', };
  isEditing: boolean = false;
  editedBlog: any = {};
  editingBlogId: number | undefined;

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.refreshBlogs();
  }

  switchAdminPage(page: string): void {
    this.currentAdminPage = page;
  }

  addBlog(): void {
    if (this.newBlog.name && this.newBlog.title && this.newBlog.description) {
      this.blogService.addBlog(this.newBlog).subscribe(() => {
        this.newBlog = { name: '', title: '', description: '', };
        this.refreshBlogs();
      });
    }
  }
  // editBlog(id: number): void {
  //   this.isEditing = true;
  //   this.editedBlog = { ...blog };
  // }
  // editBlog(id: number): void {
  //   this.isEditing = true;
  //   this.editingBlogId = id;
  //   this.blogService.getBlogs().subscribe(blog => {
  //     this.editedBlog = { ...blog };
  //   });
  // }

  editBlog(id: number): void {
    this.isEditing = true;
    this.editingBlogId = id;
    this.blogService.getBlogById(id).subscribe(blog => {
      this.editedBlog = { ...blog };
    });
  }


  updateBlog(): void {
    if (this.editingBlogId !== undefined && this.editedBlog.name && this.editedBlog.title && this.editedBlog.description) {
      this.blogService.updateBlog(this.editingBlogId, this.editedBlog).subscribe(() => {
        this.isEditing = false;
        this.editingBlogId = undefined;
        this.editedBlog = {};
        this.refreshBlogs();
      });
    }
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editingBlogId = undefined;
    this.editedBlog = {};
  }

  // deleteBlog(id: number): void {
  //   this.blogService.deleteBlog(id).subscribe(() => {
  //     this.refreshBlogs();
  //   });
  // }
  deleteBlog(id: number): void {
    this.blogService.deleteBlog(id).subscribe(() => {
      if (this.editingBlogId === id) {
        this.isEditing = false;
        this.editingBlogId = undefined;
        this.editedBlog = {};
      }
      this.refreshBlogs();
    });
  }

  refreshBlogs(): void {
    this.blogService.getBlogs().subscribe(data => {
      this.blogs = data;
    });
  }
  /////////////////////////////////////////////////////////////////
}
