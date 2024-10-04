import { Component } from '@angular/core';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { RouterLink, RouterOutlet } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ProductsComponent } from "./Components/products/products.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatSlideToggle,
    MatSidenavModule,
    ProductsComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'storage-app';
}
