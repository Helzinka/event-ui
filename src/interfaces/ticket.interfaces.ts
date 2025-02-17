import { ActivityResponse } from '@/interfaces/activity.interface';
import { UserResponse } from '@/interfaces/user.interface';
import { z } from 'zod';

export const TicketCreateArg = z.object({
  online: z.boolean(),
  ownerId: z
    .number({
      invalid_type_error: 'ownerId must be type number',
      required_error: 'ownerId is required',
    })
    .nonnegative({ message: 'ownerId must be > 0' }),
  activityId: z
    .number({
      invalid_type_error: 'activityId must be type number',
      required_error: 'activityId is required',
    })
    .nonnegative({ message: 'activityId must be > 0' }),
});
export const TicketUpdateArg = z.object({
  id: z.number().int(),
  online: z.boolean().optional(),
  used: z.boolean().optional(),
  ownerId: z
    .number({
      invalid_type_error: 'ownerId must be type number',
      required_error: 'ownerId is required',
    })
    .nonnegative({ message: 'ownerId must be > 0' })
    .optional(),
  activityId: z
    .number({
      invalid_type_error: 'activityId must be type number',
      required_error: 'activityId is required',
    })
    .nonnegative({ message: 'activityId must be > 0' })
    .optional(),
});
export const TicketResponse = z.object({
  id: z.number().int(),
  online: z.boolean(),
  used: z.boolean(),
  ownerId: z
    .number({
      invalid_type_error: 'ownerId must be type number',
      required_error: 'ownerId is required',
    })
    .nonnegative({ message: 'ownerId must be > 0' }),
  activityId: z
    .number({
      invalid_type_error: 'activityId must be type number',
      required_error: 'activityId is required',
    })
    .nonnegative({ message: 'activityId must be > 0' }),
  owner: UserResponse.optional(),
  activity: ActivityResponse.optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
export const TicketsResponse = z.array(TicketResponse);
export const TicketDeleteArg = z.object({ id: z.string().transform(Number) });
export const TicketFindOneArg = z.object({
  id: z
    .string()
    .transform(val => {
      const num = Number(val);
      if (isNaN(num)) {
        throw new Error('Invalid number format');
      }
      return num;
    })
    .optional(),
  ownerId: z
    .string()
    .transform(val => {
      const num = Number(val);
      if (isNaN(num)) {
        throw new Error('Invalid number format');
      }
      return num;
    })
    .optional(),
  activityId: z
    .string()
    .transform(val => {
      const num = Number(val);
      if (isNaN(num)) {
        throw new Error('Invalid number format');
      }
      return num;
    })
    .optional(),
});
export const TicketFindArg = z.object({
  ownerId: z.string().transform(Number).optional(),
  activityId: z.string().transform(Number).optional(),
});

export type TicketCreateArg = z.infer<typeof TicketCreateArg>;
export type TicketUpdateArg = z.infer<typeof TicketUpdateArg>;
export type TicketDeleteArg = z.infer<typeof TicketDeleteArg>;
export type TicketFindOneArg = z.infer<typeof TicketFindOneArg>;
export type TicketFindArg = z.infer<typeof TicketFindArg>;
export type TicketResponse = z.infer<typeof TicketResponse>;
export type TicketsResponse = z.infer<typeof TicketsResponse>;
