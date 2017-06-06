import {Injectable} from "@angular/core";

@Injectable()
export class UserService
{
  public isLoggedIn: boolean = false;
  public requestLogin: boolean = false;
  public code: string;
}
