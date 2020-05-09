import { Component } from '@angular/core';
import { User } from './common/user';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from './components/modal/modal.component';
import { OrderService } from './services/order.service';
import { OktaAuthService } from '@okta/okta-angular';

import { ViewChild, ViewChildren } from '@angular/core';
import { TooltipComponent, Position } from '@syncfusion/ej2-angular-popups';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChatDialogComponent } from './components/chat-dialog/chat-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'angular-ecommerce';
  currentUser: string;
  public msg: Subject<any> = new Subject();
  public msgArray: Observable<Array<any>> = new Observable<Array<any>>();
  @ViewChild('tooltip')
  public control: TooltipComponent;

  public isCollapsed = true;
  public chatComponent:ChatDialogComponent;


  constructor(
        private router: Router,private orderService:OrderService,
        private authenticationService: AuthenticationService  ,public matDialog: MatDialog,
        private modalService: NgbModal,
        public oktaAuth: OktaAuthService  ) {

    }


    isAuthenticated: boolean;

    async ngOnInit() {
      this.isAuthenticated = await this.oktaAuth.isAuthenticated();
      this.authenticationService.isAuthenticated=this.isAuthenticated

      this.oktaAuth.$authenticationState.subscribe(
        (isAuthenticated: boolean)  =>
        {this.isAuthenticated = isAuthenticated
          this.authenticationService.isAuthenticated=this.isAuthenticated

        }
      );
      const userClaims = await this.oktaAuth.getUser();
    // user name is exposed directly as property
    this.currentUser = userClaims.name.split(" ",1)[0];
    }
    openModal() {
      const dialogConfig = new MatDialogConfig();
      // The user can't close the dialog by clicking outside its body
      dialogConfig.disableClose = true;
      dialogConfig.id = "modal-component";
      dialogConfig.height = "350px";
      dialogConfig.width = "300px";

      const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }

    login()
    {
      this.router.navigateByUrl(`login`);
    }

    getMyOrders()
    {
      console.log("my orders")
      this.orderService.getMyOrders("satyateja100")
    }


    public onChange(target: any) {
      this.msg.next(target.value);
      target.value = '';
    }

    public created() {
      if (document.getElementById('right-pane')) {
          document.getElementById('right-pane').addEventListener('click', this.onClick.bind(this));
          document.getElementById('right-pane').addEventListener('scroll', this.onScroll.bind(this));
      }
  }

  public onClick(args: any) {
      if (args && !args.target.parentNode.parentNode.classList.contains('e-tooltip')) {
          if (this.control && document.getElementsByClassName('e-tooltip-wrap').length > 0) {
              this.control.close();
          }
      }
  }

  public onScroll() {
      if (document.getElementsByClassName('e-tooltip-wrap').length > 0) {
          this.control.close();
      }
  }

    public onMsgReceive(msg: string) { }

    openScrollableContent(longContent) {
      this.modalService.open(longContent, { scrollable: true });
    }
}
