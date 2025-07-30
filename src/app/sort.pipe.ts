import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
 transform(array,orderBy,asc=true){
 console.log(array);
 console.log(asc);
 if (!orderBy || orderBy.trim() == ""){
   return array;
 } 
 let temp = [];
  //ascending
  if (asc){
    // var temp1;
    // for(var i=0;i<array.length;i++){
    //   for(var j=i+1;j<array.length;j++){
    //     if(array[i].name>array[j].name){
    //       temp1=array[i].name;
    //       array[i].name=array[j].name;
    //       array[j].name=temp1;
    //     }
    //   }
      
    // }
   temp = array.sort((item1: any, item2: any) => { 
     let a = item1[orderBy];
     let b = item2[orderBy];
     return this.orderByComparator(a, b);
   });
 }
 else{
   //not asc
   temp = array.sort((item1: any, item2: any) => { 
     let a = item1[orderBy];
     let b = item2[orderBy]; 
     return this.orderByComparator(b, a);
   });
 }
 
   return Array.from(temp);
 
 }
 
  orderByComparator(a:any, b:any):number{
  
  if((isNaN(parseFloat(a)) || !isFinite(a)) || (isNaN(parseFloat(b)) || !isFinite(b))){
    //Isn't a number so lowercase the string to properly compare
    if(a.toLowerCase() < b.toLowerCase()) return -1;
    if(a.toLowerCase() > b.toLowerCase()) return 1;
  }
  else{
    //Parse strings as numbers to compare properly
    if(parseFloat(a) < parseFloat(b)) return -1;
    if(parseFloat(a) > parseFloat(b)) return 1;
  }

  }
}