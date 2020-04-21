import { Component, OnInit } from '@angular/core';
import { ElasticsearchService } from '../../services/elastic-search.service';
import { ProductService } from '../../services/product.service';
import { Product } from 'src/app/common/product';



@Component({
  selector: 'app-elastic-search',
  templateUrl: './elastic-search.component.html',
  styleUrls: ['./elastic-search.component.css']
})
export class ElasticSearchComponent implements OnInit {
  private static readonly INDEX = 'test';
private static readonly TYPE = 'doc';

products: Product[];
private queryText = '';

private lastKeypress = 0;

constructor(private es: ElasticsearchService) {
  this.queryText = '';
}

ngOnInit() {

}

doSearch($event) {
  if ($event.timeStamp - this.lastKeypress > 100) {
    this.queryText = $event.target.value;

    this.es.fullTextSearch(
      ElasticSearchComponent.INDEX,
      ElasticSearchComponent.TYPE,
      'name', this.queryText).then(
      response => {
        this.products = response.hits.hits;
        console.log(response);
      }, error => {
        console.error(error);
      }).then(() => {
        console.log('Search Completed!');
      });
  }

  this.lastKeypress = $event.timeStamp;
}

}
