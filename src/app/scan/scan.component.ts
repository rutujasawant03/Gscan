import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css']
})
export class ScanComponent  {

  constructor() { }
  public output : any;
  public onError(e:any): void {
    alert(e);
}
  

}
