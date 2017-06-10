import {Component, Inject} from "@angular/core";
import { DOCUMENT } from '@angular/platform-browser';
import {CookieService} from "angular2-cookie/core";
import {UserService} from "../user.service";
import {isNullOrUndefined} from "util";
import {isNull} from "util";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private newUser: boolean = false;

  private username:string;
  private password:string;
  private phonenumber:string;

  constructor(@Inject(DOCUMENT) private document: any, private cookieService:CookieService, private userService: UserService) {
    if(this.hasToken())
    {
      userService.setCode("" + this.cookieService.get("token"));
      userService.isLoggedIn = true;
    }
    let location = this.document.location.href;
    if(location.indexOf("code=") != -1)
    {
      userService.setCode(location.substr(location.indexOf("code=") + "code=".length));
      this.cookieService.put("token", userService.code);
      this.document.location.href = "https://wunderbaren.se";
    }
  }

  public isValid():boolean
  {
    let username = !isNullOrUndefined(this.username) && this.username.length > 3;
    let password = !isNullOrUndefined(this.password) && this.password.length > 4;
    let phonenumber = !isNullOrUndefined(this.phonenumber) && this.phonenumber.length > 9;
    return username && password && (phonenumber || !this.newUser);
  }

  public hasToken():boolean
  {
    let token = this.cookieService.get("token");
    return token && token.length > 0;
  }
}
