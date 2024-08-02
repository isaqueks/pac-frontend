import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/env';

@Injectable()
export class HttpHandlerInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
     // Get the auth token from the service.
     const authToken = localStorage.getItem('token');

     // Clone the request and replace the original headers with
     // cloned headers, updated with the authorization.
     const authReq = request.clone({
       headers: authToken ? request.headers.set('Authorization', 'Bearer '+authToken) : request.headers,
       url: `${environment.API_BASE_URL}${request.url}`
     });
 
     // send cloned request with header to the next handler.
     return next.handle(authReq);
  }
}
