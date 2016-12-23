import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Color } from "color";
import { Page } from "ui/page";
import { TextField } from "ui/text-field";
import { View } from "ui/core/view";
import { Button } from "ui/button";

import { User } from "../../shared/user/user";
import { UserService } from "../../shared/user/user.service";
import { setHintColor } from "../../utils/hint-util";

import app = require("application");
import platform = require("platform");

declare var xyz: any;

@Component({
  selector: "my-app",
  providers: [UserService],
  templateUrl: "pages/login/login.html",
  styleUrls: ["pages/login/login-common.css", "pages/login/login.css"],
})
export class LoginComponent implements OnInit {
  user: User;
  isLoggingIn = true;

  @ViewChild("container") container: ElementRef;
  @ViewChild("email") email: ElementRef;
  @ViewChild("password") password: ElementRef;
  @ViewChild("sign") sign: ElementRef;

  constructor(private router: Router, private userService: UserService, private page: Page) {
    this.user = new User();
  }

  ngOnInit() {
    this.page.actionBarHidden = true;
    this.page.backgroundImage = this.page.ios ? "res://bg_login.jpg" : "res://bg_login";
  }

  login() {
    if (app.android) {

      console.log("We are running on Android device!");

      // native android dialog 
      var alert = new android.app.AlertDialog.Builder(app.android.foregroundActivity)
        .setTitle("Native Android Dialog!")
        .setMessage("I'm a native android dialog triggered from Nativescript!!!")
        .show();
    }
  }

  signUp(args: any) {
    if (app.android) {

      console.log("We are running on Android device!");

      let sign = <Button>this.email.nativeElement;

      var mSmallBang = new xyz.hanks.library.SmallBang.attach2Window(app.android.foregroundActivity);
      mSmallBang.bang(sign.android);
    }
  }

  toggleDisplay() {
    this.isLoggingIn = !this.isLoggingIn;
    this.setTextFieldColors();
    let container = <View>this.container.nativeElement;
    container.animate({
      backgroundColor: this.isLoggingIn ? new Color("white") : new Color("#301217"),
      duration: 200
    });
  }

  setTextFieldColors() {
    let emailTextField = <TextField>this.email.nativeElement;
    let passwordTextField = <TextField>this.password.nativeElement;

    let mainTextColor = new Color(this.isLoggingIn ? "black" : "#C4AFB4");
    emailTextField.color = mainTextColor;
    passwordTextField.color = mainTextColor;

    let hintColor = new Color(this.isLoggingIn ? "#ACA6A7" : "#C4AFB4");
    setHintColor({ view: emailTextField, color: hintColor });
    setHintColor({ view: passwordTextField, color: hintColor });
  }
}
