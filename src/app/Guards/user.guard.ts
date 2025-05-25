import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

export const userGuard: CanActivateFn = (route, state) => {
  const userservice = inject(AuthService); //to inject the authservice beacuse it is function not class so i do not have constructor to inject the service direct
  

  const token = userservice.getToken(); 

  if (token) {
    return true;
  } else {
    alert('Please sign in first');
    return false;
  }
};
