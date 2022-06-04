import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Observable,of } from 'rxjs';
import { User, Response, LoginResponse } from './types';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})


export class UserService {

  constructor(
    private http:HttpClient,
    private cookie:CookieService
  ) { }

  //* error handlers
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      
  
      // TODO: better job of transforming error for user consumption
       console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  loggedIn:boolean=false

  toggleLogin():void {
    this.cookie.set('LOGGED_IN','TRUE')
  }
  

  signUp(user:User):Observable<Response>{
    return this.http.post<Response>('https://note-xyz.herokuapp.com/api/v1/user/',user)
    .pipe(
      tap(
        {
          error:(error)=>console.log(error)
        }
      )
    )
  }

  login(user:User):Observable<any>{
    return this.http.post<any>('https://note-xyz.herokuapp.com/api/v1/user/login/v2',user,{observe: "response",withCredentials:true})
    .pipe(
      tap(
        {
          error:(error)=>console.log(error)
        }
      )
    )
  }


//   signUp(user:any):Observable<any>{
//     return this.http.post<Response>('https://note-xyz.herokuapp.com/api/v1/user/',user)
//     .pipe(
//       tap( // Log the result or error
//       {
//         next: (data) => console.log(data),
//         error: (error) => console.log(error)
//       }
//       )
//     );
//  }

}
