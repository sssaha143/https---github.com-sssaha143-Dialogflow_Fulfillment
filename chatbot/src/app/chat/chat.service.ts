import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

//import { ApiAiClient } from 'api-ai-javascript';
import { ApiAiClient } from 'api-ai-javascript/es6/ApiAiClient'
import { Observable, empty } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

// Message class for displaying messages in the component
export class Message {
  constructor(public content: string, public sentBy: string, public array: any, public component_type: any) { }
}

@Injectable()
export class ChatService  implements OnInit {
  booksRef: AngularFireList<any>;
  bookRef: AngularFireObject<any>;

  readonly token = environment.dialogflow.angularBot;
  readonly client = new ApiAiClient({ accessToken: this.token });

  conversation = new BehaviorSubject<Message[]>([]);
  message_empty: {
    content: any;
    sentBy: any, array: any, component_type: any
  }[] = [];
  newmsgs: any[]=[];
  jsonObj: any[]=[];
  quick_replies_msg = {};
  qrmsgs: any[]=[];

  quick_replies: [];

  json1: any = [
    {
      "text": "",
      "first": "yes",
      "carousel": "yes",
      "quick_replies": [
        {
          "title": "Quick Reply Button Name",
          "block_names":
            "I want to know what Techved has to offer"

        },
        {
          "title": "Quick Reply Button Name",
          "block_names":
            "Just browsing"

        }
      ]
    }
  ];



  constructor(private httpService: HttpClient, private db: AngularFireDatabase) { }
  ngOnInit() {
   // this.msgs=[];
   this.newmsgs = [];
    this.jsonObj["text"]="";
    this.jsonObj["first"]="yes";
    this.jsonObj["button"]="yes";
    //alert("Hi");
    //alert(JSON.stringify(this.jsonObj));
  }
  // Sends and receives messages via DialogFlow
  getCountryCode(): Observable<any[]> {
    return this.httpService.get<any[]>('./country.json');
  }

