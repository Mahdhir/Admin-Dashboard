import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import * as $ from 'jquery';
import { AuthService } from 'src/app/services/auth-service.service';

import { NgxSmartModalService } from 'ngx-smart-modal';
import {UsermanagmentService} from 'src/app/services/usermanagment.service'
@Component({
  selector: 'app-buyers',
  templateUrl: './buyers.component.html',
  styleUrls: ['./buyers.component.css']
})
export class BuyersComponent implements OnInit {

  users: any = [];
  searchText = null ;
  modalService: any;
  showSpinner=true;
  constructor(
    private userService: UserService,
    private authservice:AuthService,
    public ngxSmartModalService: NgxSmartModalService,
    private userManagmentService : UsermanagmentService
    ) { }

  ngOnInit() {
    this.loadData();
      $(document).ready(function() {
      $('.filterable .filters').click(function() {
        const $panel = $(this).parents('.filterable'),
          $filters = $panel.find('.filters input'),
          $tbody = $panel.find('.table tbody');
        if ($filters.prop('disabled') === true) {
          $filters.prop('disabled', false);
          $filters.first().focus();
        } else {
          $filters.val('').prop('disabled', true);
          $tbody.find('.no-result').remove();
          $tbody.find('tr').show();
        }
      });

      $('.filterable .filters input').keyup(function(e) {
        /* Ignore tab key */
        const code = e.keyCode || e.which;
        if (code === '9'){ return; }
        /* Useful DOM data and selectors */
        const $input = $(this),
          inputContent = $input.val().toLowerCase(),
          $panel = $input.parents('.filterable'),
          column = $panel.find('.filters th').index($input.parents('th')),
          $table = $panel.find('.table'),
          $rows = $table.find('tbody tr');
        /* Dirtiest filter function ever ;) */
        const $filteredRows = $rows.filter(function() {
          const value = $(this)
            .find('td')
            .eq(column)
            .text()
            .toLowerCase();
          return value.indexOf(inputContent) === -1;
        });
        /* Clean previous no-result if exist */
        $table.find('tbody .no-result').remove();
        /* Show all rows, hide filtered ones (never do that outside of a demo ! xD) */
        $rows.show();
        $filteredRows.hide();
        /* Prepend no-result row if all rows are filtered */
        if ($filteredRows.length === $rows.length) {
          $table
            .find('tbody')
            .prepend(
              $(
                '<tr class="no-result text-center"><td colspan="' +
                  $table.find('.filters th').length +
                  '">No result found</td></tr>'
              )
            );
        }
      });
    });
  }

  logOut(){
    this.authservice.logout();
    console.log("logout");
  }
  LockBuyer(id){
    console.log(id);
    if (confirm('Are you sure you want to block this Buyer ?')) {
     
      let fordays = parseInt(window.prompt("Number of Days") );
      debugger;
      if(isNaN(fordays))
      fordays=null;
      this.userManagmentService.LockUser(id,fordays).subscribe(() => {
        alert('Buyer Blocked Successfully!!');
        this.ngOnInit();
      });
  }}
  UnLockBuyer(id){
    console.log(id);
    if(confirm('Are you sure you want to unlock this Buyer ?')){
      this.userManagmentService.UnlockUser(id).subscribe(()=>{
        alert ('Buyer Unlocked!!');
        this.ngOnInit();
      })
    }
  }
  openBuyer(buyer){

    this.ngxSmartModalService.setModalData(buyer, 'viewBuyer');
    this.ngxSmartModalService.getModal('viewBuyer').open();
    this.modalService = this.ngxSmartModalService.getModal('viewBuyer').onAnyCloseEvent.subscribe(
      () => {
        this.ngxSmartModalService.resetModalData('viewBuyer');
      }
    );
  }
  closeBuyer(){
    this.ngxSmartModalService.close('viewBuyer');
  }

  loadData(){
    this.userService.getAllBuyers().toPromise()
    .then( res => {
      this.users = res;
      this.showSpinner=false;
      console.log(this.users);
    })
    .catch( err => console.log(err));
  }
  search(ev: any) {
    console.log(ev.target.value);
    this.searchText = ev.target.value;

    console.log(this.users);
  }
  ngOnDestroy(){
    if(this.modalService){
      this.modalService.unsubscribe();
    }
  }
}
