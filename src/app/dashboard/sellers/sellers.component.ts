import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sellers',
  templateUrl: './sellers.component.html',
  styleUrls: ['./sellers.component.css']
})
export class SellersComponent implements OnInit {
  users: any = [];
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
}
