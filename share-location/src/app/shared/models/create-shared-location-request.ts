import { SharedLocation } from './shared-location';

export type CreateSharedLocationRequest = Omit<SharedLocation, 'id'>;
