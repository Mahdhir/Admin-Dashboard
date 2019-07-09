import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {AuthService} from 'src/app/services/auth-service.service';
@Component({
  selector: 'app-sellers',
  templateUrl: './sellers.component.html',
  styleUrls: ['./sellers.component.css']
})
export class SellersComponent implements OnInit {
  users: any = [];
  searchText = null;
  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.loadData();
  }
  
  loadData(){
    this.userService.getAllSellers().toPromise()
    .then( res => {
      this.users = res;
      console.log(this.users);
    })
    .catch( err => console.log(err));
  }
  search(ev: any) {
    console.log(ev.target.value);
    this.searchText = ev.target.value;

    console.log(this.users);
  }
}
