import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

// ES6 Modules or TypeScript
import Swal from 'sweetalert2';


@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  private fb          = inject( FormBuilder );
  private authService = inject( AuthService );
  private router      = inject( Router );

  public myForm: FormGroup = this.fb.group({
    email: ['anthony@google.com', [ Validators.required, Validators.email ]],
    password: ['A1b2c3d4e5', [ Validators.required, Validators.minLength(6) ]],
  });

  login() {
    // console.log( this.myForm.value );

    const { email, password } = this.myForm.value;

    this.authService.login(email, password)
      .subscribe({
        next: () => this.router.navigateByUrl('/dashboard'),
        error: (message) => {
          Swal.fire('Error', message, 'error' );
        }
      })
  }

}
