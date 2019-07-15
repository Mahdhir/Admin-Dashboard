import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-buyers',
  templateUrl: './buyers.component.html',
  styleUrls: ['./buyers.component.css']
})
export class BuyersComponent implements OnInit {

  users: any = [];
  searchText = null ;
  constructor(
    private userService: UserService
    ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    this.userService.getAllBuyers().toPromise()
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
