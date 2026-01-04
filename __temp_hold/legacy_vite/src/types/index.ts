// Types for Boardy

export type GameStatus = 'available' | 'booked' | 'partially_playable' | 'unavailable';
export type GameCategory = 'strategy' | 'party' | 'cooperative' | 'family' | 'card' | 'dice';

export type RentalStatus = 
  | 'pending_payment' 
  | 'pending_approval' 
  | 'confirmed' 
  | 'active' 
  | 'return_requested' 
  | 'completed' 
  | 'cancelled';

export type PaymentStatus = 'pending' | 'verified' | 'rejected';
export type FineStatus = 'none' | 'pending' | 'paid';

export type EventStatus = 'draft' | 'open' | 'full' | 'closed' | 'completed' | 'cancelled';
export type RegistrationStatus = 'pending_payment' | 'pending_approval' | 'confirmed' | 'cancelled';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  roomNumber: string;
  avatarUrl?: string;
  isVerified: boolean;
  isAdmin?: boolean;
}

export interface Game {
  id: string;
  name: string;
  description: string;
  images: string[];
  category: GameCategory;
  minPlayers: number;
  maxPlayers: number;
  durationMinutes: number;
  complexity: 1 | 2 | 3 | 4 | 5;
  rulesUrl?: string;
  components: string[];
  status: GameStatus;
}

export interface Rental {
  id: string;
  userId: string;
  gameId: string;
  startDate: string;
  endDate: string;
  status: RentalStatus;
  paymentReference?: string;
  paymentStatus: PaymentStatus;
  paymentVerifiedAt?: string;
  fineAmount: number;
  fineReason?: string;
  fineStatus: FineStatus;
  finePaidAt?: string;
  returnRequestedAt?: string;
  returnedAt?: string;
  createdAt: string;
}

export interface BoardyEvent {
  id: string;
  title: string;
  description?: string;
  eventDate: string;
  startTime: string;
  theme?: string;
  maxParticipants: number;
  feeAmount: number;
  status: EventStatus;
  gamesPlayed?: string[];
  registeredCount: number;
}

export interface EventRegistration {
  id: string;
  eventId: string;
  userId: string;
  status: RegistrationStatus;
  paymentReference?: string;
  paymentStatus: PaymentStatus;
  paymentVerifiedAt?: string;
}

export interface Warning {
  id: string;
  userId: string;
  reason: string;
  issuedBy: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  isRead: boolean;
  linkPath?: string;
  createdAt: string;
}
