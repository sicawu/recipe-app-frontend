import React from 'react';
import { Clock, UtensilsCrossed, Flame, Star, Pencil } from 'lucide-react';

export function ClockIcon(props) {
  return <Clock className="w-4 h-4 flex-shrink-0" strokeWidth={2.5} {...props} />;
}

export function PrepIcon(props) {
  return <UtensilsCrossed className="w-4 h-4 flex-shrink-0" strokeWidth={2.5} {...props} />;
}

export function CookIcon(props) {
  return <Flame className="w-4 h-4 flex-shrink-0" strokeWidth={2.5} {...props} />;
}

export function DifficultyIcon(props) {
  return <Star className="w-4 h-4 flex-shrink-0" strokeWidth={2.5} {...props} />;
}

export function PencilIcon(props) {
  return <Pencil className="w-5 h-5 flex-shrink-0" strokeWidth={2} {...props} />;
}

