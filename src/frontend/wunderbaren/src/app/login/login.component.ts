import {Component, Inject} from "@angular/core";
import { DOCUMENT } from '@angular/platform-browser';
import {CookieService} from "angular2-cookie/core";
import {UserService} from "../user.service";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private newUser: boolean = false;

  constructor(@Inject(DOCUMENT) private document: any, private cookieService:CookieService, private userService: UserService) {
    if(this.hasToken())
    {
      userService.code = "" + this.cookieService.get("token");
      userService.isLoggedIn = true;
    }
    let location = this.document.location.href;
    if(location.indexOf("code=") != -1)
    {
      userService.code = location.substr(location.indexOf("code=") + "code=".length);
      this.cookieService.put("token", userService.code);
      this.document.location.href = "https://wunderbaren.se";
    }
  }

  public hasToken():boolean
  {
    let token = this.cookieService.get("token");
    return token && token.length > 0;
  }
}
