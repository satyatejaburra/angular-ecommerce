import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {  MatInputModule } from '@angular/material/input';
import {  MatListModule  } from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  imports: [ BrowserAnimationsModule, MatIconModule, MatInputModule, MatListModule,MatDividerModule, MatCardModule , MatButtonModule,MatDialogModule],
  exports: [ BrowserAnimationsModule, MatIconModule, MatInputModule, MatListModule , MatDividerModule, MatCardModule, MatButtonModule,MatDialogModule]
})
export class MaterialModule { }
