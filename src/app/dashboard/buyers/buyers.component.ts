import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import * as $ from 'jquery';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-buyers',
  templateUrl: './buyers.component.html',
  styleUrls: ['./buyers.component.css']
})
export class BuyersComponent implements OnInit {

  users: any = [];
  searchText = null ;
  constructor(
    private userService: UserService,
    private authservice:AuthService
    ) { }

  ngOnInit() {
    this.loadData();
      $(document).ready(function() {
      $('.filterable .btn-filter').click(function() {
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
