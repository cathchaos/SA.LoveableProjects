export const SHIPMENT_STATUS = {
  pending: {
    label: 'Σε αναμονή',
    labelEn: 'Pending',
    description: 'Η αποστολή σας έχει καταχωρηθεί',
    color: 'status-pending',
  },
  received_greece: {
    label: 'Παραλήφθηκε στην Ελλάδα',
    labelEn: 'Received in Greece',
    description: 'Το δέμα σας έχει παραληφθεί στη διεύθυνση Ελλάδας',
    color: 'status-received',
  },
  consolidating: {
    label: 'Σε ενοποίηση',
    labelEn: 'Consolidating',
    description: 'Τα δέματά σας προετοιμάζονται για αποστολή',
    color: 'status-consolidating',
  },
  shipped_cyprus: {
    label: 'Στάλθηκε στην Κύπρο',
    labelEn: 'Shipped to Cyprus',
    description: 'Η αποστολή σας βρίσκεται καθ\' οδόν προς την Κύπρο',
    color: 'status-shipped',
  },
  ready_pickup: {
    label: 'Έτοιμο για παραλαβή',
    labelEn: 'Ready for Pickup',
    description: 'Η αποστολή σας είναι έτοιμη για παραλαβή στο locker',
    color: 'status-ready',
  },
  delivered: {
    label: 'Παραδόθηκε',
    labelEn: 'Delivered',
    description: 'Η αποστολή σας έχει παραδοθεί',
    color: 'status-delivered',
  },
} as const;

export type ShipmentStatusKey = keyof typeof SHIPMENT_STATUS;

export const SHIPMENT_STATUSES = [
  { value: 'pending', label: 'Σε αναμονή' },
  { value: 'received_greece', label: 'Παραλήφθηκε στην Ελλάδα' },
  { value: 'consolidating', label: 'Σε ενοποίηση' },
  { value: 'shipped_cyprus', label: 'Στάλθηκε στην Κύπρο' },
  { value: 'ready_pickup', label: 'Έτοιμο για παραλαβή' },
  { value: 'delivered', label: 'Παραδόθηκε' },
] as const;

export const LOCKER_LOCATIONS = [
  { id: 'nicosia-mall', name: 'Nicosia Mall', address: 'Λεωφ. Λεμεσού, Λευκωσία' },
  { id: 'limassol-marina', name: 'Limassol Marina', address: 'Λιμάνι Λεμεσού' },
  { id: 'larnaca-airport', name: 'Larnaca Airport', address: 'Διεθνές Αεροδρόμιο Λάρνακας' },
  { id: 'paphos-kings', name: 'Kings Avenue Mall', address: 'Πάφος' },
  { id: 'paralimni-center', name: 'Paralimni Center', address: 'Παραλίμνι' },
];

export const COMPANY_INFO = {
  name: 'Box Now Cyprus',
  address: 'Λεμεσός, Κύπρος',
  email: 'info@boxnowcyprus.com',
  phone: '+357 25 000 000',
};
