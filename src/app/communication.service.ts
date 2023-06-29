import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  private eventSource: EventSource;

  connect(): Observable<any> {
    this.eventSource = new EventSource('http://localhost:3002/data');
    return new Observable(observer => {
      this.eventSource.addEventListener('message', event => {
        const eventData = JSON.parse(event.data);
        observer.next(eventData);
      });

      this.eventSource.onerror = error => {
        observer.error(error);
      };
    });
  }

  disconnect(): void {
    this.eventSource.close();
  }
}
