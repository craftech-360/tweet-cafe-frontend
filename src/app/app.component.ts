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
  constructor(private socket: Socket) { }

  ngOnInit(): void {
    this.delay = new DelayQueue(5000)
    function createDelayQueue(data: any): Observable<any> {
      return from(data).pipe(
        concatMap((data) => timer(1000).pipe(delay(15000), mapTo(data)))
      );
    }

    this.socket.on("tweetProcessed", (data: []) => {
     
      if (data.length != 0) {
        this.list = [];
        console.log("data");
        console.log(data);
        this.list.push(...data);
        console.log("checking list");
        // let tmp = [...this.list];
        // console.log(tmp);
        const delayQueue$ = createDelayQueue(this.list);
        delayQueue$.subscribe(
          (x) => {
            var i = this.list.indexOf(x);
            this.list.splice(i, 1);
            this.selectedTweet.set(x);
            this.socket.emit("sendCommand", x._id)
          },
          null,
          () => {
            console.log('All data completed!');
          }
        );
      }
      else {
        console.log("no-tweets");
      }
    })
  }
}