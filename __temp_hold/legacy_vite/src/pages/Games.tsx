import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { GameCard } from '@/components/GameCard';
import { FiltersBar } from '@/components/FiltersBar';
import { mockGames } from '@/data/mockData';
import { GameCategory, GameStatus } from '@/types';

const Games = () => {
  const [category, setCategory] = useState<GameCategory | 'all'>('all');
  const [players, setPlayers] = useState(1);
  const [duration, setDuration] = useState(180);
  const [complexity, setComplexity] = useState(0);
  const [status, setStatus] = useState<GameStatus | 'all'>('all');

  const filteredGames = useMemo(() => {
    return mockGames.filter((game) => {
      if (category !== 'all' && game.category !== category) return false;
      if (game.maxPlayers < players) return false;
      if (game.durationMinutes > duration) return false;
      if (complexity > 0 && game.complexity > complexity) return false;
      if (status !== 'all' && game.status !== status) return false;
      return true;
    });
  }, [category, players, duration, complexity, status]);

  const handleReset = () => {
    setCategory('all');
    setPlayers(1);
    setDuration(180);
    setComplexity(0);
    setStatus('all');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground">
            Game Library 🎮
          </h1>
          <p className="mt-2 text-muted-foreground">
            {mockGames.length} games ready for your next adventure
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <FiltersBar
            category={category}
            setCategory={setCategory}
            players={players}
            setPlayers={setPlayers}
            duration={duration}
            setDuration={setDuration}
            complexity={complexity}
            setComplexity={setComplexity}
            status={status}
            setStatus={setStatus}
            onReset={handleReset}
          />
        </div>

        {/* Results */}
        {filteredGames.length === 0 ? (
          <div className="rounded-2xl bg-card p-12 text-center shadow-card border border-border">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="font-display text-xl font-semibold text-foreground">
              No games found
            </h3>
            <p className="mt-2 text-muted-foreground">
              Try adjusting your filters to find what you're looking for
            </p>
          </div>
        ) : (
          <>
            <p className="mb-4 text-sm text-muted-foreground">
              Showing {filteredGames.length} game{filteredGames.length !== 1 ? 's' : ''}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Games;
