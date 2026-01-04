import { BoardyEvent } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, Clock, Users, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface EventCardProps {
  event: BoardyEvent;
}

export const EventCard = ({ event }: EventCardProps) => {
  const spotsLeft = event.maxParticipants - event.registeredCount;
  const isFull = event.status === 'full' || spotsLeft <= 0;
  const isOpen = event.status === 'open';

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Link to={`/events/${event.id}`}>
      <Card
        className={cn(
          'group overflow-hidden transition-all duration-300 hover:shadow-hover hover:-translate-y-1 cursor-pointer',
          isFull && 'opacity-75'
        )}
      >
        <div className="relative gradient-hero p-6 text-primary-foreground">
          {event.theme && (
            <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-xs font-medium backdrop-blur">
              <Sparkles className="h-3 w-3" />
              {event.theme}
            </span>
          )}
          <h3 className="mt-2 font-display text-xl font-bold">{event.title}</h3>
          {isFull && (
            <div className="absolute top-4 right-4 rounded-full bg-foreground/90 px-3 py-1 text-xs font-bold text-background">
              SOLD OUT 🔥
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <CalendarDays className="h-4 w-4" />
              {formatDate(event.eventDate)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {event.startTime}
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {isFull ? (
                <span className="text-destructive font-medium">Full</span>
              ) : (
                <span>
                  <span className="text-primary font-semibold">{spotsLeft}</span> spots left
                </span>
              )}
            </span>
          </div>
          {event.description && (
            <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
              {event.description}
            </p>
          )}
          <div className="mt-4 flex items-center justify-between">
            <span className="font-display text-lg font-bold text-primary">
              ₹{event.feeAmount}
            </span>
            <Button
              variant={isOpen ? 'default' : 'secondary'}
              size="sm"
              disabled={isFull}
              className="group-hover:shadow-soft"
            >
              {isFull ? 'Join Waitlist' : 'Register Now'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
