import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HTTP_INTERCEPTORS
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { delay, dematerialize, materialize, mergeMap } from "rxjs/operators";
import { User } from "../models/user";

const users: User[] = [
  User.fromForm({
    id: 1,
    password: "testtest",
    firstName: "Ryan",
    lastName: "Williamson",
    email: "ryan@transity.io",
    phoneNumber: "614-111-0000"
  }),
  User.fromForm({
    id: 2,
    password: "testtest",
    firstName: "Andrew",
    lastName: "Fu",
    email: "andrew@transity.io",
    phoneNumber: "614-111-0000"
  }),
  User.fromForm({
    id: 3,
    password: "testtest",
    firstName: "Bobby",
    lastName: "Yost",
    email: "bobby@transity.io",
    phoneNumber: "614-111-0000"
  }),
  User.fromForm({
    id: 4,
    password: "testtest",
    firstName: "Gus",
    lastName: "Workman",
    email: "gus@transity.io",
    phoneNumber: "614-111-0000"
  }),
  User.fromForm({
    id: 5,
    password: "testtest",
    firstName: "Tony",
    lastName: "Fontana",
    email: "tony@transity.io",
    phoneNumber: "614-111-0000"
  })
];

// const users: User[] = [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;
    // wrap in delayed observable to simulate server api call
    return (
      of(null)
        .pipe(mergeMap(handleRoute))
        .pipe(materialize()) // call materialize and dematerialize to ensure delay even
        // if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .pipe(delay(500))
        .pipe(dematerialize())
    );

    function handleRoute() {
      switch (true) {
        case url.endsWith("/session/new") && method === "POST":
          return authenticate();
        case url.endsWith("/session/new") && method === "POST":
          return authenticate();
        case url.endsWith("/authorized/user") && method === "PUT":
          return getUsers();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions
    function update() {
      return ok(body);
    }
    function authenticate() {
      console.log("auth");
      const { email, password } = body;
      const user = users.find(
        x => x.email === email && x.password === password
      );
      if (!user) {
        return error("Username or password is incorrect");
      }
      return ok({
        ID: user.ID,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        token: "fake-jwt-token"
      });
    }

    function getUsers() {
      if (!isLoggedIn()) {
        return unauthorized();
      }
      return ok(users);
    }

    // helper functions

    function ok(body?) {
      return of(new HttpResponse({ status: 200, body }));
    }

    function error(message) {
      return throwError({ error: { message } });
    }

    function unauthorized() {
      return throwError({ status: 401, error: { message: "Unauthorised" } });
    }

    function isLoggedIn() {
      return headers.get("Authorization") === "Bearer fake-jwt-token";
    }
  }
}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
