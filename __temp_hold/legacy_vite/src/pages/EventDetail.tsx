import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { mockEvents, mockUsers } from '@/data/mockData';
import {
  CalendarDays,
  Clock,
  Users,
  Sparkles,
  ArrowLeft,
  Upload,
  Check,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const EventDetail = () => {
  const { id } = useParams();
  const event = mockEvents.find((e) => e.id === id);
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  if (!event) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-16 text-center">
          <div className="text-6xl mb-4">📅</div>
          <h1 className="font-display text-2xl font-bold">Event not found</h1>
          <p className="mt-2 text-muted-foreground">
            This event might have already happened...
          </p>
          <Link to="/events">
            <Button className="mt-6">Back to Events</Button>
          </Link>
        </div>
      </div>
    );
  }

  const spotsLeft = event.maxParticipants - event.registeredCount;
  const isFull = event.status === 'full' || spotsLeft <= 0;
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Mock confirmed attendees
  const confirmedAttendees = mockUsers.slice(0, 4);

  const handleRegister = () => {
    setRegisterDialogOpen(false);
    setIsRegistered(true);
    toast.success("You're almost in! 🎉", {
      description: 'Payment submitted. Admin will confirm shortly.',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8">
        {/* Back button */}
        <Link
          to="/events"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Events
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Hero Card */}
            <Card className="overflow-hidden">
              <div className="relative gradient-hero p-8 text-primary-foreground">
                {event.theme && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-sm font-medium backdrop-blur">
                    <Sparkles className="h-3 w-3" />
                    {event.theme}
                  </span>
                )}
                <h1 className="mt-4 font-display text-3xl font-bold">
                  {event.title}
                </h1>
                <div className="mt-4 flex flex-wrap gap-4 text-primary-foreground/90">
                  <span className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" />
                    {formatDate(event.eventDate)}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {event.startTime}
                  </span>
                  <span className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    {event.registeredCount}/{event.maxParticipants} registered
                  </span>
                </div>
                {isFull && (
                  <div className="absolute top-4 right-4 rounded-full bg-foreground/90 px-4 py-2 text-sm font-bold text-background">
                    SOLD OUT 🔥
                  </div>
                )}
              </div>
              <CardContent className="p-6">
                {event.description && (
                  <div className="prose prose-sm max-w-none text-muted-foreground">
                    <p>{event.description}</p>
                  </div>
                )}

                {/* What to expect */}
                <div className="mt-6">
                  <h3 className="font-display font-semibold text-foreground mb-3">
                    What to Expect 🎯
                  </h3>
                  <ul className="space-y-2">
                    {[
                      '3+ hours of non-stop gaming',
                      'Snacks and drinks provided',
                      'Mix of strategy and party games',
                      'Meet awesome people from your hostel',
                      'No experience needed - we teach!',
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="h-4 w-4 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Attendees */}
            <Card className="mt-6">
              <CardContent className="p-6">
                <h3 className="font-display font-semibold text-foreground mb-4">
                  Who's Coming 👥
                </h3>
                <div className="flex flex-wrap gap-4">
                  {confirmedAttendees.map((user) => (
                    <div key={user.id} className="flex items-center gap-2">
                      <img
                        src={user.avatarUrl}
                        alt={user.name}
                        className="h-8 w-8 rounded-full"
                      />
                      <span className="text-sm text-foreground">{user.name}</span>
                    </div>
                  ))}
                  {event.registeredCount > 4 && (
                    <div className="flex items-center justify-center h-8 px-3 rounded-full bg-secondary text-sm text-muted-foreground">
                      +{event.registeredCount - 4} more
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="text-center">
                  <span className="font-display text-3xl font-bold text-primary">
                    ₹{event.feeAmount}
                  </span>
                  <span className="text-muted-foreground"> / person</span>
                </div>

                <div className="mt-4 rounded-lg bg-secondary/50 p-4 text-center">
                  {isFull ? (
                    <div className="text-destructive font-medium">
                      Event is full 😢
                    </div>
                  ) : (
                    <div>
                      <span className="text-2xl font-bold text-foreground">{spotsLeft}</span>
                      <span className="text-muted-foreground"> spots left</span>
                    </div>
                  )}
                </div>

                <div className="mt-6">
                  {isRegistered ? (
                    <div className="rounded-lg bg-status-available/10 border border-status-available/30 p-4 text-center">
                      <Check className="h-6 w-6 mx-auto text-status-available" />
                      <p className="mt-2 font-medium text-status-available">
                        Registration Submitted!
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Waiting for admin approval
                      </p>
                    </div>
                  ) : (
                    <Button
                      size="lg"
                      className="w-full font-display"
                      disabled={isFull}
                      onClick={() => setRegisterDialogOpen(true)}
                    >
                      {isFull ? 'Join Waitlist' : 'Register Now'}
                    </Button>
                  )}
                </div>

                {/* Quick facts */}
                <div className="mt-6 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location</span>
                    <span className="font-medium">Common Room</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium">3-4 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Refunds</span>
                    <span className="font-medium text-destructive">No refunds</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Register Dialog */}
        <Dialog open={registerDialogOpen} onOpenChange={setRegisterDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-display">
                Register for {event.title}
              </DialogTitle>
              <DialogDescription>
                Pay ₹{event.feeAmount} via UPI and submit proof
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="rounded-lg bg-secondary/50 p-4 text-center">
                <p className="text-sm text-muted-foreground">Pay to UPI</p>
                <p className="font-display text-lg font-bold text-foreground">
                  boardy@upi
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="upi">UPI Reference Number</Label>
                <Input id="upi" placeholder="e.g., UPI123456789" />
              </div>
              <div className="grid gap-2">
                <Label>Or upload screenshot</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Upload className="h-6 w-6 mx-auto text-muted-foreground" />
                  <p className="mt-2 text-xs text-muted-foreground">
                    Click to upload
                  </p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setRegisterDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleRegister}>Submit Registration</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default EventDetail;
