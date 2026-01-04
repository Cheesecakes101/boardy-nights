import { useState } from 'react';
import { Header } from '@/components/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RentalTimeline } from '@/components/RentalTimeline';
import { StatusBadge } from '@/components/StatusBadge';
import { mockRentals, getGameById, currentUser } from '@/data/mockData';
import { Link } from 'react-router-dom';
import { Calendar, RotateCcw, Upload, Eye } from 'lucide-react';
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

const Rentals = () => {
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [returnDialogOpen, setReturnDialogOpen] = useState(false);
  const [selectedRentalId, setSelectedRentalId] = useState<string | null>(null);

  // Filter rentals for current user
  const userRentals = mockRentals.filter((r) => r.userId === currentUser.id);

  const pendingRentals = userRentals.filter(
    (r) => r.status === 'pending_payment' || r.status === 'pending_approval' || r.status === 'confirmed'
  );
  const activeRentals = userRentals.filter(
    (r) => r.status === 'active' || r.status === 'return_requested'
  );
  const historyRentals = userRentals.filter(
    (r) => r.status === 'completed' || r.status === 'cancelled'
  );

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handlePaymentUpload = () => {
    setPaymentDialogOpen(false);
    toast.success('Payment uploaded! 💸', {
      description: 'Admin will verify it shortly.',
    });
  };

  const handleReturnRequest = () => {
    setReturnDialogOpen(false);
    toast.success('Return requested! 📦', {
      description: "We'll arrange the pickup soon.",
    });
  };

  const RentalCard = ({ rental }: { rental: typeof mockRentals[0] }) => {
    const game = getGameById(rental.gameId);
    if (!game) return null;

    return (
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="flex flex-col sm:flex-row">
            {/* Game Image */}
            <Link to={`/games/${game.id}`} className="sm:w-32 shrink-0">
              <div className="aspect-[4/3] sm:aspect-square overflow-hidden">
                <img
                  src={game.images[0]}
                  alt={game.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </Link>

            {/* Content */}
            <div className="flex-1 p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Link
                    to={`/games/${game.id}`}
                    className="font-display text-lg font-semibold text-foreground hover:text-primary transition-colors"
                  >
                    {game.name}
                  </Link>
                  <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {formatDate(rental.startDate)} - {formatDate(rental.endDate)}
                  </div>
                </div>
                <StatusBadge status={game.status} size="sm" />
              </div>

              {/* Timeline */}
              <div className="mt-4">
                <RentalTimeline currentStatus={rental.status} />
              </div>

              {/* Actions */}
              <div className="mt-4 flex flex-wrap gap-2">
                {rental.status === 'pending_payment' && (
                  <Button
                    size="sm"
                    onClick={() => {
                      setSelectedRentalId(rental.id);
                      setPaymentDialogOpen(true);
                    }}
                    className="gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    Upload Payment
                  </Button>
                )}
                {rental.status === 'active' && (
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => {
                      setSelectedRentalId(rental.id);
                      setReturnDialogOpen(true);
                    }}
                    className="gap-2"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Request Return
                  </Button>
                )}
                {rental.status === 'pending_approval' && (
                  <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                    <Eye className="h-4 w-4" />
                    Waiting for admin approval...
                  </span>
                )}
              </div>

              {/* Fine info */}
              {rental.fineAmount > 0 && (
                <div className="mt-3 rounded-lg bg-destructive/10 p-3 text-sm">
                  <span className="font-medium text-destructive">
                    Fine: ₹{rental.fineAmount}
                  </span>
                  {rental.fineReason && (
                    <span className="text-muted-foreground"> — {rental.fineReason}</span>
                  )}
                  {rental.fineStatus === 'paid' && (
                    <span className="ml-2 text-status-available font-medium">✓ Paid</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const EmptyState = ({ message, emoji }: { message: string; emoji: string }) => (
    <div className="rounded-2xl bg-card p-12 text-center shadow-card border border-border">
      <div className="text-5xl mb-4">{emoji}</div>
      <p className="text-muted-foreground">{message}</p>
      <Link to="/games">
        <Button className="mt-4">Browse Games</Button>
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8">
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">
          My Rentals 📦
        </h1>
        <p className="text-muted-foreground mb-8">
          Track your game adventures
        </p>

        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="pending" className="gap-2">
              Pending
              {pendingRentals.length > 0 && (
                <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs font-medium">
                  {pendingRentals.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="active" className="gap-2">
              Active
              {activeRentals.length > 0 && (
                <span className="rounded-full bg-primary/20 px-2 py-0.5 text-xs font-medium">
                  {activeRentals.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="mt-6 space-y-4">
            {pendingRentals.length === 0 ? (
              <EmptyState
                emoji="🎯"
                message="No pending rentals. Ready to grab a game?"
              />
            ) : (
              pendingRentals.map((rental) => (
                <RentalCard key={rental.id} rental={rental} />
              ))
            )}
          </TabsContent>

          <TabsContent value="active" className="mt-6 space-y-4">
            {activeRentals.length === 0 ? (
              <EmptyState
                emoji="🎮"
                message="No active rentals. Time for a game night?"
              />
            ) : (
              activeRentals.map((rental) => (
                <RentalCard key={rental.id} rental={rental} />
              ))
            )}
          </TabsContent>

          <TabsContent value="history" className="mt-6 space-y-4">
            {historyRentals.length === 0 ? (
              <EmptyState
                emoji="📜"
                message="No rental history yet. Your epic journey awaits!"
              />
            ) : (
              historyRentals.map((rental) => (
                <RentalCard key={rental.id} rental={rental} />
              ))
            )}
          </TabsContent>
        </Tabs>

        {/* Payment Upload Dialog */}
        <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-display">Upload Payment Proof 💸</DialogTitle>
              <DialogDescription>
                Share your UPI transaction ID or upload a screenshot
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="upi">UPI Reference Number</Label>
                <Input id="upi" placeholder="e.g., UPI123456789" />
              </div>
              <div className="grid gap-2">
                <Label>Or upload screenshot</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    Click to upload or drag and drop
                  </p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setPaymentDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handlePaymentUpload}>Submit Payment</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Return Request Dialog */}
        <Dialog open={returnDialogOpen} onOpenChange={setReturnDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-display">Request Return 📦</DialogTitle>
              <DialogDescription>
                Ready to return the game? We'll arrange for pickup!
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm text-muted-foreground">
                Make sure all components are present and in good condition.
                Missing or damaged pieces may result in a fine. 🙈
              </p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setReturnDialogOpen(false)}>
                Not Yet
              </Button>
              <Button onClick={handleReturnRequest}>Confirm Return</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Rentals;
