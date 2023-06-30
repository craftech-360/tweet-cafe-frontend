import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  // getAllUrl = 'http://localhost:8000';
  // constructor(private http : HttpClient) { }

  // getAll(){
  //   return this.http.get(this.getAllUrl);
  // }

  // private eventSource: EventSource;

  // connect(): Observable<any> {
  //   this.eventSource = new EventSource('http://localhost:3002/data');
  //   return new Observable(observer => {
  //     this.eventSource.addEventListener('message', event => {
  //       const eventData = JSON.parse(event.data);
  //       observer.next(eventData);
  //     });

  //     this.eventSource.onerror = error => {
  //       observer.error(error);
  //     };
  //   });
  // }

  // disconnect(): void {
  //   this.eventSource.close();
  // }


}
