import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  public model: any;

  doSearch(theKeyword:string)
  {
console.log(theKeyword);
this.router.navigateByUrl(`/search/${theKeyword}`);
  }

}
