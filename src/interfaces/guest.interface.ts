import { EventResponse } from '@/interfaces/event.interface';
import { UserGuestCreateArg, UsersResponse } from '@/interfaces/user.interface';
import { z } from 'zod';

export const GuestCreateArg = z.object({
  title: z.string({
    invalid_type_error: 'title must be type string',
    required_error: 'title is required',
  }),
  user: UserGuestCreateArg.array(),
  eventId: z.number().int(),
});
export const GuestResponse = z.object({
  id: z.number().int(),
  title: z.string(),
  eventId: z.number().int(),
  event: EventResponse.optional(),
  user: UsersResponse.optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
export const GuestUpdateArg = z.object({
  id: z.number().int(),
  title: z.string().optional(),
  user: UserGuestCreateArg.array().optional(),
});
export const GuestsResponse = z.array(GuestResponse);
export const GuestDeleteArg = z.object({ id: z.string().transform(Number) });
export const GuestFindOneArg = z.object({
  id: z.string().transform(Number).optional(),
  title: z.string().optional(),
});

export type GuestCreateArg = z.infer<typeof GuestCreateArg>;
export type GuestUpdateArg = z.infer<typeof GuestUpdateArg>;
export type GuestResponse = z.infer<typeof GuestResponse>;
export type GuestsResponse = z.infer<typeof GuestsResponse>;
export type GuestDeleteArg = z.infer<typeof GuestDeleteArg>;
export type GuestFindOneArg = z.infer<typeof GuestFindOneArg>;
