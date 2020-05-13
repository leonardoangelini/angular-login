import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  alertMsg = '';
  loading = false;
  isError = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    this.alertMsg = '';

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    this.authService.auth(this.loginForm.value.username, this.loginForm.value.password).subscribe(data => {
      localStorage.setItem(environment.tokenName, data.access_token);
      this.loading = false;
      this.router.navigate(['/']);
    },
      error => {
        this.loading = false;
        this.isError = true;
        switch (error.status) {
          case 400:
            this.alertMsg = 'Nome utente o password non validi';
            break;

          default:
            this.alertMsg = 'Errore di autenticazione';
            break;
        }
      }
    );
  }

}
