import { RentalStatus } from '@/types';
import { cn } from '@/lib/utils';
import { Check, Clock, CreditCard, PackageCheck, RotateCcw, X } from 'lucide-react';

interface RentalTimelineProps {
  currentStatus: RentalStatus;
  showAll?: boolean;
}

interface TimelineStep {
  status: RentalStatus;
  label: string;
  icon: React.ReactNode;
  description: string;
}

const allSteps: TimelineStep[] = [
  {
    status: 'pending_payment',
    label: 'Payment Pending',
    icon: <CreditCard className="h-4 w-4" />,
    description: 'Upload your UPI payment',
  },
  {
    status: 'pending_approval',
    label: 'Awaiting Approval',
    icon: <Clock className="h-4 w-4" />,
    description: 'Admin is reviewing your payment',
  },
  {
    status: 'confirmed',
    label: 'Confirmed',
    icon: <Check className="h-4 w-4" />,
    description: 'Ready for pickup!',
  },
  {
    status: 'active',
    label: 'Active',
    icon: <PackageCheck className="h-4 w-4" />,
    description: 'Game is with you',
  },
  {
    status: 'return_requested',
    label: 'Return Requested',
    icon: <RotateCcw className="h-4 w-4" />,
    description: 'Waiting for inspection',
  },
  {
    status: 'completed',
    label: 'Completed',
    icon: <Check className="h-4 w-4" />,
    description: 'Thanks for playing! 🎉',
  },
];

const statusOrder: RentalStatus[] = [
  'pending_payment',
  'pending_approval',
  'confirmed',
  'active',
  'return_requested',
  'completed',
];

export const RentalTimeline = ({ currentStatus, showAll = false }: RentalTimelineProps) => {
  const currentIndex = statusOrder.indexOf(currentStatus);
  const isCancelled = currentStatus === 'cancelled';

  if (isCancelled) {
    return (
      <div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-destructive">
        <X className="h-5 w-5" />
        <span className="font-medium">Rental Cancelled</span>
      </div>
    );
  }

  const steps = showAll ? allSteps : allSteps.slice(0, currentIndex + 2);

  return (
    <div className="space-y-1">
      {steps.map((step, index) => {
        const stepIndex = statusOrder.indexOf(step.status);
        const isCompleted = stepIndex < currentIndex;
        const isCurrent = stepIndex === currentIndex;
        const isFuture = stepIndex > currentIndex;

        return (
          <div key={step.status} className="flex items-start gap-3">
            {/* Line and dot */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors',
                  isCompleted && 'border-primary bg-primary text-primary-foreground',
                  isCurrent && 'border-primary bg-primary/10 text-primary',
                  isFuture && 'border-muted bg-muted text-muted-foreground'
                )}
              >
                {step.icon}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'w-0.5 h-8 transition-colors',
                    isCompleted ? 'bg-primary' : 'bg-muted'
                  )}
                />
              )}
            </div>

            {/* Content */}
            <div className="pt-1">
              <p
                className={cn(
                  'font-medium text-sm',
                  isCurrent && 'text-primary',
                  isFuture && 'text-muted-foreground'
                )}
              >
                {step.label}
                {isCurrent && (
                  <span className="ml-2 inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                    Current
                  </span>
                )}
              </p>
              <p className="text-xs text-muted-foreground">{step.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
