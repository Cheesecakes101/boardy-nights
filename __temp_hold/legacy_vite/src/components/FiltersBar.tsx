import { GameCategory, GameStatus } from '@/types';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { X } from 'lucide-react';

interface FiltersBarProps {
  category: GameCategory | 'all';
  setCategory: (value: GameCategory | 'all') => void;
  players: number;
  setPlayers: (value: number) => void;
  duration: number;
  setDuration: (value: number) => void;
  complexity: number;
  setComplexity: (value: number) => void;
  status: GameStatus | 'all';
  setStatus: (value: GameStatus | 'all') => void;
  onReset: () => void;
}

const categories: { value: GameCategory | 'all'; label: string; emoji: string }[] = [
  { value: 'all', label: 'All Categories', emoji: '🎲' },
  { value: 'strategy', label: 'Strategy', emoji: '🧠' },
  { value: 'party', label: 'Party', emoji: '🎉' },
  { value: 'cooperative', label: 'Co-op', emoji: '🤝' },
  { value: 'family', label: 'Family', emoji: '👨‍👩‍👧‍👦' },
  { value: 'card', label: 'Card', emoji: '🃏' },
  { value: 'dice', label: 'Dice', emoji: '🎲' },
];

const statuses: { value: GameStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'Any Status' },
  { value: 'available', label: '✨ Available' },
  { value: 'booked', label: '📅 Booked' },
  { value: 'partially_playable', label: '🔧 Playable-ish' },
  { value: 'unavailable', label: '🚫 Unavailable' },
];

export const FiltersBar = ({
  category,
  setCategory,
  players,
  setPlayers,
  duration,
  setDuration,
  complexity,
  setComplexity,
  status,
  setStatus,
  onReset,
}: FiltersBarProps) => {
  const hasFilters =
    category !== 'all' || players > 1 || duration < 120 || complexity > 0 || status !== 'all';

  return (
    <div className="rounded-xl bg-card p-4 shadow-card border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg font-semibold">Find Your Game 🎯</h3>
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={onReset} className="text-muted-foreground">
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Category */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Category</Label>
          <Select value={category} onValueChange={(v) => setCategory(v as GameCategory | 'all')}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.emoji} {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Players */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">
            Players: {players}+
          </Label>
          <Slider
            value={[players]}
            onValueChange={(v) => setPlayers(v[0])}
            min={1}
            max={10}
            step={1}
            className="mt-3"
          />
        </div>

        {/* Duration */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">
            Max Duration: {duration}m
          </Label>
          <Slider
            value={[duration]}
            onValueChange={(v) => setDuration(v[0])}
            min={15}
            max={180}
            step={15}
            className="mt-3"
          />
        </div>

        {/* Complexity */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">
            Max Complexity: {complexity === 0 ? 'Any' : complexity}
          </Label>
          <Slider
            value={[complexity]}
            onValueChange={(v) => setComplexity(v[0])}
            min={0}
            max={5}
            step={1}
            className="mt-3"
          />
        </div>

        {/* Status */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Availability</Label>
          <Select value={status} onValueChange={(v) => setStatus(v as GameStatus | 'all')}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
