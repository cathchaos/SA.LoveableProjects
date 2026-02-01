import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from './StatusBadge';
import { Shipment } from '@/hooks/useShipments';
import { Package, Calendar, MapPin, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ShipmentCardProps {
  shipment: Shipment;
}

export function ShipmentCard({ shipment }: ShipmentCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg font-mono">
              {shipment.tracking_code}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {shipment.description || 'Χωρίς περιγραφή'}
            </p>
          </div>
          <StatusBadge status={shipment.status} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Package className="w-4 h-4" />
            <span>{shipment.parcel_count} δέμα(τα)</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{new Date(shipment.created_at).toLocaleDateString('el-GR')}</span>
          </div>
          {shipment.locker_destination && (
            <div className="flex items-center gap-2 text-muted-foreground col-span-2">
              <MapPin className="w-4 h-4" />
              <span>{shipment.locker_destination}</span>
            </div>
          )}
        </div>
        <Button variant="outline" size="sm" className="w-full group" asChild>
          <Link to={`/shipment/${shipment.id}`}>
            Λεπτομέρειες
            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
