import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService
) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (!this.loginForm.valid) {
      return;
    }

    const { email, password } = this.loginForm.value;

    this.loading = true;

    this.auth.signIn(email, password).subscribe({
        next: () => {
            console.log('User is logged in');
            this.auth.getLoggedUser().subscribe({
                next: user => {
                    
                },
                error: err => {
                    Swal.fire({
                        title: 'Não foi possível fazer log-in',
                        text: String(err),
                        icon: 'error'
                    })
                },
                complete: () => this.loading = false
            });
        },
        error: (error) => {
            this.loading = false;
            Swal.fire({
                title: 'Credenciais incorretas',
                icon: 'error'
            })
        }
    })
  }
}
