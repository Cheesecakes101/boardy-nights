import { GameStatus } from '@/types';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: GameStatus;
  size?: 'sm' | 'md';
}

const statusConfig: Record<GameStatus, { label: string; emoji: string; className: string }> = {
  available: {
    label: 'Available',
    emoji: '✨',
    className: 'bg-status-available/15 text-status-available border-status-available/30',
  },
  booked: {
    label: 'Booked',
    emoji: '📅',
    className: 'bg-status-booked/15 text-status-booked border-status-booked/30',
  },
  partially_playable: {
    label: 'Playable-ish',
    emoji: '🔧',
    className: 'bg-status-partial/15 text-status-partial border-status-partial/30',
  },
  unavailable: {
    label: 'Unavailable',
    emoji: '🚫',
    className: 'bg-status-unavailable/15 text-status-unavailable border-status-unavailable/30',
  },
};

export const StatusBadge = ({ status, size = 'md' }: StatusBadgeProps) => {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border font-medium',
        config.className,
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'
      )}
    >
      <span>{config.emoji}</span>
      <span>{config.label}</span>
    </span>
  );
};
