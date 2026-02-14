import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SuiviService } from '../../../core/services/suivi.service';
import { Suivi, SuiviStatus } from '../../../core/models/suivi.model';
import { userResponse } from '../../../core/models/user-response.model';
import { UserService } from '../../../core/services/users.service';
import { toast } from 'ngx-sonner';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-my-jobs-page',
  standalone: true,
  imports: [RouterLink, FormsModule, NgClass],
  templateUrl: './my-jobs-page.html',
  styleUrl: './my-jobs-page.css',
})
export class MyJobsPageComponent implements OnInit {
  private _suiviService = inject(SuiviService);
  private _userService = inject(UserService);
  private _router = inject(Router);

  suivis = signal<Suivi[]>([]);

  ngOnInit(): void {
    this.loadSuivis();
  }

  loadSuivis() {
    const user = this._userService.getCurrentUser();
    if (!user) {
      this._router.navigate(['/login']);
      return;
    }
    this._suiviService.getAllSuivis(user.id!).subscribe({
      next: (data) => this.suivis.set(data),
      error: () => toast.error('Erreur lors du chargement des candidatures'),
    });
  }

  updateStatus(id: string, status: SuiviStatus) {
    this._suiviService.updateSuiviStatus(id, status).subscribe({
      next: () => {
        this.suivis.update((list) => list.map((s) => (s.id === id ? { ...s, status } : s)));
        toast.success('Statut mis a jour');
      },
      error: () => toast.error('Erreur lors de la mise a jour du statut'),
    });
  }

  updateNotes(suivi: Suivi) {
    this._suiviService.updateSuiviNotes(suivi.id!, suivi.notes).subscribe({
      next: () => {
        this.suivis.update((list) =>
          list.map((s) => (s.id === suivi.id ? { ...s, notes: suivi.notes } : s)),
        );
        toast.success('Notes sauvegardees');
      },
      error: () => toast.error('Erreur lors de la sauvegarde des notes'),
    });
  }

  deleteSuivi(id: string) {
    this._suiviService.deleteSuivi(id).subscribe({
      next: () => {
        this.suivis.update((list) => list.filter((s) => s.id !== id));
        toast.success('Candidature supprimée du suivi');
      },
      error: () => toast.error('Erreur lors de la suppression'),
    });
  }

  formatDate(date: string) {
    return date.split('T')[0];
  }
}
