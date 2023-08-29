import { Component, HostListener, signal } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { RxQueue } from 'rx-queue';
import { DelayQueue } from 'rx-queue';
import { count } from 'letter-count';
import * as moment from 'moment';
import * as momentTimeZonw from 'moment-timezone';
import { Observable, Subject, concat, concatMap, delay, from, ignoreElements, mapTo, of, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  profilePic = "../assets/images/no-img.png"
  title = 'tweet-frontend';
  previousJson = []
  list = [];
  selectedTweet: any = signal({})
  key: any = ''
  a: boolean = true;
  delay: any;
  latestDate: any = moment().subtract(45, 'seconds').format('YYYY-MM-DDTHH:mm:ssZ');

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.key = event.key;
    if (this.key == 'n') {
      // this.selectedTweet = this.list.shift();
      this.socket.emit('getTweets');
    }
  }

  constructor(private socket: Socket) { }

  ngOnInit(): void {

    this.delay = new DelayQueue(15000)

    let subject = new Subject();
    let period = 1500;

    function createDelayQueue(data: any): Observable<any> {
      return from(data).pipe(
        concatMap((data) => timer(1000).pipe(delay(15000), mapTo(data)))
      );
    }

    // const data = [2000, 3000, 1000];




    // subject.pipe(
    //   concatMap(x => concat(
    //     of(x),      
    //     timer(period).pipe(
    //       ignoreElements(),
    //     ),
    //   )),
    // ).subscribe((item: any) => subject.next(item))


    // set delay period time to 500 milliseconds
    // this.delay.subscribe((x: any) => {
    //   console.log(this.list.length);
    //   var i = this.list.indexOf(x);
    //   this.list.splice(i, 1);

    //   this.selectedTweet.set(x);
    //   console.log(x._id, "id");

    //   if (count(x.text)['chars'] < 60) {
    //     console.log('less');
    //     this.socket.emit("invalid", x._id)
    //   }
    //   else {
    //     this.socket.emit("sendCommand", x._id)
    //   }

    //   if (this.list.length == 0) {
    //     this.delay.complete();
    //     console.log("delay complete");
    //     this.delay.unsubscribe();
    //     console.log("delay unsubscribed");

    //     createNewdelay();
    //   }

    // }, (err) => {
    //   console.log(err.message);
    // }, () => {
    //   console.log("complete");
    //   this.socket.emit('getTweets', this.latestDate);
    // }).add(() => {
    //   // this.socket.emit('getTweets', this.latestDate)
    // });

    this.socket.on("tweetProcessed", (data: []) => {
     
      if (data.length != 0) {
        this.list = [];
        console.log("data");
        console.log(data);
        this.list = data;
        // let tweet = this.list.map(tweet => moment(tweet.createdAt));
        // this.latestDate = moment.max(tweet).format('YYYY-MM-DDTHH:mm:ssZ');
        //this.latestDate = moment(this.latestDate).tz('Asia/Kolkata').format('YYYY-MM-DDTHH:mm:ssZ');
        console.log("checking list");
        // let tmp = [...this.list];
        // console.log(tmp);
        const delayQueue$ = createDelayQueue(data);
        delayQueue$.subscribe(
          (x) => {
            var i = this.list.indexOf(x);
            this.list.splice(i, 1);
            this.selectedTweet.set(x);
            // if (count(x.text)['chars'] < 60) {
              // console.log('less');
              // this.socket.emit("invalid", x._id)
            // }
            // else {
              this.socket.emit("sendCommand", x._id)
            // }
            // console.log(x);
            // console.log("Hell");
            // console.log(Delay ${ms} completed.);
          },
          null,
          () => {
            console.log('All data completed!');
            // this.socket.emit('getTweets', this.latestDate);
          }
        );
        // tmp.forEach(x => {
        //   this.delay.next(x);
        //   if (tmp.indexOf(x) == tmp.length - 1) {
        //     // delay.complete();
        //     // delay.unsubscribe();
        //   }
        // });
        //console.log(tmp.length * 15000);
        // delay.complete();
      }
      else {
        console.log("no-tweets");
        return
        // this.latestDate = moment().subtract(45, 'seconds').format('YYYY-MM-DDTHH:mm:ssZ');
        // setTimeout(() => {
        //   this.socket.emit('getTweets', this.latestDate);
        // }, 30000);
      }


      //this.list.pop();

      // this.list = e
      // if(e){
      // this.list.push(e);
      //   console.log(this.list);

      //   if(this.a){
      //     this.selectedTweet =  this.list.shift();
      //     console.log(this.selectedTweet,"main");

      //     this.socket.emit('sendCommand');
      //     this.a = false;
      //   }
      // }
    })


  }

}
function createNewdelay() {
  console.log("new Delay");
  console.log(this.delay)
  this.delay = new DelayQueue(15000);
}

