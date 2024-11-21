import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router'; // Import du Router
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  imports: [FormsModule, HttpClientModule, RouterModule] // Ajout de RouterModule
})
export class FormComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  checkCredentials() {
    const payload = { userName: this.username, password: this.password };

    this.http.post('http://localhost:3000/check-user', payload)
      .subscribe(
        (response: any) => {
          if (response.exists) {
            this.router.navigate(['/home']); // Redirection vers Home
          } else {
            alert('User does not exist.');
          }
        },
        (error) => {
          console.error('Error:', error);
          alert('An error occurred.');
        }
      );
  }
}
