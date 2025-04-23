import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event';
import { EventStatus } from '../../models/EventStatus';

@Component({
  selector: 'app-show-all-events',
  templateUrl: './show-all-events.component.html',
  styleUrls: ['./show-all-events.component.css']
})
export class ShowAllEventsComponent implements OnInit {
  events: Event[] = [];

  constructor(private eventService: EventService) {}

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
          image: event.image, // Keep image as-is, let template handle fallback
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
      },
      error: (error) => {
        console.error('Error fetching events:', error);
      }
    });
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