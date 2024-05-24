import { CanActivateFn, Router } from '@angular/router';
import { AppStateService } from '../../services/app-state/app-state.service';
import { inject } from '@angular/core';
import { Roles } from '../../../../shared/models/user/user.model';

export const authorizationGuard: CanActivateFn = (route, state) => {
  const appstate = inject(AppStateService)
  const router = inject(Router)
  if(!appstate.authState.roles.includes(Roles.ADMIN)){
    router.navigate(['/admin/not-authorized'])    
    return false;
  }
  return true
};
