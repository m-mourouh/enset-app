import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AppStateService } from '../../services/app-state/app-state.service';

export const authentificationGuard: CanActivateFn = (route, state) => {
  const appstate = inject(AppStateService)
  const router = inject(Router)
  if(!appstate.authState.isAuthenticated){
    router.navigate(['/login'])    
    return false;
  }
  return true
};
