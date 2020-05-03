import { Component } from '@angular/core';
import { User } from './common/user';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from './components/modal/modal.component';
import { OrderService } from './services/order.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'angular-ecommerce';
  currentUser: User;
  public msg: Subject<any> = new Subject();
  public msgArray: Observable<Array<any>> = new Observable<Array<any>>();

  constructor(
        private router: Router,private orderService:OrderService,
        private authenticationService: AuthenticationService  ,public matDialog: MatDialog  ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
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
      this.orderService.getMyOrders("satyateja100")
    }


    public onChange(target: any) {
      this.msg.next(target.value);
      target.value = '';
    }

    public onMsgReceive(msg: string) { }
}
