import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getBlogs(): Observable<any> {
    return this.http.get(`${this.apiUrl}/blogs`);
  }
  getBlogById(id: number): Observable<any> {
    const url = `${this.apiUrl}/blogs/${id}`;
    return this.http.get(url);
  }

  addBlog(blog: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/blogs`, blog);
  }

  updateBlog(id: number, blog: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/blogs/${id}`, blog);
  }

  deleteBlog(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/blogs/${id}`);
  }
}
