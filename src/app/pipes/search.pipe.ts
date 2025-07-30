import {Pipe} from '@angular/core';

@Pipe({
  name: 'Search'
})

export class SearchPipe {


 transform (value, queryString) {
    if (value==null) {
      return null;
    }
    if (value=="") {
      return null;
    }

    if(queryString !== undefined){
        return   value.filter(item=>item.employee_fname.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
    }else{
        return value;
    }
  }
}