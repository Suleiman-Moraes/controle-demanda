import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private returnUrl: string;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logar(): void {
    this.returnUrl = 'pages';
    sessionStorage.setItem('tRcr7Ssn', btoa(JSON.stringify({ teste: 'teste' })));
    this.router.navigate([this.returnUrl]);
  }
}
