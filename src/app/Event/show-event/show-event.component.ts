import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event';
import { EventStatus } from '../../models/EventStatus';

@Component({
  selector: 'app-show-event',
  templateUrl: './show-event.component.html',
  styleUrls: ['./show-event.component.css']
})
export class ShowEventComponent implements OnInit {
  event: Event | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.loadEvent();
  }

  private loadEvent(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (isNaN(id)) {
      this.error = 'Invalid event ID';
      this.loading = false;
      return;
    }

    this.eventService.getEvenementById(id).subscribe({
      next: (rawEvent) => {
        this.event = {
          id: rawEvent.id,
          resourceLink: rawEvent.resourceLink,
          resourceFileName: rawEvent.resourceFileName,
          title: rawEvent.title || 'Untitled Event',
          image: rawEvent.image || 'Untitled image',

          description: rawEvent.description || null,
          eventDate: this.convertDate(rawEvent.eventDate),
          endDate: this.convertDate(rawEvent.endDate),
          location: rawEvent.location || 'Unknown Location',
          maxParticipants: rawEvent.maxParticipants || 0,
          participantsCount: rawEvent.participantsCount || 0,
          priceCents: rawEvent.priceCents ?? 0,
          status: rawEvent.status || EventStatus.A_VENIR
        };
        this.loading = false;
        console.log('Event loaded:', this.event);
      },
      error: (err) => {
        this.error = 'Failed to load event';
        this.loading = false;
        console.error('Error loading event:', err);
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
    // Fallback to current date in ISO format
    return new Date().toISOString();
  }
}