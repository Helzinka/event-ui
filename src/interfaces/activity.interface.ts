import { z } from 'zod';
import { TagSchema } from './tag.interface';

export const TypeRoomSchema = z.enum(['PLENIERE', 'NORMAL']);

export const ActivityCreateArg = z.object({
  typeRoom: TypeRoomSchema,
  title: z.string({
    invalid_type_error: 'title must be type string',
    required_error: 'title is required',
  }),
  description: z.string({
    invalid_type_error: 'description must be type string',
    required_error: 'description is required',
  }),
  roomName: z.string({
    invalid_type_error: 'roomName must be type string',
    required_error: 'roomName is required',
  }),
  speaker: z.string({
    invalid_type_error: 'speaker must be type string',
    required_error: 'speaker is required',
  }),
  image: z
    .string({
      invalid_type_error: 'image must be type string',
      required_error: 'image is required',
    })
    .optional()
    .nullable(),
  start: z.coerce.date({
    invalid_type_error: 'start must be type date',
    required_error: 'start is required',
  }),
  end: z.coerce.date({
    invalid_type_error: 'end must be type date',
    required_error: 'end is required',
  }),
  ticketMax: z.number({
    invalid_type_error: 'ticketMax must be type number',
    required_error: 'ticketMax is required',
  }),
  replay: z.string().url({ message: 'invalid url' }).optional().nullable(),
  eventId: z
    .number({
      invalid_type_error: 'eventId must be type number',
      required_error: 'eventId is required',
    })
    .nonnegative({ message: 'eventId must be > 0' }),
});

export const ActivityResponse = z.object({
  typeRoom: TypeRoomSchema,
  id: z.number().int(),
  title: z.string(),
  description: z.string(),
  roomName: z.string(),
  speaker: z.string(),
  image: z.string().nullable(),
  start: z.coerce.date(),
  end: z.coerce.date(),
  ticketMax: z.number(),
  ticketBuy: z.number(),
  replay: z.string().url().nullable(),
  eventId: z.number(),
  category: z.lazy(() => TagSchema.array()).nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
export const ActivityUpdateArg = z.object({
  typeRoom: TypeRoomSchema.optional(),
  id: z.number().int(),
  title: z
    .string({
      invalid_type_error: 'title must be type string',
      required_error: 'title is required',
    })
    .optional(),
  description: z
    .string({
      invalid_type_error: 'description must be type string',
      required_error: 'description is required',
    })
    .optional(),
  roomName: z
    .string({
      invalid_type_error: 'roomName must be type string',
      required_error: 'roomName is required',
    })
    .optional(),
  speaker: z
    .string({
      invalid_type_error: 'speaker must be type string',
      required_error: 'speaker is required',
    })
    .optional(),
  image: z
    .string({
      invalid_type_error: 'image must be type string',
      required_error: 'image is required',
    })
    .nullable()
    .optional(),
  start: z.coerce
    .date({
      invalid_type_error: 'start must be type date',
      required_error: 'start is required',
    })
    .optional(),
  end: z.coerce
    .date({
      invalid_type_error: 'end must be type date',
      required_error: 'end is required',
    })
    .optional(),
  ticketMax: z
    .number({
      invalid_type_error: 'ticketMax must be type number',
      required_error: 'ticketMax is required',
    })
    .optional(),

  ticketBuy: z
    .number({
      invalid_type_error: 'ticketBuy must be type number',
      required_error: 'ticketBuy is required',
    })
    .optional(),
  replay: z.string().url({ message: 'invalid url' }).optional().nullable(),
  eventId: z
    .number({
      invalid_type_error: 'eventId must be type number',
      required_error: 'eventId is required',
    })
    .nonnegative({ message: 'eventId must be > 0' })
    .optional(),
});
export const ActivitiesResponse = z.array(ActivityResponse);
export const ActivityDeleteArg = z.object({ id: z.number().int() });
export const ActivityFindOneArg = z.object({
  eventTitle: z.string(),
  id: z.string().transform(Number).optional(),
  title: z.string().optional(),
});
export const ActivitiesFindArg = z.object({
  eventTitle: z.string(),
});

export type ActivityCreateArg = z.infer<typeof ActivityCreateArg>;
export type ActivityUpdateArg = z.infer<typeof ActivityUpdateArg>;
export type ActivityResponse = z.infer<typeof ActivityResponse>;
export type ActivitiesResponse = z.infer<typeof ActivitiesResponse>;
export type ActivityDeleteArg = z.infer<typeof ActivityDeleteArg>;
export type ActivityFindOneArg = z.infer<typeof ActivityFindOneArg>;
export type ActivitiesFindArg = z.infer<typeof ActivitiesFindArg>;
