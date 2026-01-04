import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { StatusBadge } from '@/components/StatusBadge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { mockGames } from '@/data/mockData';
import {
  Users,
  Clock,
  Puzzle,
  BookOpen,
  Package,
  Bell,
  ArrowLeft,
  Calendar,
  AlertTriangle,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const GameDetail = () => {
  const { id } = useParams();
  const game = mockGames.find((g) => g.id === id);
  const [rentDialogOpen, setRentDialogOpen] = useState(false);
  const [notifyDialogOpen, setNotifyDialogOpen] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  if (!game) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-16 text-center">
          <div className="text-6xl mb-4">🎲</div>
          <h1 className="font-display text-2xl font-bold">Game not found</h1>
          <p className="mt-2 text-muted-foreground">
            This game might have rolled away...
          </p>
          <Link to="/games">
            <Button className="mt-6">Back to Games</Button>
          </Link>
        </div>
      </div>
    );
  }

  const complexityStars = (level: number) => {
    return '🎯'.repeat(level) + '○'.repeat(5 - level);
  };

  const canRent = game.status === 'available' || game.status === 'partially_playable';

  const handleRentSubmit = () => {
    setRentDialogOpen(false);
    toast.success('Rental request submitted!', {
      description: 'Upload your payment proof to continue.',
    });
  };

  const handleNotify = () => {
    setNotifyDialogOpen(false);
    toast.success("You're on the list! 🔔", {
      description: "We'll notify you when this game becomes available.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8">
        {/* Back button */}
        <Link
          to="/games"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Games
        </Link>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
              <img
                src={game.images[0]}
                alt={game.name}
                className="h-full w-full object-cover"
              />
            </div>
            {/* Partially playable warning */}
            {game.status === 'partially_playable' && (
              <div className="flex items-start gap-3 rounded-xl bg-status-partial/10 border border-status-partial/30 p-4">
                <AlertTriangle className="h-5 w-5 text-status-partial shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-status-partial">
                    Heads up! This one's got a few quirks 🔧
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Some components might be missing or damaged. Still playable, just... with character.
                    Ask admin for details before renting!
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary capitalize">
                  {game.category}
                </span>
                <h1 className="mt-3 font-display text-3xl font-bold text-foreground">
                  {game.name}
                </h1>
              </div>
              <StatusBadge status={game.status} />
            </div>

            <p className="mt-4 text-muted-foreground leading-relaxed">
              {game.description}
            </p>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: Users, label: 'Players', value: `${game.minPlayers}-${game.maxPlayers}` },
                { icon: Clock, label: 'Duration', value: `${game.durationMinutes}m` },
                { icon: Puzzle, label: 'Complexity', value: complexityStars(game.complexity) },
                { icon: BookOpen, label: 'Rules', value: 'PDF' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl bg-secondary/50 p-4 text-center"
                >
                  <stat.icon className="h-5 w-5 mx-auto text-primary" />
                  <p className="mt-2 text-sm font-medium text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-wrap gap-3">
              {canRent ? (
                <Dialog open={rentDialogOpen} onOpenChange={setRentDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" className="gap-2 font-display">
                      <Calendar className="h-5 w-5" />
                      Rent this game
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="font-display">
                        Rent {game.name}
                      </DialogTitle>
                      <DialogDescription>
                        Pick your dates and we'll get you rolling! 🎲
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="start">Start Date</Label>
                        <Input
                          id="start"
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="end">End Date</Label>
                        <Input
                          id="end"
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setRentDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleRentSubmit}>Continue to Payment</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              ) : (
                <Dialog open={notifyDialogOpen} onOpenChange={setNotifyDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="lg" variant="secondary" className="gap-2 font-display">
                      <Bell className="h-5 w-5" />
                      Notify me when available
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="font-display">
                        Get notified 🔔
                      </DialogTitle>
                      <DialogDescription>
                        We'll ping you the moment {game.name} becomes available!
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-4">
                      <Button variant="outline" onClick={() => setNotifyDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleNotify}>Notify Me</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
              {game.rulesUrl && (
                <Button variant="outline" size="lg" className="gap-2">
                  <BookOpen className="h-5 w-5" />
                  View Rules
                </Button>
              )}
            </div>

            {/* Components */}
            <Card className="mt-8">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Package className="h-5 w-5 text-primary" />
                  <h3 className="font-display text-lg font-semibold">What's in the Box</h3>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {game.components.map((component, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {component}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GameDetail;
