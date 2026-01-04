import { Header } from '@/components/Header';
import { EventCard } from '@/components/EventCard';
import { mockEvents } from '@/data/mockData';
import { CalendarDays, Sparkles } from 'lucide-react';

const Events = () => {
  const upcomingEvents = mockEvents.filter(
    (e) => e.status === 'open' || e.status === 'full'
  );
  const pastEvents = mockEvents.filter(
    (e) => e.status === 'completed' || e.status === 'cancelled'
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden gradient-hero py-16">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-5 left-10 text-6xl">🌙</div>
          <div className="absolute bottom-5 right-10 text-5xl">🎲</div>
        </div>
        <div className="container relative z-10 text-center text-primary-foreground">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur mb-4">
            <CalendarDays className="h-4 w-4" />
            Every Saturday Night
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold">
            Saturday Night Game Sessions 🎉
          </h1>
          <p className="mt-4 text-primary-foreground/90 max-w-xl mx-auto">
            Join fellow board game enthusiasts for epic battles, hilarious moments, 
            and memories that'll last longer than a game of Monopoly.
          </p>
        </div>
      </section>

      <main className="container py-8">
        {/* Upcoming Events */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="h-5 w-5 text-primary" />
            <h2 className="font-display text-2xl font-bold text-foreground">
              Upcoming Events
            </h2>
          </div>

          {upcomingEvents.length === 0 ? (
            <div className="rounded-2xl bg-card p-12 text-center shadow-card border border-border">
              <div className="text-5xl mb-4">📅</div>
              <h3 className="font-display text-xl font-semibold">
                No upcoming events
              </h3>
              <p className="mt-2 text-muted-foreground">
                Check back soon! We're cooking up something fun.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </section>

        {/* How it works */}
        <section className="mt-16 rounded-2xl bg-secondary/50 p-8">
          <h3 className="font-display text-xl font-bold text-foreground text-center mb-8">
            How Saturday Nights Work 🌙
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Register', desc: 'Grab your spot before it fills up!', emoji: '✍️' },
              { step: '2', title: 'Pay ₹50', desc: 'Quick UPI payment for snacks & more', emoji: '💸' },
              { step: '3', title: 'Show Up', desc: 'Saturday 7 PM, common room', emoji: '🚪' },
              { step: '4', title: 'Play!', desc: 'Epic games, new friends, zero regrets', emoji: '🎲' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mb-2 text-3xl">{item.emoji}</div>
                <div className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold mb-2">
                  {item.step}
                </div>
                <h4 className="font-display font-semibold text-foreground">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Past Events */}
        {pastEvents.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">
              Past Events
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-60">
              {pastEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Events;
