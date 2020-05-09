import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TooltipModule } from '@syncfusion/ej2-angular-popups';


@NgModule({
  imports: [BrowserModule, FormsModule, NgbModule, TooltipModule]

})
export class TooltipBasicModule { }

export class NgbdTooltipBasicModule {}
