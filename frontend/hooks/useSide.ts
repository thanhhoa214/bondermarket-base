import { useState } from 'react';

export type Side = 'yes' | 'no';
export function useSide(side?: Side) {
  return useState<Side | undefined>(side);
}
