import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Dice5, Calendar, Sparkles, Users, Package, Star } from 'lucide-react';
import { mockGames, mockEvents } from '@/data/mockData';
import { GameCard } from '@/components/GameCard';
import { EventCard } from '@/components/EventCard';

const Home = () => {
  const featuredGames = mockGames.filter((g) => g.status === 'available').slice(0, 4);
  const upcomingEvents = mockEvents.filter((e) => e.status === 'open' || e.status === 'full');

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero py-20 lg:py-32">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-8xl animate-bounce-slow">🎲</div>
          <div className="absolute top-32 right-20 text-6xl animate-bounce-slow" style={{ animationDelay: '0.5s' }}>🃏</div>
          <div className="absolute bottom-20 left-1/4 text-7xl animate-bounce-slow" style={{ animationDelay: '1s' }}>🧩</div>
          <div className="absolute bottom-10 right-10 text-5xl animate-bounce-slow" style={{ animationDelay: '0.3s' }}>♟️</div>
        </div>
        
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center text-primary-foreground">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur">
              <Sparkles className="h-4 w-4" />
              Your hostel's board game paradise
            </div>
            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-balance">
              Roll the dice on your next game night! 🎲
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/90 text-balance">
              Rent awesome board games for your room hangouts, or join our legendary Saturday Night events. 
              No boring evenings allowed.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link to="/games">
                <Button size="lg" variant="secondary" className="gap-2 font-display text-lg shadow-hover">
                  <Dice5 className="h-5 w-5" />
                  Browse Games
                </Button>
              </Link>
              <Link to="/events">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 font-display text-lg border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <Calendar className="h-5 w-5" />
                  Saturday Night
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-card py-8">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: Package, value: '50+', label: 'Games Available' },
              { icon: Users, value: '100+', label: 'Happy Players' },
              { icon: Calendar, value: '52', label: 'Events This Year' },
              { icon: Star, value: '4.9', label: 'Satisfaction Rate' },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <stat.icon className="h-6 w-6 text-primary" />
                <span className="font-display text-2xl font-bold text-foreground">{stat.value}</span>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Games */}
      <section className="py-16">
        <div className="container">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">
                Ready to Play 🎮
              </h2>
              <p className="mt-1 text-muted-foreground">
                Grab one of these beauties for your next game night
              </p>
            </div>
            <Link to="/games">
              <Button variant="ghost" className="gap-2">
                View All
                <span>→</span>
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="bg-secondary/50 py-16">
        <div className="container">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">
                Saturday Nights 🌙
              </h2>
              <p className="mt-1 text-muted-foreground">
                The hottest board game events in the hostel
              </p>
            </div>
            <Link to="/events">
              <Button variant="ghost" className="gap-2">
                All Events
                <span>→</span>
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16">
        <div className="container">
          <h2 className="font-display text-2xl font-bold text-foreground text-center mb-12">
            How Boardy Works 🎯
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Pick a Game',
                description: 'Browse our collection and find your next obsession. Filter by players, duration, or vibe.',
                emoji: '🎲',
              },
              {
                step: '2',
                title: 'Pay & Get Approved',
                description: 'Quick UPI payment, admin approval, and you\'re good to go. Usually takes minutes!',
                emoji: '✅',
              },
              {
                step: '3',
                title: 'Play & Return',
                description: 'Enjoy your game nights! Return it when done, and maybe rent another? 😏',
                emoji: '🎉',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative rounded-2xl bg-card p-6 shadow-card border border-border text-center group hover:shadow-hover transition-all"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-display font-bold">
                  {item.step}
                </div>
                <div className="mb-4 text-4xl">{item.emoji}</div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8">
        <div className="container text-center">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Dice5 className="h-5 w-5" />
            <span className="font-display font-semibold">Boardy</span>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Made with 🎲 for board game lovers everywhere
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
