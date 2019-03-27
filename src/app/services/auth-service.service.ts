import { Injectable } from '@angular/core';
import { Router} from '@angular/router';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';



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
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }

  getDetails() {
    // tslint:disable-next-line:prefer-const
    let data = localStorage.getItem('currentUser');
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
    // tslint:disable-next-line:prefer-const
    // let headers = new HttpHeaders();
    // // tslint:disable-next-line:prefer-const
    // let token = localStorage.getItem('token');
    // console.log(token);
    // console.log(user);
    // const ht = headers.append('Authorization', 'Bearer ' + token);
    // console.log(ht);
    // // tslint:disable-next-line:prefer-const
    // let result = this.http.post(`http://localhost:4009/admin/register`, { ht }, user);
    // console.log(result);
    // return result;
    return this.http.post(`http://localhost:4009/admin/register`, user);
  }

  get() {
    // tslint:disable-next-line:prefer-const
    let headers = new HttpHeaders();
    // tslint:disable-next-line:prefer-const
    let token = localStorage.getItem('token');
    console.log(token);
    headers.append('Authorization', 'Bearer ' + token);
    console.log(headers);
    const result = this.http.get(`http://localhost:4009/admin/register`, { headers});
    console.log(result);
    return result;
  }
}
