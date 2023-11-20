import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot | null = null, state: RouterStateSnapshot | null = null) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') == 'true';

  if (!isLoggedIn) {
    // Redirect to the login page
    window.alert('You must be logged in to access this page!');
    return false;
  }

  return true;
};