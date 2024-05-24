import { Router } from '@angular/router';
import { AppStateService } from './../../services/app-state/app-state.service';
import { AuthService } from './../../services/auth/auth.service';
import { Component } from '@angular/core';
import { Roles } from '../../../../shared/models/user/user.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

  constructor(public  appStateService: AppStateService, private router: Router){}

  logout(){
      this.appStateService.resetAuthState()
      this.router.navigate(['/login'])
  }

  get isAdmin(){
    return this.appStateService.authState.roles.includes(Roles.ADMIN)
  }
}
