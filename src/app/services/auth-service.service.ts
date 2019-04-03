import { Injectable } from '@angular/core';
import { Router} from '@angular/router';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private http: HttpClient
    ) { }

  logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
      localStorage.removeItem('user');
      this.router.navigate(['login']);
      console.log('SignOut');
  }

  isLoggedIn() {
    const helper = new JwtHelperService();
    const token = localStorage.getItem('token');
    if (token && !helper.isTokenExpired(token)) {
      return true;
    } else {
      return false;
    }
  }

  getDetails() {
    const data = localStorage.getItem('currentUser');
    console.log(data);
    return JSON.parse(data);
  }

  login(username: string, password: string) {
    console.log('Login');
    // tslint:disable-next-line:object-literal-shorthand
    return this.http.post<any>(`http://localhost:4009/admin/authenticate`, { username: username, password: password})
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          // localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('token', user.token);
          localStorage.setItem('currentUser', JSON.stringify(user) );
          console.log('User token set');
        } else {
          console.log('Token not found');
          console.log(user);
        }

        return user;
      }));
  }

  register(user) {
    return this.http.post(`http://localhost:4009/admin/register`, user);
  }

  submitEmailVerification(id, code) {
    return this.http.get(`http://localhost:4009/admin?userId=${id}&code=${code}`);
  }

  updateDetails(user) {
    // tslint:disable-next-line:object-literal-shorthand
    return this.http.put(`http://localhost:4009/admin`, user);
  }

  submitEmailForgetPassword(email) {
    return this.http.post(`http://localhost:4009/admin/ForgetPassword`, {email});
  }

  resetPassword(user) {
    return this.http.post(`http://localhost:4009/admin/ResetPassword`, user);
  }
}
