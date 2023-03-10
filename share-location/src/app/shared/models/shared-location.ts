import { LocationPosition } from './location-position';

export interface SharedLocation {
  id: string;
  name: string;
  position: LocationPosition;
  type: string;
  logo: string;
  color: string;
}
