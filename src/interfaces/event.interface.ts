import { any, string, z } from 'zod';

export const EventCreateArg = z.object({
  title: z.string({
    invalid_type_error: 'title must be type string',
    required_error: 'title is required',
  }),
  description: z.string({
    invalid_type_error: 'description must be type string',
    required_error: 'description is required',
  }),
  location: z.string({
    invalid_type_error: 'location must be type string',
    required_error: 'location is required',
  }),
  start: z.coerce.date({
    invalid_type_error: 'start must be type date',
    required_error: 'start is required',
  }),
  end: z.coerce.date({
    invalid_type_error: 'end must be type date',
    required_error: 'end is required',
  }),
  private: z.boolean().default(false).optional(),
  guest: z.array(z.object({})),
});
export const EventUpdateArg = z.object({
  id: z.number().int(),
  title: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
  start: z.coerce.date().optional(),
  end: z.coerce.date().optional(),
  private: z.boolean().optional(),
  guest: z.array(z.object({})),
});
export const Event = z.object({
  id: z.number().int(),
  title: z.string(),
  description: z.string(),
  location: z.string(),
  start: z.coerce.date(),
  end: z.coerce.date(),
  private: z.boolean(),
  guestId: z.union([z.number().int(), z.null()]),
  guest: z.object({}).optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
export const EventFindOneArg = z.object({
  id: z.string().transform(Number).optional(),
  title: z.string().optional(),
});
export const Events = z.array(Event);
export const EventDeleteArg = z.object({ id: z.string().transform(Number) });
export const EventFileArg = z.object({
  page: string(),
  file: any(),
});
export const FileResponse = z.object({
  message: z.string(),
  data: z.array(z.object({})),
});

export type EventCreateArg = z.infer<typeof EventCreateArg>;
export type EventUpdateArg = z.infer<typeof EventUpdateArg>;
export type EventFindOneArg = z.infer<typeof EventFindOneArg>;
export type Event = z.infer<typeof Event>;
export type Events = z.infer<typeof Events>;
export type EventDeleteArg = z.infer<typeof EventDeleteArg>;
export type EventFileArg = z.infer<typeof EventFileArg>;
export type FileResponse = z.infer<typeof FileResponse>;
