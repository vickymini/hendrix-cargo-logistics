import React from 'react';
import {
  Package,
  Clock,
  Truck,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  XCircle,
  FileSearch,
  Building2,
  Plane,
} from 'lucide-react';
import { ShipmentStatus } from '../types';

interface StatusBadgeProps {
  status: ShipmentStatus | string;
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  let colorClasses = 'bg-slate-100 text-slate-700 border-slate-300';
  let Icon = Package;

  switch (status) {
    case 'Shipment Created':
      colorClasses = 'bg-blue-50 text-blue-700 border-blue-200';
      Icon = Package;
      break;
    case 'Processing':
      colorClasses = 'bg-indigo-50 text-indigo-700 border-indigo-200';
      Icon = Clock;
      break;
    case 'Picked Up':
      colorClasses = 'bg-sky-50 text-sky-700 border-sky-200';
      Icon = Truck;
      break;
    case 'In Transit':
      colorClasses = 'bg-amber-50 text-amber-800 border-amber-300';
      Icon = Plane;
      break;
    case 'Arrived at Facility':
      colorClasses = 'bg-teal-50 text-teal-700 border-teal-200';
      Icon = Building2;
      break;
    case 'Customs Clearance':
      colorClasses = 'bg-purple-50 text-purple-700 border-purple-200';
      Icon = FileSearch;
      break;
    case 'Out for Delivery':
      colorClasses = 'bg-cyan-50 text-cyan-800 border-cyan-300';
      Icon = Truck;
      break;
    case 'Delivered':
      colorClasses = 'bg-emerald-50 text-emerald-700 border-emerald-300 font-semibold';
      Icon = CheckCircle2;
      break;
    case 'Delivery Attempted':
      colorClasses = 'bg-yellow-50 text-yellow-800 border-yellow-300';
      Icon = AlertTriangle;
      break;
    case 'On Hold':
      colorClasses = 'bg-orange-50 text-orange-800 border-orange-300 font-medium';
      Icon = AlertTriangle;
      break;
    case 'Delayed':
      colorClasses = 'bg-rose-50 text-rose-800 border-rose-300 font-medium';
      Icon = AlertTriangle;
      break;
    case 'Returned to Sender':
      colorClasses = 'bg-zinc-100 text-zinc-700 border-zinc-300';
      Icon = RotateCcw;
      break;
    case 'Cancelled':
      colorClasses = 'bg-gray-100 text-gray-500 border-gray-300 line-through';
      Icon = XCircle;
      break;
    default:
      colorClasses = 'bg-slate-100 text-slate-700 border-slate-300';
      Icon = Package;
      break;
  }

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs sm:text-sm px-2.5 py-1 gap-1.5',
    lg: 'text-sm sm:text-base px-3.5 py-1.5 gap-2',
  }[size];

  return (
    <span
      className={`inline-flex items-center rounded-full border shadow-sm font-medium ${colorClasses} ${sizeClasses}`}
    >
      <Icon className={size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5'} />
      <span>{status}</span>
    </span>
  );
};
