import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../users/user.model';
import { UserService } from '../users/user.service';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css'],
})
export class AccountInfoComponent implements OnInit {
  user!: User;
  id: string = '5fa4bd99b696c41150f3a063';

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    debugger;
    this.userService.getUser(this.id).subscribe((respone) => {
      this.user = respone.user;
    });
  }
}
