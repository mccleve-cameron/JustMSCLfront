import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: User[] = [];
  userChangedEvent = new Subject<User[]>();

  constructor(private http: HttpClient) {}

  getUsers() {
    this.http
      .get<{ message: string; users: User[] }>('http://localhost:3000/accounts')
      .subscribe(
        (responseData) => {
          this.users = responseData.users;
          this.userChangedEvent.next(this.users.slice());
        },

        (error: any) => {
          console.log(error);
        }
      );
  }

  getUser(id: string) {
    return this.http.get<{ message: string; user: User }>(
      'http://localhost:3000/accounts/' + id
    );
  }

  updateUser(originalUser: User, newUser: User) {
    console.log('upated completeddddddddddddddddd');
    if (!originalUser || !newUser) {
      return;
    }

    const pos = this.users.findIndex((d) => d._id === originalUser._id);

    if (pos < 0) {
      return;
    }

    // set the id of the new User to the id of the old User
    newUser._id = originalUser._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // update database
    this.http
      .put('http://localhost:3000/accounts/' + originalUser._id, newUser, {
        headers: headers,
      })
      .subscribe((response: Response) => {
        this.users[pos] = newUser;
        this.userChangedEvent.next(this.users.slice());
      });
  }

  deleteUser(userId: string) {
    this.http
      .delete('http://localhost:3000/accounts/' + userId)
      .subscribe(() => {
        const updatedUsers = this.users.filter((user) => user._id !== userId);
        this.users = updatedUsers;
        this.userChangedEvent.next([...this.users]);
      });
  }
}
