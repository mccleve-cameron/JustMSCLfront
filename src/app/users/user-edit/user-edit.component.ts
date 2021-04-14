import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit, OnDestroy {
  originalUser: User;
  user: User;
  editMode: boolean = false;
  id: string;
  duplicate: boolean = false;
  subscription: Subscription;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];

      if (!this.id) {
        this.editMode = false;
        return;
      }
      this.subscription = this.userService
        .getUser(this.id)
        .subscribe((respone) => {
          this.originalUser = respone.user;

          if (!this.originalUser) {
            return;
          }

          this.editMode = true;
          this.user = JSON.parse(JSON.stringify(this.originalUser));
        });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(form: NgForm) {
    debugger;
    const value = form.value;
    const newUser = new User(value._id, value.email, value.password);

    if (this.editMode) {
      this.userService.updateUser(this.originalUser, newUser);
    }

    this.router.navigate(['/accounts']);
  }

  onCancel() {
    this.router.navigate(['/accounts']);
  }
}
