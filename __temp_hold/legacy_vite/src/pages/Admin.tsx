import { useState } from 'react';
import { Header } from '@/components/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { mockGames, mockRentals, mockEvents, mockUsers, getGameById, getUserById } from '@/data/mockData';
import { StatusBadge } from '@/components/StatusBadge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Check, X, Eye, AlertTriangle, Package } from 'lucide-react';
import { toast } from 'sonner';

const Admin = () => {
  const [approveDialog, setApproveDialog] = useState<string | null>(null);
  const [returnDialog, setReturnDialog] = useState<string | null>(null);
  const [fineAmount, setFineAmount] = useState('');
  const [fineReason, setFineReason] = useState('');

  const pendingRentals = mockRentals.filter(r => r.status === 'pending_approval');
  const returnRequested = mockRentals.filter(r => r.status === 'return_requested');

  const handleApprove = (id: string) => {
    setApproveDialog(null);
    toast.success('Payment approved! ✅');
  };

  const handleReject = (id: string) => {
    setApproveDialog(null);
    toast.error('Payment rejected');
  };

  const handleCompleteReturn = () => {
    setReturnDialog(null);
    setFineAmount('');
    setFineReason('');
    toast.success('Return completed! 📦');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">Admin Dashboard 🛡️</h1>
        <p className="text-muted-foreground mb-8">Manage games, rentals, events, and users</p>

        <Tabs defaultValue="rentals">
          <TabsList className="grid w-full max-w-lg grid-cols-4">
            <TabsTrigger value="games">Games</TabsTrigger>
            <TabsTrigger value="rentals">Rentals <span className="ml-1 text-xs bg-destructive/20 text-destructive px-1.5 rounded-full">{pendingRentals.length + returnRequested.length}</span></TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          {/* Games Tab */}
          <TabsContent value="games" className="mt-6">
            <Card><CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-display font-semibold">All Games ({mockGames.length})</h3>
                <Button size="sm">+ Add Game</Button>
              </div>
              <div className="space-y-3">
                {mockGames.map(game => (
                  <div key={game.id} className="flex items-center gap-4 p-3 rounded-lg bg-secondary/30">
                    <img src={game.images[0]} alt={game.name} className="h-12 w-12 rounded-lg object-cover" />
                    <div className="flex-1"><p className="font-medium">{game.name}</p><p className="text-xs text-muted-foreground capitalize">{game.category}</p></div>
                    <StatusBadge status={game.status} size="sm" />
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                ))}
              </div>
            </CardContent></Card>
          </TabsContent>

          {/* Rentals Tab */}
          <TabsContent value="rentals" className="mt-6 space-y-6">
            <Card><CardContent className="p-6">
              <h3 className="font-display font-semibold mb-4 flex items-center gap-2"><Eye className="h-5 w-5 text-primary" /> Pending Approvals ({pendingRentals.length})</h3>
              {pendingRentals.length === 0 ? <p className="text-muted-foreground text-center py-4">No pending approvals 🎉</p> : (
                <div className="space-y-3">
                  {pendingRentals.map(rental => {
                    const game = getGameById(rental.gameId);
                    const user = getUserById(rental.userId);
                    return (
                      <div key={rental.id} className="flex items-center gap-4 p-3 rounded-lg border">
                        <img src={game?.images[0]} alt="" className="h-12 w-12 rounded-lg object-cover" />
                        <div className="flex-1">
                          <p className="font-medium">{game?.name}</p>
                          <p className="text-xs text-muted-foreground">{user?.name} • Ref: {rental.paymentReference}</p>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => setApproveDialog(rental.id)}>Review</Button>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent></Card>

            <Card><CardContent className="p-6">
              <h3 className="font-display font-semibold mb-4 flex items-center gap-2"><Package className="h-5 w-5 text-primary" /> Return Requests ({returnRequested.length})</h3>
              {returnRequested.length === 0 ? <p className="text-muted-foreground text-center py-4">No returns pending</p> : (
                <div className="space-y-3">
                  {returnRequested.map(rental => {
                    const game = getGameById(rental.gameId);
                    const user = getUserById(rental.userId);
                    return (
                      <div key={rental.id} className="flex items-center gap-4 p-3 rounded-lg border">
                        <img src={game?.images[0]} alt="" className="h-12 w-12 rounded-lg object-cover" />
                        <div className="flex-1">
                          <p className="font-medium">{game?.name}</p>
                          <p className="text-xs text-muted-foreground">{user?.name} • Room {user?.roomNumber}</p>
                        </div>
                        <Button size="sm" onClick={() => setReturnDialog(rental.id)}>Inspect Return</Button>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent></Card>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="mt-6">
            <Card><CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-display font-semibold">All Events</h3>
                <Button size="sm">+ Create Event</Button>
              </div>
              <div className="space-y-3">
                {mockEvents.map(event => (
                  <div key={event.id} className="flex items-center gap-4 p-3 rounded-lg bg-secondary/30">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg gradient-hero text-primary-foreground font-bold">{new Date(event.eventDate).getDate()}</div>
                    <div className="flex-1"><p className="font-medium">{event.title}</p><p className="text-xs text-muted-foreground">{event.registeredCount}/{event.maxParticipants} registered</p></div>
                    <span className={`text-xs px-2 py-1 rounded-full ${event.status === 'open' ? 'bg-status-available/10 text-status-available' : 'bg-muted text-muted-foreground'}`}>{event.status}</span>
                    <Button variant="ghost" size="sm">Manage</Button>
                  </div>
                ))}
              </div>
            </CardContent></Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="mt-6">
            <Card><CardContent className="p-6">
              <h3 className="font-display font-semibold mb-4">All Users ({mockUsers.length})</h3>
              <div className="space-y-3">
                {mockUsers.map(user => (
                  <div key={user.id} className="flex items-center gap-4 p-3 rounded-lg bg-secondary/30">
                    <img src={user.avatarUrl} alt="" className="h-10 w-10 rounded-full" />
                    <div className="flex-1"><p className="font-medium">{user.name}</p><p className="text-xs text-muted-foreground">Room {user.roomNumber}</p></div>
                    {user.isVerified ? <span className="text-xs text-status-available">✓ Verified</span> : <span className="text-xs text-muted-foreground">Pending</span>}
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                ))}
              </div>
            </CardContent></Card>
          </TabsContent>
        </Tabs>

        {/* Approve/Reject Dialog */}
        <Dialog open={!!approveDialog} onOpenChange={() => setApproveDialog(null)}>
          <DialogContent>
            <DialogHeader><DialogTitle className="font-display">Review Payment</DialogTitle><DialogDescription>Verify the UPI reference and approve or reject</DialogDescription></DialogHeader>
            <div className="py-4 space-y-4">
              <div className="rounded-lg bg-secondary/50 p-4"><p className="text-sm text-muted-foreground">UPI Reference</p><p className="font-mono font-medium">UPI123456789</p></div>
              <div className="border-2 border-dashed rounded-lg p-8 text-center text-muted-foreground">Screenshot preview placeholder</div>
            </div>
            <DialogFooter className="gap-2">
              <Button variant="destructive" onClick={() => handleReject(approveDialog!)} className="gap-2"><X className="h-4 w-4" />Reject</Button>
              <Button onClick={() => handleApprove(approveDialog!)} className="gap-2"><Check className="h-4 w-4" />Approve</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Return Inspection Dialog */}
        <Dialog open={!!returnDialog} onOpenChange={() => setReturnDialog(null)}>
          <DialogContent>
            <DialogHeader><DialogTitle className="font-display">Return Inspection 🔍</DialogTitle><DialogDescription>Check the game components and issue fines if needed</DialogDescription></DialogHeader>
            <div className="py-4 space-y-4">
              <div className="rounded-lg bg-status-partial/10 border border-status-partial/30 p-3 flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-status-partial shrink-0" />
                <p className="text-sm">Check all components carefully before completing</p>
              </div>
              <div className="grid gap-2"><Label>Fine Amount (₹)</Label><Input type="number" placeholder="0" value={fineAmount} onChange={e => setFineAmount(e.target.value)} /></div>
              <div className="grid gap-2"><Label>Fine Reason</Label><Input placeholder="e.g., Missing dice, late return" value={fineReason} onChange={e => setFineReason(e.target.value)} /></div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setReturnDialog(null)}>Cancel</Button>
              <Button onClick={handleCompleteReturn}>Complete Return</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Admin;
