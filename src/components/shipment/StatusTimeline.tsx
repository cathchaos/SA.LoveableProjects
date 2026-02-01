import { SHIPMENT_STATUS, ShipmentStatusKey } from '@/lib/constants';
import { Check, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatusTimelineProps {
  currentStatus: ShipmentStatusKey;
  history?: { status: ShipmentStatusKey; created_at: string }[];
}

const STATUS_ORDER: ShipmentStatusKey[] = [
  'pending',
  'received_greece',
  'consolidating',
  'shipped_cyprus',
  'ready_pickup',
  'delivered',
];

export function StatusTimeline({ currentStatus, history }: StatusTimelineProps) {
  const currentIndex = STATUS_ORDER.indexOf(currentStatus);

  return (
    <div className="space-y-4">
      {STATUS_ORDER.map((status, index) => {
        const statusInfo = SHIPMENT_STATUS[status];
        const isCompleted = index < currentIndex;
        const isCurrent = index === currentIndex;
        const historyEntry = history?.find(h => h.status === status);

        return (
          <div key={status} className="flex gap-4">
            {/* Timeline indicator */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center transition-colors',
                  {
                    'bg-primary text-primary-foreground': isCompleted || isCurrent,
                    'bg-muted text-muted-foreground': !isCompleted && !isCurrent,
                  }
                )}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Circle className="w-3 h-3" />
                )}
              </div>
              {index < STATUS_ORDER.length - 1 && (
                <div
                  className={cn('w-0.5 flex-1 min-h-[2rem] mt-2', {
                    'bg-primary': isCompleted,
                    'bg-muted': !isCompleted,
                  })}
                />
              )}
            </div>

            {/* Status info */}
            <div className="pb-6">
              <p
                className={cn('font-medium', {
                  'text-foreground': isCompleted || isCurrent,
                  'text-muted-foreground': !isCompleted && !isCurrent,
                })}
              >
                {statusInfo.label}
              </p>
              <p className="text-sm text-muted-foreground mt-0.5">
                {statusInfo.description}
              </p>
              {historyEntry && (
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date(historyEntry.created_at).toLocaleString('el-GR')}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
