import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // this is a mock API endpoint for user authentication
  private api = 'https://67e3d4fb2ae442db76d1c9ae.mockapi.io/users';

  private loggedInUser: User | null = null; // maybe null if no user is logged in

  constructor(private http: HttpClient) {}

  // Method to log in a user
  login(username: string, password: string): Observable<boolean> {
    return this.http
      .get<User[]>(`${this.api}?username=${username}&password=${password}`)
      .pipe(
        map((users) => {
          if (users.length > 0) {
            this.loggedInUser = users[0];
            return true;
          }
          return false;
        })
      );
  }
  // Method to check if a user is logged in
  isLoggedIn(): boolean {
    return this.loggedInUser !== null;
  }
}
