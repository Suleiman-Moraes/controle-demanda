import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../pages/shared/services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(
        private authenticationService: AuthenticationService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let currentUser = this.authenticationService.currentUserValue;
        if (currentUser && currentUser.token && !request.url.includes('https://viacep.com.br/ws/')) {
            request = request.clone({
                setHeaders: {
                    'Authorization': 'Bearer ' + currentUser.token
                }
            });
        }
        return next.handle(request);
    }
}