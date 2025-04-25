import { EventStatus } from "./EventStatus";

export interface Event {
  id: number;
  resourceLink?: string | null;
  resourceFileName?: string | null;
  title: string;
  description?: string | null;
  eventDate: string;
  endDate: string;
  location: string;
  image?: string | null;
  maxParticipants: number;
  participantsCount: number;
  status: EventStatus;
  priceCents: number;
}