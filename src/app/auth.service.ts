
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://127.0.0.1:8000/api';  // Adjust this URL based on your Django server

  constructor(private http: HttpClient) { }

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data, { withCredentials: true }).pipe(
      map((response: any) => {
        localStorage.setItem('jwt', response.jwt);  // Store only the JWT string
        return response;
      })
    );
  }

  getUser(): Observable<any> {
    const token = localStorage.getItem('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.baseUrl}/user`, { headers });
  }

  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout`, {}, { withCredentials: true }).pipe(
      map(response => {
        localStorage.removeItem('jwt');
        return response;
      })
    );
  }

 

  getStudents(): Observable<any> {
    const token = localStorage.getItem('jwt');
    console.log(token);
    const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`);
    return this.http.get(`${this.baseUrl}/students`,{ headers });
  }
  getStudent(id: number): Observable<any> {
    const token = localStorage.getItem('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.baseUrl}/students/${id}`,{ headers });
  }
  addStudent(data: any): Observable<any> {
    // const token = localStorage.getItem('jwt');
    //const headers = new HttpHeaders().set('Authorization');
    return this.http.post(`${this.baseUrl}/students/`, data,);
  }

  updateStudent(id: number, data: any): Observable<any> {
    const token = localStorage.getItem('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.baseUrl}/students/${id}/`, data, { headers });
  }

  deleteStudent(id: number): Observable<any> {
    const token = localStorage.getItem('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.baseUrl}/students/${id}`, { headers });
  }
  


  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/`);
  }

  getUs(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/${id}/`);
  }

  updateUser(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/users/${id}/`, data);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/users/${id}/`);
  }
}
