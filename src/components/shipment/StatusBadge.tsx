import { SHIPMENT_STATUS, ShipmentStatusKey } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: ShipmentStatusKey;
  size?: 'sm' | 'md' | 'lg';
}

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const statusInfo = SHIPMENT_STATUS[status];

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        sizeClasses[size],
        {
          'bg-warning/20 text-warning': status === 'pending',
          'bg-info/20 text-info': status === 'received_greece',
          'bg-purple-100 text-purple-700': status === 'consolidating',
          'bg-success/20 text-success': status === 'shipped_cyprus',
          'bg-green-100 text-green-700': status === 'ready_pickup',
          'bg-primary/20 text-primary': status === 'delivered',
        }
      )}
    >
      {statusInfo.label}
    </span>
  );
}
