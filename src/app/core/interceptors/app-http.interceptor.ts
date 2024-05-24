import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, finalize, throwError } from 'rxjs';
import { AppStateService } from '../services/app-state/app-state.service';
import { Status } from '../../../shared/models/product/product.model';
import { LoadingService } from '../services/loading/loading.service';

export const appHttpInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = "YOUR_AUTH_TOKEN_HERE";
  const  appState = inject(AppStateService)
  const loadingService = inject(LoadingService);
  
  //Initialise the status
  //appState.setProductState({status: Status.LOADING}) //method 1
  loadingService.showLoadingSpinner();


  //clone the request and add the authorization header
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  })

   // Pass the cloned request with the updated header to the next handler
   return next(authReq).pipe(
    finalize(() => {
      //appState.setProductState({status: Status.SUCCESS})
      loadingService.hideLoadingSpinner();
    }),
    catchError((error: HttpErrorResponse) => {
      appState.setProductState({status: Status.ERROR, errorMessage: error.message})
      console.error('Error:', error);
      return throwError(()=> error);
    })
  );
};
