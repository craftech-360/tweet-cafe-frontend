import { Component } from '@angular/core';
import { CommunicationService } from '../communication.service';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent {
  events: any[] = [];
  private eventSubscription: any;

  constructor(private sseService: CommunicationService) { }

  ngOnInit(): void {
    this.eventSubscription = this.sseService.connect().subscribe(event => {
      console.log(event);
      this.events.push(event);
    });
  }

  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
    this.sseService.disconnect();
  }
}
