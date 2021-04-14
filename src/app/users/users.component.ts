import { Component, OnDestroy, OnInit } from '@angular/core';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { User } from './user.model';
import { UserService } from './user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit, OnDestroy {
  users: User[] = [];
  subscription: Subscription;
  faUserCircle = faUserCircle;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.subscription = this.userService.userChangedEvent.subscribe(
      (users: User[]) => {
        this.users = users;
      }
    );

    this.userService.getUsers();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
