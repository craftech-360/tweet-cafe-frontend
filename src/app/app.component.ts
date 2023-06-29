import { Component } from '@angular/core';
// import { Socket } from 'ngx-socket-io';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

interface User {
  name: string;
  img: string;
  text: string;
  bg:string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tweet-frontend';
  count = 0;
  colorbg:any = ['#EC1E24','#F05254','#FFCB04','#27AA2C','#5AC5C7']
  previousJson:any= [
  ];

  newUsers:any

  currentJson: User[] = [
    { name: "USER1", img: "bob.jpg", text: "Sed do eiusmod tempor incididunt", bg: "" },
    { name: "USER2", img: "bob.jpg", text: "Sed do eiusmod tempor incididunt", bg: "" },
    { name: "USER3", img: "bob.jpg", text: "Sed do eiusmod tempor incididunt", bg: "" },
    { name: "USER4", img: "bob.jpg", text: "Sed do eiusmod tempor incididunt", bg: "" }
  ];
  delayTime = 10000; // 10 seconds
  user: any;
  
  delay(ms: number): Promise<void> {
    return new Promise<void>((resolve) => {
      interval(ms)
        .pipe(take(1))
        .subscribe(() => {
          resolve();
        });
    });
  }
  // constructor(private socket : Socket) { }
  ngOnInit(): void {
    this.iterateAndDelay();
  }
  
  async iterateAndDelay(): Promise<void> {
    for (this.user of this.currentJson) {
      this.user.bg = this.colorbg[Math.floor(Math.random() * this.colorbg.length)];
      console.log('wait');
      
      await this.delay(this.delayTime);
      let data = [{
        name:this.user.name,
        text:this.user.text,
        bg:this.user.bg,
      }]
      this.previousJson.push(data)
      this.user.name = "";
      this.user.bg = "";
      this.user.text = "";
    }
  }

  
}


// console.log("Current Users",this.previousJson.length);
// // // Assuming currentJson is already defined
// // const currentJson: User[] = [
// //   { name: "Bob", img: "bob.jpg", text: "Sed do eiusmod tempor incididunt" }

// // ];

// // // Compare the two JSON objects
// // this.newUsers = currentJson.filter(user => !this.isUserExisting(user));

// // // Push new users to previousJson
// // this.previousJson.push(...this.newUsers);

// // // Display the new users
// // // console.log(this.newUsers);
// // console.log("updatedone",this.previousJson); // Updated previousJson with new users
// }

// getNewUser(){
// this.count++
//     // Assuming currentJson is already defined
//     const currentJson: User[] = [
//       { name:`USER${this.count}` , img: "bob.jpg", text: "Sed do eiusmod tempor incididunt",bg: (this.colorbg[Math.floor(Math.random()*this.colorbg.length)]) }
  
//     ];

//     // Compare the two JSON objects
//     this.newUsers = currentJson.filter(user => !this.isUserExisting(user));
    
//     // Push new users to previousJson
//     this.previousJson.push(...this.newUsers);

//     // Display the new users
//     // console.log(this.newUsers);
//     console.log("Updated Users",this.previousJson.length); // Updated previousJson with new users
// }

// isUserExisting(user: User): boolean {
// return this.previousJson.some(prevUser => prevUser.name === user.name );
// }