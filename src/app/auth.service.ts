// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private apiUrl = 'http://localhost:3000/users'; // URL to the JSON Server API

    constructor(private http: HttpClient) { }

    // Login method
    login(email: string, password: string): Observable<any> {
        return this.http.get<any[]>(this.apiUrl).pipe(
            map((users) => {
                // Find the user with matching email and password
                const user = users.find(
                    (user) => user.email === email && user.password === password
                );

                if (user) {
                    // Simulate a JWT token
                    const token = 'mock-jwt-token'; // In a real app, you'd get this from the backend

                    // Return the token and user data
                    return { token, user };
                } else {
                    throw new Error('Invalid credentials');
                }
            })
        );
    }


    saveUser(name:any,pass:any){
        sessionStorage.removeItem('userName');
        sessionStorage.removeItem('userPass');

        sessionStorage.setItem('userName',name);
        sessionStorage.setItem('userPass',pass);
    }

    isLogin(): boolean{
        let userName = sessionStorage.getItem('userName');
        return userName != null;
    }
}