  converse(msg: string) {
    const userMessage = new Message(msg, 'user', '', '');
    this.update(userMessage);

   /*   return this.client.textRequest(msg)
      .then(res => {
        var fulfill = '';
        const speech = res.result.fulfillment.speech;
        var botMessage: any = '';
        if (res.result.fulfillment.messages[0].payload) {
          fulfill = res.result.fulfillment.messages[0].payload.messages;
        }

        res.result.fulfillment.messages.forEach(element => {
          if (element.speech) {
            botMessage = new Message(element.speech, 'bot', "", '');
          }
          if (element.payload) {
            fulfill = element.payload.messages;
            // console.log(fulfill[0]['component_type'],"filfill");
            botMessage = new Message("", 'bot', fulfill, fulfill[0]['component_type']);
          }
          this.update(botMessage);
        }
        );


      });  */
      const data = {
        message: msg
      };
     // alert(msg);

    /*   this.httpService.post<any>("http://localhost:3000/chatbot", data).subscribe(
        article => {
          console.log(article);
          alert(JSON.stringify(article));

        }
    ); */

    return this.httpService.post<any>("http://localhost:3001/chatbot", data).toPromise().then(res => {
      var fulfill = '';
     // const speech = res.result.fulfillment.speech;
     console.log("++++++++++++");
     console.log("Bot Response",res);
      var botMessage: any = '';
      var botMessageText: any = '';
      var fultext: any = '';
      var botMessageList: any = '';
      /* if (res.result.fulfillment.messages[0].payload) {
        fulfill = res.result.fulfillment.messages[0].payload.messages;
      } */
      //var quick_replies_msg = {};
      var qrmsgs: any=[];
      var qrmsgs1: any=[];
      var qrmsgsurl: any=[];
     // var jsonObj: any = [];
     // {
        // "text": "",
        // "first": "yes",
        // "button": "yes"
    //  };
      // jsonObj["text"]="";
      // jsonObj["first"]="yes";
      // jsonObj["button"]="yes";
     // alert("Hi");
     // alert(JSON.stringify(this.jsonObj));
      //this.quick_replies_msg =[];
      this.newmsgs=[];
      //var qrmsgs: any[]=[];

      res.message.fulfillmentMessages.forEach(element => {
        //console.log(element);
        if (element.message === "text") {
          //console.log(element);
          //console.log("Text Message",element.text.text);
          //botMessage = new Message(element.simpleResponses.simpleResponses[0].textToSpeech, 'bot', "", '');
          fultext =element.text.text; //element.simpleResponses.simpleResponses[0].textToSpeech;
          console.log("Text Message",fultext);
          botMessageText = new Message(fultext,'bot',"",'');
          this.update(botMessageText);
        }

        // Changes by Subhajit Saha
        if (element.message === "payload") {
          let fulfill = element.payload.fields.richContent.listValue.values[0].listValue.values[0].structValue.fields;
          console.log("button extend",fulfill);
          let list_item = element.payload.fields.richContent.listValue.values[0].listValue.values[0].structValue.fields.type.stringValue;
          if (list_item === "list" ){
            let fulfillLst = element.payload.fields.richContent.listValue.values[0].listValue.values;
            fulfillLst.forEach(function (arrayItem){
              var lst = {};
              lst["list"] = arrayItem.structValue.fields.title.stringValue;
              qrmsgsurl.push(lst);
              console.log("List",lst);

            })
            var jsonObjlst = [
              {
                "text": "",
                "first": "yes",
                "label": "Demo",
                "button": "no",
                "listing": qrmsgsurl
              }];
            
            console.log("jsoncrl1",jsonObjlst);
          botMessage = new Message("", 'bot',jsonObjlst,'button');
          this.update(botMessage);
          }
          if (element.payload.fields.richContent.listValue.values[0].listValue.values[0].structValue.fields.image ){
            console.log("corosel",element.payload.fields.richContent.listValue.values[0].listValue.values);
            let fulfillcrl = element.payload.fields.richContent.listValue.values[0].listValue.values;
            fulfillcrl.forEach(function (arrayItem){
              var corousel = {};
              corousel["image"] = arrayItem.structValue.fields.image.structValue.fields.src.structValue.fields.rawUrl.stringValue;
              corousel["title"] = arrayItem.structValue.fields.title.stringValue;
              corousel["url"] = arrayItem.structValue.fields.actionLink.stringValue;
              qrmsgsurl.push(corousel);
              console.log("corouselImg",corousel);

            });
            
            var quick_replies_img = {};
            quick_replies_img["block_url"] = qrmsgsurl;
            quick_replies_img["button_corosel"] = "no"; 
            qrmsgs1.push(quick_replies_img);
            console.log("quick_replies_img",quick_replies_img);
            var jsonObjCrl = [
              {
                "text": "",
                "first": "yes",
                "carousel": "yes",
                "quick_replies": qrmsgs1
              }];
              console.log("jsonObjCrl",jsonObjCrl);
            botMessage = new Message("", 'bot',jsonObjCrl,'corosel');
            this.update(botMessage);
  
          };
          if (element.payload.fields.richContent.listValue.values[0].listValue.values[0].structValue.fields.options){
            let fulfillbtn = element.payload.fields.richContent.listValue.values[0].listValue.values[0].structValue.fields.options.listValue.values;
            console.log("Fulfillment buttton", fulfillbtn);
            fulfillbtn.forEach(function (arrayItem) {
            //console.log("Payload value " + arrayItem.title);
            var quick_replies_msg = {};
            quick_replies_msg["title"]="Quick Reply Button Name";
            quick_replies_msg["block_names"]=arrayItem.structValue.fields.text.stringValue;
            qrmsgs.push(quick_replies_msg);
            console.log("quick_replies_msg",quick_replies_msg);
            });
            console.log("Suggestions",fulfillbtn);
          var jsonObj = [
            {
              "text": "",
              "first": "yes",
              "button": "yes",
              "quick_replies": qrmsgs
            }];
          console.log("-----------");
          console.log(jsonObj);
          botMessage = new Message("", 'bot',jsonObj,'button');
          this.update(botMessage);		
          }


        //this.update(botMessage);
        
      }}
      );
      //this.update(botMessageText);
      //this.update(botMessage);
      
    });
}



  // Adds message to source
  update(msg: Message) {
    //alert(JSON.stringify(msg));
    // console.log(this.client.getApiVersion(),"----",this.client.getApiLang(),"-----",this.client.getApiBaseUrl());
    this.conversation.next([msg]);

  }
  AddLead(data: any) {
    // console.log(data,"chat");
    this.db.database.ref('/lead').push(data);
    // this.booksRef.push(data)
    // .catch(error => {
    //   this.errorMgmt(error);
    // })
  }
  private errorMgmt(error) {
    // console.log(error)
  }
  clear_msg() {
    this.message_empty = [{
      content: "empty",
      sentBy: "empty", array: '', component_type: ''
    }];
    this.conversation.next(this.message_empty);
  }
}
