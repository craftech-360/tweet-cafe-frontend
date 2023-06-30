import { Component, HostListener, signal } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { RxQueue } from 'rx-queue';
import { DelayQueue } from 'rx-queue';
import { count } from 'letter-count';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tweet-frontend';
  previousJson=[]
  list = [];
  selectedTweet:any = signal({})
  key:any = ''
  a:boolean = true;

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    this.key = event.key;
    if(this.key == 'n'){
    // this.selectedTweet = this.list.shift();
    this.socket.emit('getTweets');
    }
  }
  
  constructor(private socket : Socket) { }

  ngOnInit(): void {

    const delay = new DelayQueue(15000)
    
    // set delay period time to 500 milliseconds
    delay.subscribe((x:any)=>{
      var i = this.list.indexOf(x);
      this.list.splice(i,1);
      this.selectedTweet.set(x);

      if(count(x.text)['chars']<60){
        console.log('less');
        this.socket.emit("invalid")
      }
      else{
        this.socket.emit("sendCommand")
      }
      
    });
    
    this.socket.on("tweets",(e:any)=>{
       console.log(e);
      this.list=e;
      let tmp= [...this.list];
      console.log(tmp);
      tmp.forEach(x=>{
        delay.next(x);   
      });

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
