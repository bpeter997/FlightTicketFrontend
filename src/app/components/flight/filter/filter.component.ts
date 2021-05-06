import { Observable } from 'rxjs';
import { AirportService } from './../../../services/airport/airport.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.sass']
})
export class FilterComponent implements OnInit {

  filterFormGroup: FormGroup;

  @Output() queryStringByFilter = new EventEmitter<Array<string>>();

  constructor(private airportService: AirportService) {
    this.filterFormGroup = new FormGroup({
      from: new FormControl(''),
      to: new FormControl(''),
      startDate: new FormControl('')
    });
   }

   queryByFilters() {
    const queryStrings: Array<string> = [];
      
      this.airportService.getAllAirports(['location=' + this.filterFormGroup.controls.from.value]).subscribe((data)=>{
        const airport = data.body.data.airports[0];
        if(airport) {
          queryStrings.push('from=' + airport._id);
        } 

        this.airportService.getAllAirports(['location=' + this.filterFormGroup.controls.to.value]).subscribe((data)=>{
          const airport = data.body.data.airports[0];
          if(airport) {
            queryStrings.push('to=' + airport._id);
          } 
          if(this.filterFormGroup.controls.startDate.value) {
            queryStrings.push('startDate[gte]=' + new Date(this.filterFormGroup.controls.startDate.value).toISOString());
            queryStrings.push('arrivalDate[lt]=' + new Date(new Date(this.filterFormGroup.controls.startDate.value).getTime() + 60 * 60 * 24 * 1000).toISOString());
          }
          
          this.queryStringByFilter.emit(queryStrings)
        })

      })

  }

  ngOnInit(): void {
    this.filterFormGroup.controls.from.value == '';
    this.filterFormGroup.controls.to.value == '';
    this.filterFormGroup.controls.startDate.value == '';
  }

}
