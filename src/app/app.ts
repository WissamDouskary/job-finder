import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar';
import { NgxSonnerToaster } from 'ngx-sonner';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, NgxSonnerToaster, NgxSpinnerModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
