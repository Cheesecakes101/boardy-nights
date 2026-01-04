import { Game } from '@/types';
import { StatusBadge } from './StatusBadge';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Clock, Puzzle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface GameCardProps {
  game: Game;
}

const complexityStars = (level: number) => {
  return '🎯'.repeat(level) + '○'.repeat(5 - level);
};

export const GameCard = ({ game }: GameCardProps) => {
  return (
    <Link to={`/games/${game.id}`}>
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-hover hover:-translate-y-1 cursor-pointer">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={game.images[0]}
            alt={game.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-3 right-3">
            <StatusBadge status={game.status} size="sm" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/80 to-transparent p-3">
            <span className="inline-block rounded-full bg-primary/90 px-2 py-0.5 text-xs font-medium text-primary-foreground capitalize">
              {game.category}
            </span>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {game.name}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {game.description}
          </p>
          <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              {game.minPlayers}-{game.maxPlayers}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {game.durationMinutes}m
            </span>
            <span className="flex items-center gap-1" title={`Complexity: ${game.complexity}/5`}>
              <Puzzle className="h-3.5 w-3.5" />
              {complexityStars(game.complexity)}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
