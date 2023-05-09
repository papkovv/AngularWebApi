import {Component, Input, OnInit} from '@angular/core';
import {SharedService} from "../shared.service";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit{
  captcha: string;

  @Input() form:any;
  contactId: number;
  contactName:string;
  contactEmail:string;
  contactPhone: string;
  messageId: number;
  messageObject:string;
  themeId: number;
  themeObject: string;
  edited: boolean;
  check: boolean;

  constructor(private service:SharedService) {
    this.captcha = "";
    this.contactId = 0;
    this.contactName = "";
    this.contactEmail = "";
    this.contactPhone = "";
    this.messageId = 0;
    this.messageObject = "";
    this.themeId = 1;
    this.themeObject = "";
    this.edited = false;
    this.check = true;
  }

  ngOnInit(): void {
    this.contactId=this.form.contactId;
    this.contactName=this.form.contactName;
    this.contactEmail=this.form.contactEmail;
    this.contactPhone=this.form.contactPhone;
    this.messageId=this.form.messageId;
    this.messageObject=this.form.messageObject;
    this.themeId=this.form.themeId;
  }

  resolved(captchaResponse: string) {
    this.captcha = captchaResponse;
  }

  addForm() {
    var val = {
      contactId: this.contactId,
      contactName: this.contactName,
      contactEmail: this.contactEmail,
      contactPhone: this.contactPhone,
      themeId: this.themeId,
      messageId: this.messageId,
      messageObject: this.messageObject,
    };
    //console.log(val);
    if (val.contactName == "" || val.contactEmail == "" || val.contactPhone == "" || val.messageObject == "" || val.contactPhone.toString().length != 10) {
      this.check = false;
    } else {
      this.check = true;
      this.service.addForm(val).subscribe(res => {
        alert(res.toString());
      });

      this.service.addForm(val).subscribe(data => {
        this.form = data;

        this.contactName = this.form.contactName;
        this.contactEmail = this.form.contactEmail;
        this.contactPhone = this.form.contactPhone;
        this.themeId = this.form.themeId;
        this.messageObject = this.form.messageObject;
        switch (this.themeId) {
          case 1: {
            this.themeObject = "Техподдержка";
            break;
          }
          case 2: {
            this.themeObject = "Продажи";
            break;
          }
          case 3: {
            this.themeObject = "Контакты";
            break;
          }
          case 4: {
            this.themeObject = "Другое";
            break;
          }
          default: {
            break;
          }
        }

        this.edited = true;
        //console.log(this.form);
      })
    }
  }
}
