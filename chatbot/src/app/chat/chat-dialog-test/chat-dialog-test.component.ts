
import { Component, OnInit } from '@angular/core';
import { ChatService, Message } from '../chat.service';
import { Observable } from 'rxjs'
import { Content } from '@angular/compiler/src/render3/r3_ast';
//import 'rxjs/add/operator/scan';
import { finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { concatMap, delay, mergeMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ValidationService } from '../validation.service';
import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';
import *  as  data from '../country.json';

@Component({
  selector: 'app-chat-dialog-test',
  templateUrl: './chat-dialog-test.component.html',
  styleUrls: ['./chat-dialog-test.scss', './chat-dialog-test.component.css', './new-loader.scss']
})
export class ChatDialogTestComponent implements OnInit {
  //country code fields-start

  coutry_codes: any[];
  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
  //country code fields-end

  call_phone_content: boolean = false;  //call phone cantent after 15 second
  call_name_replacement_text: boolean = false;
  close_component: boolean = false;
  timeout: boolean = false;
  back_button_no: any;
  phone_no: boolean = false;
  email: boolean = false;
  error_msg: any;
  count: any = 1;
  button_choose: boolean = false;
  chatSubmit: FormGroup;
  main_expression: any = './assets/images/techbot.png';
  no_of_bullet_button: any = 0;
  email_provide: any =
    [
      {
        "text": "",
        "button": "yes",
        "quick_replies": [
          {
            "title": "Quick Reply Button Name",
            "block_names":
              "I am not comfortable"

          }
        ]
      }
    ];
    json1: any = [
      {
        "text": "Which service do you want to check out?",
        "first": "yes",
        "carousel": "yes",
        "quick_replies": [
          {
            "title": "Quick Reply Button Name",
            "block_names":
              "Digital Transformation"
  
          },
          {
            "title": "Quick Reply Button Name",
            "block_names":
              "Customer Experience"
  
          },
          {
            "title": "Quick Reply Button Name",
            "block_names":
              "UX/UI"
  
          },
          {
            "title": "Quick Reply Button Name",
            "block_names":
              "Content Strategy"
            },
            {
              "title": "Quick Reply Button Name",
              "block_names":
                "AI Chatbot"
              },
              {
                "title": "Quick Reply Button Name",
                "block_names":
                  "Data Analysis"
                }
        ]
      }
    ];

   //quick_replies_msg["image"]="https://www.techved.com/resources/images/mecklai-our-work.png";
    //quick_replies_msg["block_url"]=test;
  lead_geration: {
    content: any;
    sentBy: any, array: any, component_type: any
  }[] = [];
  messages: {
    content: any;
    sentBy: any, array: any, component_type: any
  }[] = [];
  messages1: {
    content: any;
    sentBy: any, array: any, component_type: any
  }[] = [{
    content: "Hi there🖐️! Thank you for visiting .",
    sentBy: "bot", array: '', component_type: ''
  }];
  formValue: string = '';
  slides = [
    { img: "../assets/images/slick-icon-1.jpg", info: "Build an amazing website or mobile app" },
    { img: "../assets/images/slick-icon-2.svg", info: "Enhance the UX of my digital assets" },
    { img: "../assets/images/slick-icon-3.svg", info: "Tell me how users behave on my product" },
    { img: "../assets/images/slick-icon-4.svg", info: "I’ll help deliver a superior customer experience" },
    { img: "../assets/images/slick-icon-5.svg", info: "I’ll digitally transform the entire product experience" }
  ];
  slideConfig = {
    slidesToShow: 2.57,
    focusOnSelect: true,
    dots: false,
    infinite: false,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: true,
          slidesToShow: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: true,
          slidesToShow: 1
        }
      }
    ]
  };

  constructor(public chat: ChatService, private formBuilder: FormBuilder, public Validation: ValidationService) { }

  ngOnInit() {
    this.coutry_codes = data['default'];
    this.chatSubmit = this.formBuilder.group({
      normal: [''],
      phone: [''],
      email1: [''],
      country_code: ['+91']
    });
    this.initialize_massages();
    this.chat.conversation.asObservable().subscribe(data => {

      if (data[0] && data[0]['sentBy'] == "user") {
        this.timeout = true;
        this.messages.push(data[0]);
        localStorage.setItem('messages', JSON.stringify(this.messages));
      }
    }
    );


    this.chat.conversation.asObservable().pipe(
      concatMap(item => of(item).pipe(delay(4000)))
    ).subscribe(data => {
     console.log("check this");
     console.log(data);
      this.main_expression = './assets/images/techbot.png'
      if (data[0] && data[0]['sentBy'] == "bot") {
        //alert("Sent by bot");
        this.button_choose = false;
        this.phone_no = false;
        this.email = false;
        this.timeout = true;
        this.chatSubmit.controls.phone.setValidators(null);
        this.chatSubmit.controls.phone.updateValueAndValidity();
        this.chatSubmit.controls.email1.setValidators(null);
        this.chatSubmit.controls.email1.updateValueAndValidity();
        setTimeout(() => {
          this.timeout = false;
        //  if (data[0]['array']) {
          //by subhajit saha
          if (data[0]['content']) {
            //alert("yes data['content']");
            //this.main_expression='./assets/images/blink.gif'
            this.call_name_replacement_text = true;
            this.messages.push(data[0]);
            console.log("=====arrays====");
            console.log("Content Messages",this.messages);
            localStorage.setItem('messages', JSON.stringify(this.messages));

            //this.callWithoutNameGivenContent();
          }
          if (data[0]['array']) {
            this.button_choose = true;
            //alert("yes data['array']");
            this.button_choose = true;
            //if (data[0]['array'][0]['quick_replies']) {
              if (data[0]['array']['quick_replies']) {
              //alert("Yess");
              if (data[0]['array']['quick_replies'].length) {
                this.no_of_bullet_button = data[0]['array']['quick_replies'].length;
                // console.log(data[0]['array'][0]['quick_replies'].length, "lenght")
              }
              else {
                this.no_of_bullet_button = 0;
              }
            }
          }
          /*if (data[0]['content'] == 'I almost forgot, what should I call you?') {
            //this.main_expression='./assets/images/blink.gif'
            this.call_name_replacement_text = true;
            this.callWithoutNameGivenContent();
          }

          if (data[0]['content'] == 'Let’s take this conversation on a call?' || data[0]['content'] == 'phone_number') {
            this.phone_no = true;
            this.call_phone_content = true;
            this.callWithoutClickContent();
            this.chatSubmit.controls.phone.setValidators([Validators.required, Validators.pattern(this.Validation.Phone)]);
            this.chatSubmit.controls.phone.updateValueAndValidity();
          }
          if (data[0]['content'] == 'Can I get your email ID?' || data[0]['content'] == 'email_id') {
            this.email = true;
            this.chatSubmit.controls.email1.setValidators([Validators.required, Validators.pattern(this.Validation.Email)]);
            this.chatSubmit.controls.email1.updateValueAndValidity();
          }*/
          var msgarray = [];  //new line
          msgarray = data[0]['array'];  //new line

          if(data[0]['array'] && msgarray.length >0) // working
          this.messages.push(data[0]);
          console.log("=====arrays====");
          console.log("Messages",this.messages);
          localStorage.setItem('messages', JSON.stringify(this.messages));
        }
          , 2000);
      }
      //console.log(data)
    });
  }
  callWithoutNameGivenContent() {
    setTimeout(() => {
      if (this.call_name_replacement_text) {
        //console.log("call this");
        this.messages.push({
          content: "Trust me i'll not share your name with anyone.",
          sentBy: "bot", array: '', component_type: ''
        });
        this.messages.push({
          content: "what should I call you?",
          sentBy: "bot", array: '', component_type: ''
        });
        this.call_name_replacement_text = false;
      }
    }
      , 2000);

  }
  callWithoutClickContent() {
    setTimeout(() => {
      if (this.call_phone_content) {
        this.messages.push({
          content: " Don't worry we will not spam you... You can trust us!",
          sentBy: "bot", array: '', component_type: ''
        });
        this.messages.push({
          content: "Your number please?",
          sentBy: "bot", array: '', component_type: ''
        });

        //console.log("call this");


        //      setTimeout(()=>{
        //    if(this.call_phone_content)
        //    {
        //  this.messages.push({content:"",
        //     sentBy:"bot",array:this.email_provide,component_type:'button'});
        //    }
        //    this.call_phone_content=false;
        //      }
        //    ,25000);


      }
    }
      , 2000);

  }
  changePreferredCountries() {
    this.preferredCountries = [CountryISO.India, CountryISO.Canada];
  }
  back_button_new(i) {
    for (var i1 = i - 1; i1 > 0; i1--) {
      if (this.messages[i1].sentBy == 'user') {

        var a = this.messages[i1].content;
        this.messages = this.messages.splice(0, i1);
        this.chat.converse(a);
        break;
      }
    }
  }
  close() {
    this.close_component = true;
    this.chat.clear_msg();
  }
  initialize_massages() {
    this.count = 1;
    this.back_button_no = 0;
    localStorage.setItem('messages', null);
    //this.messages1=[];
    //this.messages=[];
    this.button_choose = true;
    //console.log(this.messages, "kkkkk", this.messages1)
    this.messages1 = [{
      content: "Thanks for checking out I want UX/UI services for my website. What brings you here today?👇",
      sentBy: "bot", array: '', component_type: ''
    }];
    this.messages = [{
      content: "Hi I am Techbot! 👋",
      sentBy: "bot", array: '', component_type: ''
    }];
    this.messages1.push({
      content: "test",
      sentBy: "bot", array: this.json1, component_type: 'button'
    });
    // console.log(this.messages1.length, "lenght"corosel)
    if (this.messages1.length == 2) {
      var id = setInterval(() => {
        this.timeout = true;
        this.push_data(this.messages1[this.count]);
        if (this.count === 1) {
          this.timeout = false;
          // console.log(id, "id")
          clearInterval(id);
          this.messages1 = [];
        }
        this.count++;
      }, 5000);

    }
  }
  push_data(data) {
    this.messages.push(data)
    console.log(data, "element")
  }
  external_link() {

  }
  callLink(value, i, title) {

    // console.log("hi", value, i, title);
    this.messages.splice(i, 1);
    if (title) {
      this.messages.push({
        content: title,
        sentBy: "bot", array: '', component_type: ''
      });
    }
    this.back_button_no = i;
    // console.log(this.back_button_no, "back button")
    this.chat.converse(value);
    localStorage.setItem('messages', JSON.stringify(this.messages));

  }
  sendMessage() {
    this.call_phone_content = false;
    this.call_name_replacement_text = false;
    // console.log(this.chatSubmit.value, "value out", this.chatSubmit.valid)
    if ((this.chatSubmit.value.normal && !this.phone_no) || (this.chatSubmit.value.phone && this.phone_no) || (this.chatSubmit.value.email1 && this.email)) {
      this.back_button_no = this.messages.length;
      if (this.chatSubmit.value.normal && !this.phone_no) {

        this.chatSubmit.get('phone').setValue(null);
        this.chatSubmit.get('email1').setValue(null);
        this.chat.converse(this.chatSubmit.value.normal);
      }
      if (this.chatSubmit.value.phone && this.phone_no) {

        this.chatSubmit.get('email1').setValue(null);
        this.chatSubmit.get('normal').setValue(null);
        var phone_no = this.chatSubmit.value.country_code + this.chatSubmit.value.phone
        // console.log(phone_no, "value phone")
        this.chat.converse(phone_no);
      }
      if (this.chatSubmit.value.email1 && this.email) {
        this.chatSubmit.get('phone').setValue(null);
        this.chatSubmit.get('normal').setValue(null);
        // console.log(this.chatSubmit.value, "value email")
        this.chat.converse(this.chatSubmit.value.email1);
        this.lead_geration = this.filterData('user');
        this.chat.AddLead(this.lead_geration);
        // console.log(this.lead_geration, "lead")
      }

      this.chatSubmit.get('phone').setValue(null);
      this.chatSubmit.get('email1').setValue(null);
      this.chatSubmit.get('normal').setValue(null);
      // console.log(this.messages.length, this.back_button_no)
      //this.formValue = '';
      localStorage.setItem('messages', JSON.stringify(this.messages));
      this.error_msg = '';
      this.phone_no = false;
      this.email = false;
    }
    else {
      this.error_msg = 'invalid Data';
    }
  }
  back_message() {

    if (this.messages.length > 3) {
      var a = this.messages[this.messages.length - 3].content;
      this.messages.splice((this.messages.length - 3), (this.messages.length - 1));
      this.chat.converse(a);
    }
  }
  cheking(event) {
    // this.formValue

    if (event.target.checked == true && !(this.formValue).includes(event.target.value)) {
      this.formValue = this.formValue + " " + event.target.value;
    }
    if (event.target.checked == false && (this.formValue).includes(event.target.value)) {
      this.formValue = (this.formValue).replace(event.target.value, "")
    }
  }
  clear_conversation() {
    this.messages = null;
    this.initialize_massages();
    localStorage.setItem('messages', JSON.stringify(this.messages));
  }
  filterData(sentBy) {
    return this.messages.filter(object => {
      return object['sentBy'] == sentBy;
    });
  }

}
