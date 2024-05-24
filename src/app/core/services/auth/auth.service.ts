import { AppStateService } from './../app-state/app-state.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { User } from '../../../../shared/models/user/user.model';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = `http://localhost:3000/users`;

  constructor(private http: HttpClient, private appState: AppStateService) { }

  async login(username: string, password: string){
    const { token, password: pass } =  await firstValueFrom(this.http.get<User>(`${this.url}/${username}`))
    // Never do not do that in front-end (just for training)
    if(password === atob  (pass)){
      const decodedJwt: any = jwtDecode(token);
      
      this.appState.setAuthState({
        username: decodedJwt.sub,
        roles: decodedJwt.roles,
        isAuthenticated: true,
        token
      })
      return Promise.resolve(true);
    }
    return Promise.reject("Bad credentials")
  }
}
