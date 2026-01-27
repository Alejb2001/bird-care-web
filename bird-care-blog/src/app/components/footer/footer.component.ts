import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  email = '';
  currentYear = new Date().getFullYear();

  onSubscribe() {
    if (this.email) {
      alert('¡Gracias por suscribirte! Pronto recibirás nuestras novedades.');
      this.email = '';
    }
  }
}
