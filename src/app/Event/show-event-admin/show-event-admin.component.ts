import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event';
import { Router } from '@angular/router';
import { EventStatus } from '../../models/EventStatus';

@Component({
  selector: 'app-show-event-admin',
  templateUrl: './show-event-admin.component.html',
  styleUrls: ['./show-event-admin.component.css']
})
export class ShowEventAdminComponent implements OnInit {
  events: Event[] = [];
  filteredEvents: Event[] = [];
  searchTerm: string = '';
  statusFilter: string = 'ALL';
  page: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;

  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getEvenements().subscribe({
      next: (events) => {
        console.log('Raw backend events:', events);
        this.events = events.map(event => ({
          id: event.id,
          resourceLink: event.resourceLink,
          resourceFileName: event.resourceFileName,
          title: event.title || 'Untitled Event',
          image: event.image, // Preserve image as string | null
          description: event.description || null,
          eventDate: this.convertDate(event.eventDate),
          endDate: this.convertDate(event.endDate),
          location: event.location || 'Unknown Location',
          maxParticipants: event.maxParticipants || 0,
          participantsCount: event.participantsCount || 0,
          priceCents: event.priceCents ?? 0,
          status: event.status || EventStatus.A_VENIR
        }));
        console.log('Transformed events:', this.events);
        this.applyFiltersAndSearch();
        this.updatePagination();
      },
      error: (error) => {
        console.error('Erreur lors du chargement des événements', error);
      }
    });
  }

  applyFiltersAndSearch(): void {
    let filtered = [...this.events];

    if (this.statusFilter !== 'ALL') {
      filtered = filtered.filter(event => event.status === this.statusFilter);
    }

    if (this.searchTerm) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchLower) ||
        (event.description && event.description.toLowerCase().includes(searchLower)) ||
        event.location.toLowerCase().includes(searchLower)
      );
    }

    this.filteredEvents = filtered;
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredEvents.length / this.pageSize);
    if (this.page > this.totalPages) {
      this.page = this.totalPages || 1;
    }
  }

  onSearchChange(event: any): void {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.page = 1;
    this.applyFiltersAndSearch();
    this.updatePagination();
  }

  onStatusFilterChange(event: any): void {
    this.statusFilter = (event.target as HTMLSelectElement).value;
    this.page = 1;
    this.applyFiltersAndSearch();
    this.updatePagination();
  }

  editEvent(eventId: number): void {
    this.router.navigate([`/edit-event/${eventId}`]);
  }

  deleteEvent(eventId: number): void {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
      this.eventService.removeEvenement(eventId.toString()).subscribe({
        next: () => {
          console.log('Événement supprimé avec succès');
          this.events = this.events.filter(event => event.id !== eventId);
          this.applyFiltersAndSearch();
          this.updatePagination();
        },
        error: (error) => {
          console.error('Erreur lors de la suppression de l\'événement', error);
          alert('Une erreur s\'est produite lors de la suppression.');
        }
      });
    }
  }

  changePage(newPage: number): void {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.page = newPage;
    }
  }

  formatDate(date: string): string {
    const d = new Date(date);
    return d.toLocaleString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  formatPrice(cents: number): string {
    return (cents / 100).toFixed(2) + '€';
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'A_VENIR':
        return 'event-status-upcoming';
      case 'EN_COURS':
        return 'event-status-ongoing';
      case 'TERMINE':
        return 'event-status-completed';
      case 'ANNULE':
        return 'event-status-cancelled';
      default:
        return '';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'A_VENIR':
        return 'À venir';
      case 'EN_COURS':
        return 'En cours';
      case 'TERMINE':
        return 'Terminé';
      case 'ANNULE':
        return 'Annulé';
      default:
        return status;
    }
  }

  private convertDate(date: string | number[] | Date | null | undefined): string {
    if (date instanceof Date) {
      return date.toISOString();
    } else if (Array.isArray(date) && date.length >= 5) {
      // [year, month, day, hour, minute], month is 1-based
      const d = new Date(date[0], date[1] - 1, date[2], date[3], date[4]);
      return d.toISOString();
    } else if (typeof date === 'string') {
      return date; // Assume the string is already in ISO format
    }
    return new Date().toISOString();
  }
}