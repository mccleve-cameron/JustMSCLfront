import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faTrash, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css'],
})
export class UserItemComponent implements OnInit {
  @Input() contact: User;

  faUserEdit = faUserEdit;
  faTrash = faTrash;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  onDelete() {
    this.userService.deleteUser(this.contact._id);

    this.router.navigate(['/accounts']);
  }
}
