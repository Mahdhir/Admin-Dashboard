import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'messagefilter'
})
export class MessagefilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) {return [];}
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(it => {
      return ((it.userMail.toLowerCase().includes(searchText))
      || (it.userFullName.toLowerCase().includes(searchText))
      || (it.message.toLowerCase().includes(searchText)));
    });
  }
}
