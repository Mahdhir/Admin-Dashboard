import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderfilter'
})
export class OrderfilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) {return [];}
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(it => {
      return(it.buyerEmail.toLowerCase().includes(searchText));
   
      
    });
  }

}
