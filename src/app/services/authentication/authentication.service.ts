import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { User } from "../../models/user";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    if (localStorage.getItem("currentUser")) {
      this.currentUserSubject = new BehaviorSubject<User>(
        User.fromJSON(JSON.parse(localStorage.getItem("currentUser")))
      );
    } else {
      this.currentUserSubject = new BehaviorSubject<User>(undefined);
    }
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http
      .post<any>(`${environment.apiUrl}/session/new`, { email, password })
      .pipe(
        map(res => {
          return this.propagateUserChange(res);
        }),
        catchError(this.handleError)
      );
  }
  newUser(user: User) {
    console.log(user.toJSON());
    return this.http
      .post<any>(`${environment.apiUrl}/user/new`, user.toJSON())
      .pipe(
        map(res => {
          return this.propagateUserChange(res);
        }, catchError(this.handleError))
      );
  }
  updateUser(user: User) {
    console.log(user.toJSON());
    return this.http
      .put<any>(`${environment.apiUrl}/authorized/user`, user.toJSON())
      .pipe(
        map(res => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          return res;
        }),
        catchError(this.handleError)
      );
  }

  propagateUserChange(json: object): User {
    const user = User.fromJSON(json);
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem("currentUser", JSON.stringify(user));
    this.currentUserSubject.next(user);
    return user;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError("Something bad happened; please try again later.");
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
  }
}
