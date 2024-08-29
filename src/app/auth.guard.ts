import { CanActivateFn } from '@angular/router';
import { privateDecrypt } from 'crypto';

export const authGuard: CanActivateFn = (route, state) => {
  let token;
  if (typeof window !== 'undefined' && localStorage) {
    token = localStorage.getItem('token');
  }
  if (token) {
    return true;
  } else {
    return false;
  }

};
