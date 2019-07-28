import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(it => {
      return ((it.product_name .toLowerCase().includes(searchText)) || (it.category.toLowerCase().includes(searchText))
       || (it.sub_category.toLowerCase().includes(searchText)));
    });
  }
}