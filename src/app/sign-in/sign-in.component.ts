import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    const value = form.value;
    debugger;
    this.signIn(value);
  }

  signIn(user: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    debugger;
    // add to database
    this.http
      .post<{ message: string; user: any }>(
        'http://localhost:3000/signup/signin',
        user,
        { headers: headers }
      )
      .subscribe(
        (data) => {
          console.log('success', data);
          this.router.navigate(['/accounts']);
        },
        (error) => {
          console.log('oops', error);
        }
      );
    debugger;
  }
}
