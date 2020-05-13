import { Component, OnInit } from '@angular/core';
import { faUser, faUsersCog } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  faUser = faUser;
  faUsersCog = faUsersCog;
  environment = environment;
  user;

  constructor(
    public router: Router,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.user = this.authService.currentUserValue();
  }

  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
