import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum([
  'ReadUncommitted',
  'ReadCommitted',
  'RepeatableRead',
  'Serializable',
]);

export const UserScalarFieldEnumSchema = z.enum([
  'id',
  'email',
  'name',
  'lastname',
  'password',
  'company',
  'archipel',
  'role',
  'createdAt',
  'updatedAt',
]);

export const EventScalarFieldEnumSchema = z.enum([
  'id',
  'title',
  'description',
  'location',
  'start',
  'end',
  'createdAt',
  'updatedAt',
]);

export const ActivityScalarFieldEnumSchema = z.enum([
  'id',
  'title',
  'description',
  'roomName',
  'speaker',
  'image',
  'start',
  'end',
  'ticketMax',
  'ticketBuy',
  'replay',
  'typeRoom',
  'eventId',
  'createdAt',
  'updatedAt',
]);

export const TicketScalarFieldEnumSchema = z.enum([
  'id',
  'online',
  'used',
  'ownerId',
  'activityId',
  'createdAt',
  'updatedAt',
]);

export const TagScalarFieldEnumSchema = z.enum([
  'id',
  'name',
  'createdAt',
  'updatedAt',
]);

export const SortOrderSchema = z.enum(['asc', 'desc']);

export const NullsOrderSchema = z.enum(['first', 'last']);

export const RoleSchema = z.enum(['USER', 'MANAGER', 'ADMIN']);

export type RoleType = `${z.infer<typeof RoleSchema>}`;

export const TypeRoomSchema = z.enum(['PLENIERE', 'NORMAL']);

export type TypeRoomType = `${z.infer<typeof TypeRoomSchema>}`;

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  role: RoleSchema,
  id: z.number().int(),
  email: z.string().email({ message: 'invalid email address' }),
  name: z.string({
    invalid_type_error: 'name must be type string',
    required_error: 'name is required',
    description: 'schema validation error',
  }),
  lastname: z.string({
    invalid_type_error: 'lastname must be type string',
    required_error: 'lastname is required',
    description: 'schema validation error',
  }),
  password: z.string({
    invalid_type_error: 'password must be type string',
    required_error: 'password is required',
    description: 'schema validation error',
  }),
  company: z.string({
    invalid_type_error: 'company must be type string',
    required_error: 'company is required',
    description: 'schema validation error',
  }),
  archipel: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type User = z.infer<typeof UserSchema>;

/////////////////////////////////////////
// USER PARTIAL SCHEMA
/////////////////////////////////////////

export const UserPartialSchema = UserSchema.partial();

export type UserPartial = z.infer<typeof UserPartialSchema>;

// USER RELATION SCHEMA
//------------------------------------------------------

export type UserRelations = {
  tickets: TicketWithRelations[];
};

export type UserWithRelations = z.infer<typeof UserSchema> & UserRelations;

export const UserWithRelationsSchema: z.ZodType<UserWithRelations> =
  UserSchema.merge(
    z.object({
      tickets: z.lazy(() => TicketWithRelationsSchema).array(),
    })
  );

// USER PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type UserPartialRelations = {
  tickets?: TicketPartialWithRelations[];
};

export type UserPartialWithRelations = z.infer<typeof UserPartialSchema> &
  UserPartialRelations;

export const UserPartialWithRelationsSchema: z.ZodType<UserPartialWithRelations> =
  UserPartialSchema.merge(
    z.object({
      tickets: z.lazy(() => TicketPartialWithRelationsSchema).array(),
    })
  ).partial();

export type UserWithPartialRelations = z.infer<typeof UserSchema> &
  UserPartialRelations;

export const UserWithPartialRelationsSchema: z.ZodType<UserWithPartialRelations> =
  UserSchema.merge(
    z
      .object({
        tickets: z.lazy(() => TicketPartialWithRelationsSchema).array(),
      })
      .partial()
  );

/////////////////////////////////////////
// EVENT SCHEMA
/////////////////////////////////////////

export const EventSchema = z.object({
  id: z.number().int(),
  title: z.string({
    invalid_type_error: 'title must be type string',
    required_error: 'title is required',
    description: 'schema validation error',
  }),
  description: z.string({
    invalid_type_error: 'description must be type string',
    required_error: 'description is required',
    description: 'schema validation error',
  }),
  location: z.string({
    invalid_type_error: 'location must be type string',
    required_error: 'location is required',
    description: 'schema validation error',
  }),
  start: z.coerce.date({
    invalid_type_error: 'start must be type date',
    required_error: 'start is required',
    description: 'schema validation error',
  }),
  end: z.coerce.date({
    invalid_type_error: 'end must be type date',
    required_error: 'end is required',
    description: 'schema validation error',
  }),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Event = z.infer<typeof EventSchema>;

/////////////////////////////////////////
// EVENT PARTIAL SCHEMA
/////////////////////////////////////////

export const EventPartialSchema = EventSchema.partial();

export type EventPartial = z.infer<typeof EventPartialSchema>;

// EVENT RELATION SCHEMA
//------------------------------------------------------

export type EventRelations = {
  Activity: ActivityWithRelations[];
};

export type EventWithRelations = z.infer<typeof EventSchema> & EventRelations;

export const EventWithRelationsSchema: z.ZodType<EventWithRelations> =
  EventSchema.merge(
    z.object({
      Activity: z.lazy(() => ActivityWithRelationsSchema).array(),
    })
  );

// EVENT PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type EventPartialRelations = {
  Activity?: ActivityPartialWithRelations[];
};

export type EventPartialWithRelations = z.infer<typeof EventPartialSchema> &
  EventPartialRelations;

export const EventPartialWithRelationsSchema: z.ZodType<EventPartialWithRelations> =
  EventPartialSchema.merge(
    z.object({
      Activity: z.lazy(() => ActivityPartialWithRelationsSchema).array(),
    })
  ).partial();

export type EventWithPartialRelations = z.infer<typeof EventSchema> &
  EventPartialRelations;

export const EventWithPartialRelationsSchema: z.ZodType<EventWithPartialRelations> =
  EventSchema.merge(
    z
      .object({
        Activity: z.lazy(() => ActivityPartialWithRelationsSchema).array(),
      })
      .partial()
  );

/////////////////////////////////////////
// ACTIVITY SCHEMA
/////////////////////////////////////////

export const ActivitySchema = z.object({
  typeRoom: TypeRoomSchema,
  id: z.number().int(),
  title: z.string({
    invalid_type_error: 'title must be type string',
    required_error: 'title is required',
    description: 'schema validation error',
  }),
  description: z.string({
    invalid_type_error: 'description must be type string',
    required_error: 'description is required',
    description: 'schema validation error',
  }),
  roomName: z.string({
    invalid_type_error: 'roomName must be type string',
    required_error: 'roomName is required',
    description: 'schema validation error',
  }),
  speaker: z.string({
    invalid_type_error: 'speaker must be type string',
    required_error: 'speaker is required',
    description: 'schema validation error',
  }),
  image: z
    .string({
      invalid_type_error: 'image must be type string',
      required_error: 'image is required',
      description: 'schema validation error',
    })
    .nullable(),
  start: z.coerce.date({
    invalid_type_error: 'start must be type date',
    required_error: 'start is required',
    description: 'schema validation error',
  }),
  end: z.coerce.date({
    invalid_type_error: 'end must be type date',
    required_error: 'end is required',
    description: 'schema validation error',
  }),
  ticketMax: z.number({
    invalid_type_error: 'ticketMax must be type number',
    required_error: 'ticketMax is required',
    description: 'schema validation error',
  }),
  ticketBuy: z
    .number({
      invalid_type_error: 'ticketBuy must be type number',
      required_error: 'ticketBuy is required',
      description: 'schema validation error',
    })
    .nonnegative({ message: 'ticketMin must be >= 0' }),
  replay: z.string().url({ message: 'invalid url' }).nullable(),
  eventId: z
    .number({
      invalid_type_error: 'eventId must be type number',
      required_error: 'eventId is required',
      description: 'schema validation error',
    })
    .nonnegative({ message: 'eventId must be > 0' }),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Activity = z.infer<typeof ActivitySchema>;

/////////////////////////////////////////
// ACTIVITY PARTIAL SCHEMA
/////////////////////////////////////////

export const ActivityPartialSchema = ActivitySchema.partial();

export type ActivityPartial = z.infer<typeof ActivityPartialSchema>;

// ACTIVITY RELATION SCHEMA
//------------------------------------------------------

export type ActivityRelations = {
  event: EventWithRelations;
  ticket: TicketWithRelations[];
  category: TagWithRelations[];
};

export type ActivityWithRelations = z.infer<typeof ActivitySchema> &
  ActivityRelations;

export const ActivityWithRelationsSchema: z.ZodType<ActivityWithRelations> =
  ActivitySchema.merge(
    z.object({
      event: z.lazy(() => EventWithRelationsSchema),
      ticket: z.lazy(() => TicketWithRelationsSchema).array(),
      category: z.lazy(() => TagWithRelationsSchema).array(),
    })
  );

// ACTIVITY PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type ActivityPartialRelations = {
  event?: EventPartialWithRelations;
  ticket?: TicketPartialWithRelations[];
  category?: TagPartialWithRelations[];
};

export type ActivityPartialWithRelations = z.infer<
  typeof ActivityPartialSchema
> &
  ActivityPartialRelations;

export const ActivityPartialWithRelationsSchema: z.ZodType<ActivityPartialWithRelations> =
  ActivityPartialSchema.merge(
    z.object({
      event: z.lazy(() => EventPartialWithRelationsSchema),
      ticket: z.lazy(() => TicketPartialWithRelationsSchema).array(),
      category: z.lazy(() => TagPartialWithRelationsSchema).array(),
    })
  ).partial();

export type ActivityWithPartialRelations = z.infer<typeof ActivitySchema> &
  ActivityPartialRelations;

export const ActivityWithPartialRelationsSchema: z.ZodType<ActivityWithPartialRelations> =
  ActivitySchema.merge(
    z
      .object({
        event: z.lazy(() => EventPartialWithRelationsSchema),
        ticket: z.lazy(() => TicketPartialWithRelationsSchema).array(),
        category: z.lazy(() => TagPartialWithRelationsSchema).array(),
      })
      .partial()
  );

/////////////////////////////////////////
// TICKET SCHEMA
/////////////////////////////////////////

export const TicketSchema = z.object({
  id: z.number().int(),
  online: z.boolean(),
  used: z.boolean(),
  ownerId: z
    .number({
      invalid_type_error: 'ownerId must be type number',
      required_error: 'ownerId is required',
      description: 'schema validation error',
    })
    .nonnegative({ message: 'ownerId must be > 0' }),
  activityId: z
    .number({
      invalid_type_error: 'activityId must be type number',
      required_error: 'activityId is required',
      description: 'schema validation error',
    })
    .nonnegative({ message: 'activityId must be > 0' }),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Ticket = z.infer<typeof TicketSchema>;

/////////////////////////////////////////
// TICKET PARTIAL SCHEMA
/////////////////////////////////////////

export const TicketPartialSchema = TicketSchema.partial();

export type TicketPartial = z.infer<typeof TicketPartialSchema>;

// TICKET RELATION SCHEMA
//------------------------------------------------------

export type TicketRelations = {
  owner: UserWithRelations;
  activity: ActivityWithRelations;
};

export type TicketWithRelations = z.infer<typeof TicketSchema> &
  TicketRelations;

export const TicketWithRelationsSchema: z.ZodType<TicketWithRelations> =
  TicketSchema.merge(
    z.object({
      owner: z.lazy(() => UserWithRelationsSchema),
      activity: z.lazy(() => ActivityWithRelationsSchema),
    })
  );

// TICKET PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type TicketPartialRelations = {
  owner?: UserPartialWithRelations;
  activity?: ActivityPartialWithRelations;
};

export type TicketPartialWithRelations = z.infer<typeof TicketPartialSchema> &
  TicketPartialRelations;

export const TicketPartialWithRelationsSchema: z.ZodType<TicketPartialWithRelations> =
  TicketPartialSchema.merge(
    z.object({
      owner: z.lazy(() => UserPartialWithRelationsSchema),
      activity: z.lazy(() => ActivityPartialWithRelationsSchema),
    })
  ).partial();

export type TicketWithPartialRelations = z.infer<typeof TicketSchema> &
  TicketPartialRelations;

export const TicketWithPartialRelationsSchema: z.ZodType<TicketWithPartialRelations> =
  TicketSchema.merge(
    z
      .object({
        owner: z.lazy(() => UserPartialWithRelationsSchema),
        activity: z.lazy(() => ActivityPartialWithRelationsSchema),
      })
      .partial()
  );

/////////////////////////////////////////
// TAG SCHEMA
/////////////////////////////////////////

export const TagSchema = z.object({
  id: z.number().int(),
  name: z
    .string({
      invalid_type_error: 'name must be type string',
      required_error: 'name is required',
      description: 'schema validation error',
    })
    .min(3, { message: 'Must be 3 or more characters long' }),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Tag = z.infer<typeof TagSchema>;

/////////////////////////////////////////
// TAG PARTIAL SCHEMA
/////////////////////////////////////////

export const TagPartialSchema = TagSchema.partial();

export type TagPartial = z.infer<typeof TagPartialSchema>;

// TAG RELATION SCHEMA
//------------------------------------------------------

export type TagRelations = {
  activity: ActivityWithRelations[];
};

export type TagWithRelations = z.infer<typeof TagSchema> & TagRelations;

export const TagWithRelationsSchema: z.ZodType<TagWithRelations> =
  TagSchema.merge(
    z.object({
      activity: z.lazy(() => ActivityWithRelationsSchema).array(),
    })
  );

// TAG PARTIAL RELATION SCHEMA
//------------------------------------------------------

export type TagPartialRelations = {
  activity?: ActivityPartialWithRelations[];
};

export type TagPartialWithRelations = z.infer<typeof TagPartialSchema> &
  TagPartialRelations;

export const TagPartialWithRelationsSchema: z.ZodType<TagPartialWithRelations> =
  TagPartialSchema.merge(
    z.object({
      activity: z.lazy(() => ActivityPartialWithRelationsSchema).array(),
    })
  ).partial();

export type TagWithPartialRelations = z.infer<typeof TagSchema> &
  TagPartialRelations;

export const TagWithPartialRelationsSchema: z.ZodType<TagWithPartialRelations> =
  TagSchema.merge(
    z
      .object({
        activity: z.lazy(() => ActivityPartialWithRelationsSchema).array(),
      })
      .partial()
  );

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z
  .object({
    tickets: z
      .union([z.boolean(), z.lazy(() => TicketFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z
  .object({
    select: z.lazy(() => UserSelectSchema).optional(),
    include: z.lazy(() => UserIncludeSchema).optional(),
  })
  .strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> =
  z
    .object({
      tickets: z.boolean().optional(),
    })
    .strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z
  .object({
    id: z.boolean().optional(),
    email: z.boolean().optional(),
    name: z.boolean().optional(),
    lastname: z.boolean().optional(),
    password: z.boolean().optional(),
    company: z.boolean().optional(),
    archipel: z.boolean().optional(),
    role: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    tickets: z
      .union([z.boolean(), z.lazy(() => TicketFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

// EVENT
//------------------------------------------------------

export const EventIncludeSchema: z.ZodType<Prisma.EventInclude> = z
  .object({
    Activity: z
      .union([z.boolean(), z.lazy(() => ActivityFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => EventCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

export const EventArgsSchema: z.ZodType<Prisma.EventDefaultArgs> = z
  .object({
    select: z.lazy(() => EventSelectSchema).optional(),
    include: z.lazy(() => EventIncludeSchema).optional(),
  })
  .strict();

export const EventCountOutputTypeArgsSchema: z.ZodType<Prisma.EventCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => EventCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const EventCountOutputTypeSelectSchema: z.ZodType<Prisma.EventCountOutputTypeSelect> =
  z
    .object({
      Activity: z.boolean().optional(),
    })
    .strict();

export const EventSelectSchema: z.ZodType<Prisma.EventSelect> = z
  .object({
    id: z.boolean().optional(),
    title: z.boolean().optional(),
    description: z.boolean().optional(),
    location: z.boolean().optional(),
    start: z.boolean().optional(),
    end: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    Activity: z
      .union([z.boolean(), z.lazy(() => ActivityFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => EventCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

// ACTIVITY
//------------------------------------------------------

export const ActivityIncludeSchema: z.ZodType<Prisma.ActivityInclude> = z
  .object({
    event: z.union([z.boolean(), z.lazy(() => EventArgsSchema)]).optional(),
    ticket: z
      .union([z.boolean(), z.lazy(() => TicketFindManyArgsSchema)])
      .optional(),
    category: z
      .union([z.boolean(), z.lazy(() => TagFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => ActivityCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

export const ActivityArgsSchema: z.ZodType<Prisma.ActivityDefaultArgs> = z
  .object({
    select: z.lazy(() => ActivitySelectSchema).optional(),
    include: z.lazy(() => ActivityIncludeSchema).optional(),
  })
  .strict();

export const ActivityCountOutputTypeArgsSchema: z.ZodType<Prisma.ActivityCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => ActivityCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const ActivityCountOutputTypeSelectSchema: z.ZodType<Prisma.ActivityCountOutputTypeSelect> =
  z
    .object({
      ticket: z.boolean().optional(),
      category: z.boolean().optional(),
    })
    .strict();

export const ActivitySelectSchema: z.ZodType<Prisma.ActivitySelect> = z
  .object({
    id: z.boolean().optional(),
    title: z.boolean().optional(),
    description: z.boolean().optional(),
    roomName: z.boolean().optional(),
    speaker: z.boolean().optional(),
    image: z.boolean().optional(),
    start: z.boolean().optional(),
    end: z.boolean().optional(),
    ticketMax: z.boolean().optional(),
    ticketBuy: z.boolean().optional(),
    replay: z.boolean().optional(),
    typeRoom: z.boolean().optional(),
    eventId: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    event: z.union([z.boolean(), z.lazy(() => EventArgsSchema)]).optional(),
    ticket: z
      .union([z.boolean(), z.lazy(() => TicketFindManyArgsSchema)])
      .optional(),
    category: z
      .union([z.boolean(), z.lazy(() => TagFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => ActivityCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

// TICKET
//------------------------------------------------------

export const TicketIncludeSchema: z.ZodType<Prisma.TicketInclude> = z
  .object({
    owner: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
    activity: z
      .union([z.boolean(), z.lazy(() => ActivityArgsSchema)])
      .optional(),
  })
  .strict();

export const TicketArgsSchema: z.ZodType<Prisma.TicketDefaultArgs> = z
  .object({
    select: z.lazy(() => TicketSelectSchema).optional(),
    include: z.lazy(() => TicketIncludeSchema).optional(),
  })
  .strict();

export const TicketSelectSchema: z.ZodType<Prisma.TicketSelect> = z
  .object({
    id: z.boolean().optional(),
    online: z.boolean().optional(),
    used: z.boolean().optional(),
    ownerId: z.boolean().optional(),
    activityId: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    owner: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
    activity: z
      .union([z.boolean(), z.lazy(() => ActivityArgsSchema)])
      .optional(),
  })
  .strict();

// TAG
//------------------------------------------------------

export const TagIncludeSchema: z.ZodType<Prisma.TagInclude> = z
  .object({
    activity: z
      .union([z.boolean(), z.lazy(() => ActivityFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => TagCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

export const TagArgsSchema: z.ZodType<Prisma.TagDefaultArgs> = z
  .object({
    select: z.lazy(() => TagSelectSchema).optional(),
    include: z.lazy(() => TagIncludeSchema).optional(),
  })
  .strict();

export const TagCountOutputTypeArgsSchema: z.ZodType<Prisma.TagCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => TagCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const TagCountOutputTypeSelectSchema: z.ZodType<Prisma.TagCountOutputTypeSelect> =
  z
    .object({
      activity: z.boolean().optional(),
    })
    .strict();

export const TagSelectSchema: z.ZodType<Prisma.TagSelect> = z
  .object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    activity: z
      .union([z.boolean(), z.lazy(() => ActivityFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => TagCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => UserWhereInputSchema),
        z.lazy(() => UserWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => UserWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => UserWhereInputSchema),
        z.lazy(() => UserWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    email: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    lastname: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    password: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    company: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    archipel: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
    role: z
      .union([z.lazy(() => EnumRoleFilterSchema), z.lazy(() => RoleSchema)])
      .optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    tickets: z.lazy(() => TicketListRelationFilterSchema).optional(),
  })
  .strict() as z.ZodType<Prisma.UserWhereInput>;

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      email: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      lastname: z.lazy(() => SortOrderSchema).optional(),
      password: z.lazy(() => SortOrderSchema).optional(),
      company: z.lazy(() => SortOrderSchema).optional(),
      archipel: z.lazy(() => SortOrderSchema).optional(),
      role: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      tickets: z
        .lazy(() => TicketOrderByRelationAggregateInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.UserOrderByWithRelationInput>;

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.number().int(),
        email: z.string().email({ message: 'invalid email address' }),
      }),
      z.object({
        id: z.number().int(),
      }),
      z.object({
        email: z.string().email({ message: 'invalid email address' }),
      }),
    ])
    .and(
      z
        .object({
          id: z.number().int().optional(),
          email: z
            .string()
            .email({ message: 'invalid email address' })
            .optional(),
          AND: z
            .union([
              z.lazy(() => UserWhereInputSchema),
              z.lazy(() => UserWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => UserWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => UserWhereInputSchema),
              z.lazy(() => UserWhereInputSchema).array(),
            ])
            .optional(),
          name: z
            .union([
              z.lazy(() => StringFilterSchema),
              z.string({
                invalid_type_error: 'name must be type string',
                required_error: 'name is required',
                description: 'schema validation error',
              }),
            ])
            .optional(),
          lastname: z
            .union([
              z.lazy(() => StringFilterSchema),
              z.string({
                invalid_type_error: 'lastname must be type string',
                required_error: 'lastname is required',
                description: 'schema validation error',
              }),
            ])
            .optional(),
          password: z
            .union([
              z.lazy(() => StringFilterSchema),
              z.string({
                invalid_type_error: 'password must be type string',
                required_error: 'password is required',
                description: 'schema validation error',
              }),
            ])
            .optional(),
          company: z
            .union([
              z.lazy(() => StringFilterSchema),
              z.string({
                invalid_type_error: 'company must be type string',
                required_error: 'company is required',
                description: 'schema validation error',
              }),
            ])
            .optional(),
          archipel: z
            .union([z.lazy(() => BoolFilterSchema), z.boolean()])
            .optional(),
          role: z
            .union([
              z.lazy(() => EnumRoleFilterSchema),
              z.lazy(() => RoleSchema),
            ])
            .optional(),
          createdAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          updatedAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          tickets: z.lazy(() => TicketListRelationFilterSchema).optional(),
        })
        .strict()
    ) as z.ZodType<Prisma.UserWhereUniqueInput>;

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      email: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      lastname: z.lazy(() => SortOrderSchema).optional(),
      password: z.lazy(() => SortOrderSchema).optional(),
      company: z.lazy(() => SortOrderSchema).optional(),
      archipel: z.lazy(() => SortOrderSchema).optional(),
      role: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
      _avg: z.lazy(() => UserAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => UserSumOrderByAggregateInputSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.UserOrderByWithAggregationInput>;

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => UserScalarWhereWithAggregatesInputSchema),
          z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => UserScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => UserScalarWhereWithAggregatesInputSchema),
          z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      email: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      name: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      lastname: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      password: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      company: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      archipel: z
        .union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()])
        .optional(),
      role: z
        .union([
          z.lazy(() => EnumRoleWithAggregatesFilterSchema),
          z.lazy(() => RoleSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.UserScalarWhereWithAggregatesInput>;

export const EventWhereInputSchema: z.ZodType<Prisma.EventWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => EventWhereInputSchema),
        z.lazy(() => EventWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => EventWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => EventWhereInputSchema),
        z.lazy(() => EventWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    title: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    description: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    location: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    start: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    end: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    Activity: z.lazy(() => ActivityListRelationFilterSchema).optional(),
  })
  .strict() as z.ZodType<Prisma.EventWhereInput>;

export const EventOrderByWithRelationInputSchema: z.ZodType<Prisma.EventOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      location: z.lazy(() => SortOrderSchema).optional(),
      start: z.lazy(() => SortOrderSchema).optional(),
      end: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      Activity: z
        .lazy(() => ActivityOrderByRelationAggregateInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.EventOrderByWithRelationInput>;

export const EventWhereUniqueInputSchema: z.ZodType<Prisma.EventWhereUniqueInput> =
  z
    .object({
      id: z.number().int(),
    })
    .and(
      z
        .object({
          id: z.number().int().optional(),
          AND: z
            .union([
              z.lazy(() => EventWhereInputSchema),
              z.lazy(() => EventWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => EventWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => EventWhereInputSchema),
              z.lazy(() => EventWhereInputSchema).array(),
            ])
            .optional(),
          title: z
            .union([
              z.lazy(() => StringFilterSchema),
              z.string({
                invalid_type_error: 'title must be type string',
                required_error: 'title is required',
                description: 'schema validation error',
              }),
            ])
            .optional(),
          description: z
            .union([
              z.lazy(() => StringFilterSchema),
              z.string({
                invalid_type_error: 'description must be type string',
                required_error: 'description is required',
                description: 'schema validation error',
              }),
            ])
            .optional(),
          location: z
            .union([
              z.lazy(() => StringFilterSchema),
              z.string({
                invalid_type_error: 'location must be type string',
                required_error: 'location is required',
                description: 'schema validation error',
              }),
            ])
            .optional(),
          start: z
            .union([
              z.lazy(() => DateTimeFilterSchema),
              z.coerce.date({
                invalid_type_error: 'start must be type date',
                required_error: 'start is required',
                description: 'schema validation error',
              }),
            ])
            .optional(),
          end: z
            .union([
              z.lazy(() => DateTimeFilterSchema),
              z.coerce.date({
                invalid_type_error: 'end must be type date',
                required_error: 'end is required',
                description: 'schema validation error',
              }),
            ])
            .optional(),
          createdAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          updatedAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          Activity: z.lazy(() => ActivityListRelationFilterSchema).optional(),
        })
        .strict()
    ) as z.ZodType<Prisma.EventWhereUniqueInput>;

export const EventOrderByWithAggregationInputSchema: z.ZodType<Prisma.EventOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      location: z.lazy(() => SortOrderSchema).optional(),
      start: z.lazy(() => SortOrderSchema).optional(),
      end: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => EventCountOrderByAggregateInputSchema).optional(),
      _avg: z.lazy(() => EventAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => EventMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => EventMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => EventSumOrderByAggregateInputSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.EventOrderByWithAggregationInput>;

export const EventScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.EventScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => EventScalarWhereWithAggregatesInputSchema),
          z.lazy(() => EventScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => EventScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => EventScalarWhereWithAggregatesInputSchema),
          z.lazy(() => EventScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      title: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      description: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      location: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      start: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      end: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      createdAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.EventScalarWhereWithAggregatesInput>;

export const ActivityWhereInputSchema: z.ZodType<Prisma.ActivityWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => ActivityWhereInputSchema),
        z.lazy(() => ActivityWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ActivityWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ActivityWhereInputSchema),
        z.lazy(() => ActivityWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    title: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    description: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    roomName: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    speaker: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    image: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    start: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    end: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    ticketMax: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    ticketBuy: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    replay: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    typeRoom: z
      .union([
        z.lazy(() => EnumTypeRoomFilterSchema),
        z.lazy(() => TypeRoomSchema),
      ])
      .optional(),
    eventId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    event: z
      .union([
        z.lazy(() => EventRelationFilterSchema),
        z.lazy(() => EventWhereInputSchema),
      ])
      .optional(),
    ticket: z.lazy(() => TicketListRelationFilterSchema).optional(),
    category: z.lazy(() => TagListRelationFilterSchema).optional(),
  })
  .strict() as z.ZodType<Prisma.ActivityWhereInput>;

export const ActivityOrderByWithRelationInputSchema: z.ZodType<Prisma.ActivityOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      roomName: z.lazy(() => SortOrderSchema).optional(),
      speaker: z.lazy(() => SortOrderSchema).optional(),
      image: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      start: z.lazy(() => SortOrderSchema).optional(),
      end: z.lazy(() => SortOrderSchema).optional(),
      ticketMax: z.lazy(() => SortOrderSchema).optional(),
      ticketBuy: z.lazy(() => SortOrderSchema).optional(),
      replay: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      typeRoom: z.lazy(() => SortOrderSchema).optional(),
      eventId: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      event: z.lazy(() => EventOrderByWithRelationInputSchema).optional(),
      ticket: z
        .lazy(() => TicketOrderByRelationAggregateInputSchema)
        .optional(),
      category: z.lazy(() => TagOrderByRelationAggregateInputSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.ActivityOrderByWithRelationInput>;

export const ActivityWhereUniqueInputSchema: z.ZodType<Prisma.ActivityWhereUniqueInput> =
  z
    .object({
      id: z.number().int(),
    })
    .and(
      z
        .object({
          id: z.number().int().optional(),
          AND: z
            .union([
              z.lazy(() => ActivityWhereInputSchema),
              z.lazy(() => ActivityWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => ActivityWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => ActivityWhereInputSchema),
              z.lazy(() => ActivityWhereInputSchema).array(),
            ])
            .optional(),
          title: z
            .union([
              z.lazy(() => StringFilterSchema),
              z.string({
                invalid_type_error: 'title must be type string',
                required_error: 'title is required',
                description: 'schema validation error',
              }),
            ])
            .optional(),
          description: z
            .union([
              z.lazy(() => StringFilterSchema),
              z.string({
                invalid_type_error: 'description must be type string',
                required_error: 'description is required',
                description: 'schema validation error',
              }),
            ])
            .optional(),
          roomName: z
            .union([
              z.lazy(() => StringFilterSchema),
              z.string({
                invalid_type_error: 'roomName must be type string',
                required_error: 'roomName is required',
                description: 'schema validation error',
              }),
            ])
            .optional(),
          speaker: z
            .union([
              z.lazy(() => StringFilterSchema),
              z.string({
                invalid_type_error: 'speaker must be type string',
                required_error: 'speaker is required',
                description: 'schema validation error',
              }),
            ])
            .optional(),
          image: z
            .union([
              z.lazy(() => StringNullableFilterSchema),
              z.string({
                invalid_type_error: 'image must be type string',
                required_error: 'image is required',
                description: 'schema validation error',
              }),
            ])
            .optional()
            .nullable(),
          start: z
            .union([
              z.lazy(() => DateTimeFilterSchema),
              z.coerce.date({
                invalid_type_error: 'start must be type date',
                required_error: 'start is required',
                description: 'schema validation error',
              }),
            ])
            .optional(),
          end: z
            .union([
              z.lazy(() => DateTimeFilterSchema),
              z.coerce.date({
                invalid_type_error: 'end must be type date',
                required_error: 'end is required',
                description: 'schema validation error',
              }),
            ])
            .optional(),
          ticketMax: z
            .union([
              z.lazy(() => IntFilterSchema),
              z.number({
                invalid_type_error: 'ticketMax must be type number',
                required_error: 'ticketMax is required',
                description: 'schema validation error',
              }),
            ])
            .optional(),
          ticketBuy: z
            .union([
              z.lazy(() => IntFilterSchema),
              z
                .number({
                  invalid_type_error: 'ticketBuy must be type number',
                  required_error: 'ticketBuy is required',
                  description: 'schema validation error',
                })
                .nonnegative({ message: 'ticketMin must be >= 0' }),
            ])
            .optional(),
          replay: z
            .union([
              z.lazy(() => StringNullableFilterSchema),
              z.string().url({ message: 'invalid url' }),
            ])
            .optional()
            .nullable(),
          typeRoom: z
            .union([
              z.lazy(() => EnumTypeRoomFilterSchema),
              z.lazy(() => TypeRoomSchema),
            ])
            .optional(),
          eventId: z
            .union([
              z.lazy(() => IntFilterSchema),
              z
                .number({
                  invalid_type_error: 'eventId must be type number',
                  required_error: 'eventId is required',
                  description: 'schema validation error',
                })
                .nonnegative({ message: 'eventId must be > 0' }),
            ])
            .optional(),
          createdAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          updatedAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          event: z
            .union([
              z.lazy(() => EventRelationFilterSchema),
              z.lazy(() => EventWhereInputSchema),
            ])
            .optional(),
          ticket: z.lazy(() => TicketListRelationFilterSchema).optional(),
          category: z.lazy(() => TagListRelationFilterSchema).optional(),
        })
        .strict()
    ) as z.ZodType<Prisma.ActivityWhereUniqueInput>;

export const ActivityOrderByWithAggregationInputSchema: z.ZodType<Prisma.ActivityOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      roomName: z.lazy(() => SortOrderSchema).optional(),
      speaker: z.lazy(() => SortOrderSchema).optional(),
      image: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      start: z.lazy(() => SortOrderSchema).optional(),
      end: z.lazy(() => SortOrderSchema).optional(),
      ticketMax: z.lazy(() => SortOrderSchema).optional(),
      ticketBuy: z.lazy(() => SortOrderSchema).optional(),
      replay: z
        .union([
          z.lazy(() => SortOrderSchema),
          z.lazy(() => SortOrderInputSchema),
        ])
        .optional(),
      typeRoom: z.lazy(() => SortOrderSchema).optional(),
      eventId: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => ActivityCountOrderByAggregateInputSchema).optional(),
      _avg: z.lazy(() => ActivityAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => ActivityMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => ActivityMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => ActivitySumOrderByAggregateInputSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.ActivityOrderByWithAggregationInput>;

export const ActivityScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ActivityScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => ActivityScalarWhereWithAggregatesInputSchema),
          z.lazy(() => ActivityScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => ActivityScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => ActivityScalarWhereWithAggregatesInputSchema),
          z.lazy(() => ActivityScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      title: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      description: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      roomName: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      speaker: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      image: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      start: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      end: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      ticketMax: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      ticketBuy: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      replay: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      typeRoom: z
        .union([
          z.lazy(() => EnumTypeRoomWithAggregatesFilterSchema),
          z.lazy(() => TypeRoomSchema),
        ])
        .optional(),
      eventId: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      createdAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.ActivityScalarWhereWithAggregatesInput>;

export const TicketWhereInputSchema: z.ZodType<Prisma.TicketWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => TicketWhereInputSchema),
        z.lazy(() => TicketWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => TicketWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => TicketWhereInputSchema),
        z.lazy(() => TicketWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    online: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
    used: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
    ownerId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    activityId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    owner: z
      .union([
        z.lazy(() => UserRelationFilterSchema),
        z.lazy(() => UserWhereInputSchema),
      ])
      .optional(),
    activity: z
      .union([
        z.lazy(() => ActivityRelationFilterSchema),
        z.lazy(() => ActivityWhereInputSchema),
      ])
      .optional(),
  })
  .strict() as z.ZodType<Prisma.TicketWhereInput>;

export const TicketOrderByWithRelationInputSchema: z.ZodType<Prisma.TicketOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      online: z.lazy(() => SortOrderSchema).optional(),
      used: z.lazy(() => SortOrderSchema).optional(),
      ownerId: z.lazy(() => SortOrderSchema).optional(),
      activityId: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      owner: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
      activity: z.lazy(() => ActivityOrderByWithRelationInputSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.TicketOrderByWithRelationInput>;

export const TicketWhereUniqueInputSchema: z.ZodType<Prisma.TicketWhereUniqueInput> =
  z
    .object({
      id: z.number().int(),
    })
    .and(
      z
        .object({
          id: z.number().int().optional(),
          AND: z
            .union([
              z.lazy(() => TicketWhereInputSchema),
              z.lazy(() => TicketWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => TicketWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => TicketWhereInputSchema),
              z.lazy(() => TicketWhereInputSchema).array(),
            ])
            .optional(),
          online: z
            .union([z.lazy(() => BoolFilterSchema), z.boolean()])
            .optional(),
          used: z
            .union([z.lazy(() => BoolFilterSchema), z.boolean()])
            .optional(),
          ownerId: z
            .union([
              z.lazy(() => IntFilterSchema),
              z
                .number({
                  invalid_type_error: 'ownerId must be type number',
                  required_error: 'ownerId is required',
                  description: 'schema validation error',
                })
                .nonnegative({ message: 'ownerId must be > 0' }),
            ])
            .optional(),
          activityId: z
            .union([
              z.lazy(() => IntFilterSchema),
              z
                .number({
                  invalid_type_error: 'activityId must be type number',
                  required_error: 'activityId is required',
                  description: 'schema validation error',
                })
                .nonnegative({ message: 'activityId must be > 0' }),
            ])
            .optional(),
          createdAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          updatedAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          owner: z
            .union([
              z.lazy(() => UserRelationFilterSchema),
              z.lazy(() => UserWhereInputSchema),
            ])
            .optional(),
          activity: z
            .union([
              z.lazy(() => ActivityRelationFilterSchema),
              z.lazy(() => ActivityWhereInputSchema),
            ])
            .optional(),
        })
        .strict()
    ) as z.ZodType<Prisma.TicketWhereUniqueInput>;

export const TicketOrderByWithAggregationInputSchema: z.ZodType<Prisma.TicketOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      online: z.lazy(() => SortOrderSchema).optional(),
      used: z.lazy(() => SortOrderSchema).optional(),
      ownerId: z.lazy(() => SortOrderSchema).optional(),
      activityId: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => TicketCountOrderByAggregateInputSchema).optional(),
      _avg: z.lazy(() => TicketAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => TicketMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => TicketMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => TicketSumOrderByAggregateInputSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.TicketOrderByWithAggregationInput>;

export const TicketScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TicketScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => TicketScalarWhereWithAggregatesInputSchema),
          z.lazy(() => TicketScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => TicketScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => TicketScalarWhereWithAggregatesInputSchema),
          z.lazy(() => TicketScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      online: z
        .union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()])
        .optional(),
      used: z
        .union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()])
        .optional(),
      ownerId: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      activityId: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      createdAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.TicketScalarWhereWithAggregatesInput>;

export const TagWhereInputSchema: z.ZodType<Prisma.TagWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => TagWhereInputSchema),
        z.lazy(() => TagWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => TagWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => TagWhereInputSchema),
        z.lazy(() => TagWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    activity: z.lazy(() => ActivityListRelationFilterSchema).optional(),
  })
  .strict() as z.ZodType<Prisma.TagWhereInput>;

export const TagOrderByWithRelationInputSchema: z.ZodType<Prisma.TagOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      activity: z
        .lazy(() => ActivityOrderByRelationAggregateInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.TagOrderByWithRelationInput>;

export const TagWhereUniqueInputSchema: z.ZodType<Prisma.TagWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.number().int(),
        name: z
          .string({
            invalid_type_error: 'name must be type string',
            required_error: 'name is required',
            description: 'schema validation error',
          })
          .min(3, { message: 'Must be 3 or more characters long' }),
      }),
      z.object({
        id: z.number().int(),
      }),
      z.object({
        name: z
          .string({
            invalid_type_error: 'name must be type string',
            required_error: 'name is required',
            description: 'schema validation error',
          })
          .min(3, { message: 'Must be 3 or more characters long' }),
      }),
    ])
    .and(
      z
        .object({
          id: z.number().int().optional(),
          name: z
            .string({
              invalid_type_error: 'name must be type string',
              required_error: 'name is required',
              description: 'schema validation error',
            })
            .min(3, { message: 'Must be 3 or more characters long' })
            .optional(),
          AND: z
            .union([
              z.lazy(() => TagWhereInputSchema),
              z.lazy(() => TagWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => TagWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => TagWhereInputSchema),
              z.lazy(() => TagWhereInputSchema).array(),
            ])
            .optional(),
          createdAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          updatedAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          activity: z.lazy(() => ActivityListRelationFilterSchema).optional(),
        })
        .strict()
    ) as z.ZodType<Prisma.TagWhereUniqueInput>;

export const TagOrderByWithAggregationInputSchema: z.ZodType<Prisma.TagOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => TagCountOrderByAggregateInputSchema).optional(),
      _avg: z.lazy(() => TagAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => TagMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => TagMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => TagSumOrderByAggregateInputSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.TagOrderByWithAggregationInput>;

export const TagScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TagScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => TagScalarWhereWithAggregatesInputSchema),
          z.lazy(() => TagScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => TagScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => TagScalarWhereWithAggregatesInputSchema),
          z.lazy(() => TagScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      name: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      createdAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.TagScalarWhereWithAggregatesInput>;

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z
  .object({
    email: z.string().email({ message: 'invalid email address' }),
    name: z.string({
      invalid_type_error: 'name must be type string',
      required_error: 'name is required',
      description: 'schema validation error',
    }),
    lastname: z.string({
      invalid_type_error: 'lastname must be type string',
      required_error: 'lastname is required',
      description: 'schema validation error',
    }),
    password: z.string({
      invalid_type_error: 'password must be type string',
      required_error: 'password is required',
      description: 'schema validation error',
    }),
    company: z.string({
      invalid_type_error: 'company must be type string',
      required_error: 'company is required',
      description: 'schema validation error',
    }),
    archipel: z.boolean().optional(),
    role: z.lazy(() => RoleSchema).optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    tickets: z
      .lazy(() => TicketCreateNestedManyWithoutOwnerInputSchema)
      .optional(),
  })
  .strict() as z.ZodType<Prisma.UserCreateInput>;

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> =
  z
    .object({
      id: z.number().int().optional(),
      email: z.string().email({ message: 'invalid email address' }),
      name: z.string({
        invalid_type_error: 'name must be type string',
        required_error: 'name is required',
        description: 'schema validation error',
      }),
      lastname: z.string({
        invalid_type_error: 'lastname must be type string',
        required_error: 'lastname is required',
        description: 'schema validation error',
      }),
      password: z.string({
        invalid_type_error: 'password must be type string',
        required_error: 'password is required',
        description: 'schema validation error',
      }),
      company: z.string({
        invalid_type_error: 'company must be type string',
        required_error: 'company is required',
        description: 'schema validation error',
      }),
      archipel: z.boolean().optional(),
      role: z.lazy(() => RoleSchema).optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      tickets: z
        .lazy(() => TicketUncheckedCreateNestedManyWithoutOwnerInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.UserUncheckedCreateInput>;

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z
  .object({
    email: z
      .union([
        z.string().email({ message: 'invalid email address' }),
        z.lazy(() => StringFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    name: z
      .union([
        z.string({
          invalid_type_error: 'name must be type string',
          required_error: 'name is required',
          description: 'schema validation error',
        }),
        z.lazy(() => StringFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    lastname: z
      .union([
        z.string({
          invalid_type_error: 'lastname must be type string',
          required_error: 'lastname is required',
          description: 'schema validation error',
        }),
        z.lazy(() => StringFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    password: z
      .union([
        z.string({
          invalid_type_error: 'password must be type string',
          required_error: 'password is required',
          description: 'schema validation error',
        }),
        z.lazy(() => StringFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    company: z
      .union([
        z.string({
          invalid_type_error: 'company must be type string',
          required_error: 'company is required',
          description: 'schema validation error',
        }),
        z.lazy(() => StringFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    archipel: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    role: z
      .union([
        z.lazy(() => RoleSchema),
        z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    tickets: z
      .lazy(() => TicketUpdateManyWithoutOwnerNestedInputSchema)
      .optional(),
  })
  .strict() as z.ZodType<Prisma.UserUpdateInput>;

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      email: z
        .union([
          z.string().email({ message: 'invalid email address' }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string({
            invalid_type_error: 'name must be type string',
            required_error: 'name is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      lastname: z
        .union([
          z.string({
            invalid_type_error: 'lastname must be type string',
            required_error: 'lastname is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      password: z
        .union([
          z.string({
            invalid_type_error: 'password must be type string',
            required_error: 'password is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      company: z
        .union([
          z.string({
            invalid_type_error: 'company must be type string',
            required_error: 'company is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      archipel: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      role: z
        .union([
          z.lazy(() => RoleSchema),
          z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      tickets: z
        .lazy(() => TicketUncheckedUpdateManyWithoutOwnerNestedInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.UserUncheckedUpdateInput>;

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> =
  z
    .object({
      id: z.number().int().optional(),
      email: z.string().email({ message: 'invalid email address' }),
      name: z.string({
        invalid_type_error: 'name must be type string',
        required_error: 'name is required',
        description: 'schema validation error',
      }),
      lastname: z.string({
        invalid_type_error: 'lastname must be type string',
        required_error: 'lastname is required',
        description: 'schema validation error',
      }),
      password: z.string({
        invalid_type_error: 'password must be type string',
        required_error: 'password is required',
        description: 'schema validation error',
      }),
      company: z.string({
        invalid_type_error: 'company must be type string',
        required_error: 'company is required',
        description: 'schema validation error',
      }),
      archipel: z.boolean().optional(),
      role: z.lazy(() => RoleSchema).optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict() as z.ZodType<Prisma.UserCreateManyInput>;

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> =
  z
    .object({
      email: z
        .union([
          z.string().email({ message: 'invalid email address' }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string({
            invalid_type_error: 'name must be type string',
            required_error: 'name is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      lastname: z
        .union([
          z.string({
            invalid_type_error: 'lastname must be type string',
            required_error: 'lastname is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      password: z
        .union([
          z.string({
            invalid_type_error: 'password must be type string',
            required_error: 'password is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      company: z
        .union([
          z.string({
            invalid_type_error: 'company must be type string',
            required_error: 'company is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      archipel: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      role: z
        .union([
          z.lazy(() => RoleSchema),
          z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.UserUpdateManyMutationInput>;

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      email: z
        .union([
          z.string().email({ message: 'invalid email address' }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string({
            invalid_type_error: 'name must be type string',
            required_error: 'name is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      lastname: z
        .union([
          z.string({
            invalid_type_error: 'lastname must be type string',
            required_error: 'lastname is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      password: z
        .union([
          z.string({
            invalid_type_error: 'password must be type string',
            required_error: 'password is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      company: z
        .union([
          z.string({
            invalid_type_error: 'company must be type string',
            required_error: 'company is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      archipel: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      role: z
        .union([
          z.lazy(() => RoleSchema),
          z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.UserUncheckedUpdateManyInput>;

export const EventCreateInputSchema: z.ZodType<Prisma.EventCreateInput> = z
  .object({
    title: z.string({
      invalid_type_error: 'title must be type string',
      required_error: 'title is required',
      description: 'schema validation error',
    }),
    description: z.string({
      invalid_type_error: 'description must be type string',
      required_error: 'description is required',
      description: 'schema validation error',
    }),
    location: z.string({
      invalid_type_error: 'location must be type string',
      required_error: 'location is required',
      description: 'schema validation error',
    }),
    start: z.coerce.date({
      invalid_type_error: 'start must be type date',
      required_error: 'start is required',
      description: 'schema validation error',
    }),
    end: z.coerce.date({
      invalid_type_error: 'end must be type date',
      required_error: 'end is required',
      description: 'schema validation error',
    }),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    Activity: z
      .lazy(() => ActivityCreateNestedManyWithoutEventInputSchema)
      .optional(),
  })
  .strict() as z.ZodType<Prisma.EventCreateInput>;

export const EventUncheckedCreateInputSchema: z.ZodType<Prisma.EventUncheckedCreateInput> =
  z
    .object({
      id: z.number().int().optional(),
      title: z.string({
        invalid_type_error: 'title must be type string',
        required_error: 'title is required',
        description: 'schema validation error',
      }),
      description: z.string({
        invalid_type_error: 'description must be type string',
        required_error: 'description is required',
        description: 'schema validation error',
      }),
      location: z.string({
        invalid_type_error: 'location must be type string',
        required_error: 'location is required',
        description: 'schema validation error',
      }),
      start: z.coerce.date({
        invalid_type_error: 'start must be type date',
        required_error: 'start is required',
        description: 'schema validation error',
      }),
      end: z.coerce.date({
        invalid_type_error: 'end must be type date',
        required_error: 'end is required',
        description: 'schema validation error',
      }),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      Activity: z
        .lazy(() => ActivityUncheckedCreateNestedManyWithoutEventInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.EventUncheckedCreateInput>;

export const EventUpdateInputSchema: z.ZodType<Prisma.EventUpdateInput> = z
  .object({
    title: z
      .union([
        z.string({
          invalid_type_error: 'title must be type string',
          required_error: 'title is required',
          description: 'schema validation error',
        }),
        z.lazy(() => StringFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    description: z
      .union([
        z.string({
          invalid_type_error: 'description must be type string',
          required_error: 'description is required',
          description: 'schema validation error',
        }),
        z.lazy(() => StringFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    location: z
      .union([
        z.string({
          invalid_type_error: 'location must be type string',
          required_error: 'location is required',
          description: 'schema validation error',
        }),
        z.lazy(() => StringFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    start: z
      .union([
        z.coerce.date({
          invalid_type_error: 'start must be type date',
          required_error: 'start is required',
          description: 'schema validation error',
        }),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    end: z
      .union([
        z.coerce.date({
          invalid_type_error: 'end must be type date',
          required_error: 'end is required',
          description: 'schema validation error',
        }),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    Activity: z
      .lazy(() => ActivityUpdateManyWithoutEventNestedInputSchema)
      .optional(),
  })
  .strict() as z.ZodType<Prisma.EventUpdateInput>;

export const EventUncheckedUpdateInputSchema: z.ZodType<Prisma.EventUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      title: z
        .union([
          z.string({
            invalid_type_error: 'title must be type string',
            required_error: 'title is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string({
            invalid_type_error: 'description must be type string',
            required_error: 'description is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      location: z
        .union([
          z.string({
            invalid_type_error: 'location must be type string',
            required_error: 'location is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      start: z
        .union([
          z.coerce.date({
            invalid_type_error: 'start must be type date',
            required_error: 'start is required',
            description: 'schema validation error',
          }),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      end: z
        .union([
          z.coerce.date({
            invalid_type_error: 'end must be type date',
            required_error: 'end is required',
            description: 'schema validation error',
          }),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      Activity: z
        .lazy(() => ActivityUncheckedUpdateManyWithoutEventNestedInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.EventUncheckedUpdateInput>;

export const EventCreateManyInputSchema: z.ZodType<Prisma.EventCreateManyInput> =
  z
    .object({
      id: z.number().int().optional(),
      title: z.string({
        invalid_type_error: 'title must be type string',
        required_error: 'title is required',
        description: 'schema validation error',
      }),
      description: z.string({
        invalid_type_error: 'description must be type string',
        required_error: 'description is required',
        description: 'schema validation error',
      }),
      location: z.string({
        invalid_type_error: 'location must be type string',
        required_error: 'location is required',
        description: 'schema validation error',
      }),
      start: z.coerce.date({
        invalid_type_error: 'start must be type date',
        required_error: 'start is required',
        description: 'schema validation error',
      }),
      end: z.coerce.date({
        invalid_type_error: 'end must be type date',
        required_error: 'end is required',
        description: 'schema validation error',
      }),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict() as z.ZodType<Prisma.EventCreateManyInput>;

export const EventUpdateManyMutationInputSchema: z.ZodType<Prisma.EventUpdateManyMutationInput> =
  z
    .object({
      title: z
        .union([
          z.string({
            invalid_type_error: 'title must be type string',
            required_error: 'title is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string({
            invalid_type_error: 'description must be type string',
            required_error: 'description is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      location: z
        .union([
          z.string({
            invalid_type_error: 'location must be type string',
            required_error: 'location is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      start: z
        .union([
          z.coerce.date({
            invalid_type_error: 'start must be type date',
            required_error: 'start is required',
            description: 'schema validation error',
          }),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      end: z
        .union([
          z.coerce.date({
            invalid_type_error: 'end must be type date',
            required_error: 'end is required',
            description: 'schema validation error',
          }),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.EventUpdateManyMutationInput>;

export const EventUncheckedUpdateManyInputSchema: z.ZodType<Prisma.EventUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      title: z
        .union([
          z.string({
            invalid_type_error: 'title must be type string',
            required_error: 'title is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string({
            invalid_type_error: 'description must be type string',
            required_error: 'description is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      location: z
        .union([
          z.string({
            invalid_type_error: 'location must be type string',
            required_error: 'location is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      start: z
        .union([
          z.coerce.date({
            invalid_type_error: 'start must be type date',
            required_error: 'start is required',
            description: 'schema validation error',
          }),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      end: z
        .union([
          z.coerce.date({
            invalid_type_error: 'end must be type date',
            required_error: 'end is required',
            description: 'schema validation error',
          }),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.EventUncheckedUpdateManyInput>;

export const ActivityCreateInputSchema: z.ZodType<Prisma.ActivityCreateInput> =
  z
    .object({
      title: z.string({
        invalid_type_error: 'title must be type string',
        required_error: 'title is required',
        description: 'schema validation error',
      }),
      description: z.string({
        invalid_type_error: 'description must be type string',
        required_error: 'description is required',
        description: 'schema validation error',
      }),
      roomName: z.string({
        invalid_type_error: 'roomName must be type string',
        required_error: 'roomName is required',
        description: 'schema validation error',
      }),
      speaker: z.string({
        invalid_type_error: 'speaker must be type string',
        required_error: 'speaker is required',
        description: 'schema validation error',
      }),
      image: z
        .string({
          invalid_type_error: 'image must be type string',
          required_error: 'image is required',
          description: 'schema validation error',
        })
        .optional()
        .nullable(),
      start: z.coerce.date({
        invalid_type_error: 'start must be type date',
        required_error: 'start is required',
        description: 'schema validation error',
      }),
      end: z.coerce.date({
        invalid_type_error: 'end must be type date',
        required_error: 'end is required',
        description: 'schema validation error',
      }),
      ticketMax: z.number({
        invalid_type_error: 'ticketMax must be type number',
        required_error: 'ticketMax is required',
        description: 'schema validation error',
      }),
      ticketBuy: z
        .number({
          invalid_type_error: 'ticketBuy must be type number',
          required_error: 'ticketBuy is required',
          description: 'schema validation error',
        })
        .nonnegative({ message: 'ticketMin must be >= 0' })
        .optional(),
      replay: z.string().url({ message: 'invalid url' }).optional().nullable(),
      typeRoom: z.lazy(() => TypeRoomSchema).optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      event: z.lazy(() => EventCreateNestedOneWithoutActivityInputSchema),
      ticket: z
        .lazy(() => TicketCreateNestedManyWithoutActivityInputSchema)
        .optional(),
      category: z
        .lazy(() => TagCreateNestedManyWithoutActivityInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.ActivityCreateInput>;

export const ActivityUncheckedCreateInputSchema: z.ZodType<Prisma.ActivityUncheckedCreateInput> =
  z
    .object({
      id: z.number().int().optional(),
      title: z.string({
        invalid_type_error: 'title must be type string',
        required_error: 'title is required',
        description: 'schema validation error',
      }),
      description: z.string({
        invalid_type_error: 'description must be type string',
        required_error: 'description is required',
        description: 'schema validation error',
      }),
      roomName: z.string({
        invalid_type_error: 'roomName must be type string',
        required_error: 'roomName is required',
        description: 'schema validation error',
      }),
      speaker: z.string({
        invalid_type_error: 'speaker must be type string',
        required_error: 'speaker is required',
        description: 'schema validation error',
      }),
      image: z
        .string({
          invalid_type_error: 'image must be type string',
          required_error: 'image is required',
          description: 'schema validation error',
        })
        .optional()
        .nullable(),
      start: z.coerce.date({
        invalid_type_error: 'start must be type date',
        required_error: 'start is required',
        description: 'schema validation error',
      }),
      end: z.coerce.date({
        invalid_type_error: 'end must be type date',
        required_error: 'end is required',
        description: 'schema validation error',
      }),
      ticketMax: z.number({
        invalid_type_error: 'ticketMax must be type number',
        required_error: 'ticketMax is required',
        description: 'schema validation error',
      }),
      ticketBuy: z
        .number({
          invalid_type_error: 'ticketBuy must be type number',
          required_error: 'ticketBuy is required',
          description: 'schema validation error',
        })
        .nonnegative({ message: 'ticketMin must be >= 0' })
        .optional(),
      replay: z.string().url({ message: 'invalid url' }).optional().nullable(),
      typeRoom: z.lazy(() => TypeRoomSchema).optional(),
      eventId: z
        .number({
          invalid_type_error: 'eventId must be type number',
          required_error: 'eventId is required',
          description: 'schema validation error',
        })
        .nonnegative({ message: 'eventId must be > 0' }),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      ticket: z
        .lazy(() => TicketUncheckedCreateNestedManyWithoutActivityInputSchema)
        .optional(),
      category: z
        .lazy(() => TagUncheckedCreateNestedManyWithoutActivityInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.ActivityUncheckedCreateInput>;

export const ActivityUpdateInputSchema: z.ZodType<Prisma.ActivityUpdateInput> =
  z
    .object({
      title: z
        .union([
          z.string({
            invalid_type_error: 'title must be type string',
            required_error: 'title is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string({
            invalid_type_error: 'description must be type string',
            required_error: 'description is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      roomName: z
        .union([
          z.string({
            invalid_type_error: 'roomName must be type string',
            required_error: 'roomName is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      speaker: z
        .union([
          z.string({
            invalid_type_error: 'speaker must be type string',
            required_error: 'speaker is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      image: z
        .union([
          z.string({
            invalid_type_error: 'image must be type string',
            required_error: 'image is required',
            description: 'schema validation error',
          }),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      start: z
        .union([
          z.coerce.date({
            invalid_type_error: 'start must be type date',
            required_error: 'start is required',
            description: 'schema validation error',
          }),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      end: z
        .union([
          z.coerce.date({
            invalid_type_error: 'end must be type date',
            required_error: 'end is required',
            description: 'schema validation error',
          }),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ticketMax: z
        .union([
          z.number({
            invalid_type_error: 'ticketMax must be type number',
            required_error: 'ticketMax is required',
            description: 'schema validation error',
          }),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ticketBuy: z
        .union([
          z
            .number({
              invalid_type_error: 'ticketBuy must be type number',
              required_error: 'ticketBuy is required',
              description: 'schema validation error',
            })
            .nonnegative({ message: 'ticketMin must be >= 0' }),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      replay: z
        .union([
          z.string().url({ message: 'invalid url' }),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      typeRoom: z
        .union([
          z.lazy(() => TypeRoomSchema),
          z.lazy(() => EnumTypeRoomFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      event: z
        .lazy(() => EventUpdateOneRequiredWithoutActivityNestedInputSchema)
        .optional(),
      ticket: z
        .lazy(() => TicketUpdateManyWithoutActivityNestedInputSchema)
        .optional(),
      category: z
        .lazy(() => TagUpdateManyWithoutActivityNestedInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.ActivityUpdateInput>;

export const ActivityUncheckedUpdateInputSchema: z.ZodType<Prisma.ActivityUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      title: z
        .union([
          z.string({
            invalid_type_error: 'title must be type string',
            required_error: 'title is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string({
            invalid_type_error: 'description must be type string',
            required_error: 'description is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      roomName: z
        .union([
          z.string({
            invalid_type_error: 'roomName must be type string',
            required_error: 'roomName is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      speaker: z
        .union([
          z.string({
            invalid_type_error: 'speaker must be type string',
            required_error: 'speaker is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      image: z
        .union([
          z.string({
            invalid_type_error: 'image must be type string',
            required_error: 'image is required',
            description: 'schema validation error',
          }),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      start: z
        .union([
          z.coerce.date({
            invalid_type_error: 'start must be type date',
            required_error: 'start is required',
            description: 'schema validation error',
          }),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      end: z
        .union([
          z.coerce.date({
            invalid_type_error: 'end must be type date',
            required_error: 'end is required',
            description: 'schema validation error',
          }),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ticketMax: z
        .union([
          z.number({
            invalid_type_error: 'ticketMax must be type number',
            required_error: 'ticketMax is required',
            description: 'schema validation error',
          }),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ticketBuy: z
        .union([
          z
            .number({
              invalid_type_error: 'ticketBuy must be type number',
              required_error: 'ticketBuy is required',
              description: 'schema validation error',
            })
            .nonnegative({ message: 'ticketMin must be >= 0' }),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      replay: z
        .union([
          z.string().url({ message: 'invalid url' }),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      typeRoom: z
        .union([
          z.lazy(() => TypeRoomSchema),
          z.lazy(() => EnumTypeRoomFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      eventId: z
        .union([
          z
            .number({
              invalid_type_error: 'eventId must be type number',
              required_error: 'eventId is required',
              description: 'schema validation error',
            })
            .nonnegative({ message: 'eventId must be > 0' }),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ticket: z
        .lazy(() => TicketUncheckedUpdateManyWithoutActivityNestedInputSchema)
        .optional(),
      category: z
        .lazy(() => TagUncheckedUpdateManyWithoutActivityNestedInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.ActivityUncheckedUpdateInput>;

export const ActivityCreateManyInputSchema: z.ZodType<Prisma.ActivityCreateManyInput> =
  z
    .object({
      id: z.number().int().optional(),
      title: z.string({
        invalid_type_error: 'title must be type string',
        required_error: 'title is required',
        description: 'schema validation error',
      }),
      description: z.string({
        invalid_type_error: 'description must be type string',
        required_error: 'description is required',
        description: 'schema validation error',
      }),
      roomName: z.string({
        invalid_type_error: 'roomName must be type string',
        required_error: 'roomName is required',
        description: 'schema validation error',
      }),
      speaker: z.string({
        invalid_type_error: 'speaker must be type string',
        required_error: 'speaker is required',
        description: 'schema validation error',
      }),
      image: z
        .string({
          invalid_type_error: 'image must be type string',
          required_error: 'image is required',
          description: 'schema validation error',
        })
        .optional()
        .nullable(),
      start: z.coerce.date({
        invalid_type_error: 'start must be type date',
        required_error: 'start is required',
        description: 'schema validation error',
      }),
      end: z.coerce.date({
        invalid_type_error: 'end must be type date',
        required_error: 'end is required',
        description: 'schema validation error',
      }),
      ticketMax: z.number({
        invalid_type_error: 'ticketMax must be type number',
        required_error: 'ticketMax is required',
        description: 'schema validation error',
      }),
      ticketBuy: z
        .number({
          invalid_type_error: 'ticketBuy must be type number',
          required_error: 'ticketBuy is required',
          description: 'schema validation error',
        })
        .nonnegative({ message: 'ticketMin must be >= 0' })
        .optional(),
      replay: z.string().url({ message: 'invalid url' }).optional().nullable(),
      typeRoom: z.lazy(() => TypeRoomSchema).optional(),
      eventId: z
        .number({
          invalid_type_error: 'eventId must be type number',
          required_error: 'eventId is required',
          description: 'schema validation error',
        })
        .nonnegative({ message: 'eventId must be > 0' }),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict() as z.ZodType<Prisma.ActivityCreateManyInput>;

export const ActivityUpdateManyMutationInputSchema: z.ZodType<Prisma.ActivityUpdateManyMutationInput> =
  z
    .object({
      title: z
        .union([
          z.string({
            invalid_type_error: 'title must be type string',
            required_error: 'title is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string({
            invalid_type_error: 'description must be type string',
            required_error: 'description is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      roomName: z
        .union([
          z.string({
            invalid_type_error: 'roomName must be type string',
            required_error: 'roomName is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      speaker: z
        .union([
          z.string({
            invalid_type_error: 'speaker must be type string',
            required_error: 'speaker is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      image: z
        .union([
          z.string({
            invalid_type_error: 'image must be type string',
            required_error: 'image is required',
            description: 'schema validation error',
          }),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      start: z
        .union([
          z.coerce.date({
            invalid_type_error: 'start must be type date',
            required_error: 'start is required',
            description: 'schema validation error',
          }),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      end: z
        .union([
          z.coerce.date({
            invalid_type_error: 'end must be type date',
            required_error: 'end is required',
            description: 'schema validation error',
          }),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ticketMax: z
        .union([
          z.number({
            invalid_type_error: 'ticketMax must be type number',
            required_error: 'ticketMax is required',
            description: 'schema validation error',
          }),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ticketBuy: z
        .union([
          z
            .number({
              invalid_type_error: 'ticketBuy must be type number',
              required_error: 'ticketBuy is required',
              description: 'schema validation error',
            })
            .nonnegative({ message: 'ticketMin must be >= 0' }),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      replay: z
        .union([
          z.string().url({ message: 'invalid url' }),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      typeRoom: z
        .union([
          z.lazy(() => TypeRoomSchema),
          z.lazy(() => EnumTypeRoomFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.ActivityUpdateManyMutationInput>;

export const ActivityUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ActivityUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      title: z
        .union([
          z.string({
            invalid_type_error: 'title must be type string',
            required_error: 'title is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string({
            invalid_type_error: 'description must be type string',
            required_error: 'description is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      roomName: z
        .union([
          z.string({
            invalid_type_error: 'roomName must be type string',
            required_error: 'roomName is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      speaker: z
        .union([
          z.string({
            invalid_type_error: 'speaker must be type string',
            required_error: 'speaker is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      image: z
        .union([
          z.string({
            invalid_type_error: 'image must be type string',
            required_error: 'image is required',
            description: 'schema validation error',
          }),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      start: z
        .union([
          z.coerce.date({
            invalid_type_error: 'start must be type date',
            required_error: 'start is required',
            description: 'schema validation error',
          }),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      end: z
        .union([
          z.coerce.date({
            invalid_type_error: 'end must be type date',
            required_error: 'end is required',
            description: 'schema validation error',
          }),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ticketMax: z
        .union([
          z.number({
            invalid_type_error: 'ticketMax must be type number',
            required_error: 'ticketMax is required',
            description: 'schema validation error',
          }),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ticketBuy: z
        .union([
          z
            .number({
              invalid_type_error: 'ticketBuy must be type number',
              required_error: 'ticketBuy is required',
              description: 'schema validation error',
            })
            .nonnegative({ message: 'ticketMin must be >= 0' }),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      replay: z
        .union([
          z.string().url({ message: 'invalid url' }),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      typeRoom: z
        .union([
          z.lazy(() => TypeRoomSchema),
          z.lazy(() => EnumTypeRoomFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      eventId: z
        .union([
          z
            .number({
              invalid_type_error: 'eventId must be type number',
              required_error: 'eventId is required',
              description: 'schema validation error',
            })
            .nonnegative({ message: 'eventId must be > 0' }),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.ActivityUncheckedUpdateManyInput>;

export const TicketCreateInputSchema: z.ZodType<Prisma.TicketCreateInput> = z
  .object({
    online: z.boolean(),
    used: z.boolean().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    owner: z.lazy(() => UserCreateNestedOneWithoutTicketsInputSchema),
    activity: z.lazy(() => ActivityCreateNestedOneWithoutTicketInputSchema),
  })
  .strict() as z.ZodType<Prisma.TicketCreateInput>;

export const TicketUncheckedCreateInputSchema: z.ZodType<Prisma.TicketUncheckedCreateInput> =
  z
    .object({
      id: z.number().int().optional(),
      online: z.boolean(),
      used: z.boolean().optional(),
      ownerId: z
        .number({
          invalid_type_error: 'ownerId must be type number',
          required_error: 'ownerId is required',
          description: 'schema validation error',
        })
        .nonnegative({ message: 'ownerId must be > 0' }),
      activityId: z
        .number({
          invalid_type_error: 'activityId must be type number',
          required_error: 'activityId is required',
          description: 'schema validation error',
        })
        .nonnegative({ message: 'activityId must be > 0' }),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict() as z.ZodType<Prisma.TicketUncheckedCreateInput>;

export const TicketUpdateInputSchema: z.ZodType<Prisma.TicketUpdateInput> = z
  .object({
    online: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    used: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    owner: z
      .lazy(() => UserUpdateOneRequiredWithoutTicketsNestedInputSchema)
      .optional(),
    activity: z
      .lazy(() => ActivityUpdateOneRequiredWithoutTicketNestedInputSchema)
      .optional(),
  })
  .strict() as z.ZodType<Prisma.TicketUpdateInput>;

export const TicketUncheckedUpdateInputSchema: z.ZodType<Prisma.TicketUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      online: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      used: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ownerId: z
        .union([
          z
            .number({
              invalid_type_error: 'ownerId must be type number',
              required_error: 'ownerId is required',
              description: 'schema validation error',
            })
            .nonnegative({ message: 'ownerId must be > 0' }),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      activityId: z
        .union([
          z
            .number({
              invalid_type_error: 'activityId must be type number',
              required_error: 'activityId is required',
              description: 'schema validation error',
            })
            .nonnegative({ message: 'activityId must be > 0' }),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.TicketUncheckedUpdateInput>;

export const TicketCreateManyInputSchema: z.ZodType<Prisma.TicketCreateManyInput> =
  z
    .object({
      id: z.number().int().optional(),
      online: z.boolean(),
      used: z.boolean().optional(),
      ownerId: z
        .number({
          invalid_type_error: 'ownerId must be type number',
          required_error: 'ownerId is required',
          description: 'schema validation error',
        })
        .nonnegative({ message: 'ownerId must be > 0' }),
      activityId: z
        .number({
          invalid_type_error: 'activityId must be type number',
          required_error: 'activityId is required',
          description: 'schema validation error',
        })
        .nonnegative({ message: 'activityId must be > 0' }),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict() as z.ZodType<Prisma.TicketCreateManyInput>;

export const TicketUpdateManyMutationInputSchema: z.ZodType<Prisma.TicketUpdateManyMutationInput> =
  z
    .object({
      online: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      used: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.TicketUpdateManyMutationInput>;

export const TicketUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TicketUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      online: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      used: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ownerId: z
        .union([
          z
            .number({
              invalid_type_error: 'ownerId must be type number',
              required_error: 'ownerId is required',
              description: 'schema validation error',
            })
            .nonnegative({ message: 'ownerId must be > 0' }),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      activityId: z
        .union([
          z
            .number({
              invalid_type_error: 'activityId must be type number',
              required_error: 'activityId is required',
              description: 'schema validation error',
            })
            .nonnegative({ message: 'activityId must be > 0' }),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.TicketUncheckedUpdateManyInput>;

export const TagCreateInputSchema: z.ZodType<Prisma.TagCreateInput> = z
  .object({
    name: z
      .string({
        invalid_type_error: 'name must be type string',
        required_error: 'name is required',
        description: 'schema validation error',
      })
      .min(3, { message: 'Must be 3 or more characters long' }),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    activity: z
      .lazy(() => ActivityCreateNestedManyWithoutCategoryInputSchema)
      .optional(),
  })
  .strict() as z.ZodType<Prisma.TagCreateInput>;

export const TagUncheckedCreateInputSchema: z.ZodType<Prisma.TagUncheckedCreateInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z
        .string({
          invalid_type_error: 'name must be type string',
          required_error: 'name is required',
          description: 'schema validation error',
        })
        .min(3, { message: 'Must be 3 or more characters long' }),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      activity: z
        .lazy(() => ActivityUncheckedCreateNestedManyWithoutCategoryInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.TagUncheckedCreateInput>;

export const TagUpdateInputSchema: z.ZodType<Prisma.TagUpdateInput> = z
  .object({
    name: z
      .union([
        z
          .string({
            invalid_type_error: 'name must be type string',
            required_error: 'name is required',
            description: 'schema validation error',
          })
          .min(3, { message: 'Must be 3 or more characters long' }),
        z.lazy(() => StringFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    activity: z
      .lazy(() => ActivityUpdateManyWithoutCategoryNestedInputSchema)
      .optional(),
  })
  .strict() as z.ZodType<Prisma.TagUpdateInput>;

export const TagUncheckedUpdateInputSchema: z.ZodType<Prisma.TagUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z
            .string({
              invalid_type_error: 'name must be type string',
              required_error: 'name is required',
              description: 'schema validation error',
            })
            .min(3, { message: 'Must be 3 or more characters long' }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      activity: z
        .lazy(() => ActivityUncheckedUpdateManyWithoutCategoryNestedInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.TagUncheckedUpdateInput>;

export const TagCreateManyInputSchema: z.ZodType<Prisma.TagCreateManyInput> = z
  .object({
    id: z.number().int().optional(),
    name: z
      .string({
        invalid_type_error: 'name must be type string',
        required_error: 'name is required',
        description: 'schema validation error',
      })
      .min(3, { message: 'Must be 3 or more characters long' }),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  })
  .strict() as z.ZodType<Prisma.TagCreateManyInput>;

export const TagUpdateManyMutationInputSchema: z.ZodType<Prisma.TagUpdateManyMutationInput> =
  z
    .object({
      name: z
        .union([
          z
            .string({
              invalid_type_error: 'name must be type string',
              required_error: 'name is required',
              description: 'schema validation error',
            })
            .min(3, { message: 'Must be 3 or more characters long' }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.TagUpdateManyMutationInput>;

export const TagUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TagUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z
            .string({
              invalid_type_error: 'name must be type string',
              required_error: 'name is required',
              description: 'schema validation error',
            })
            .min(3, { message: 'Must be 3 or more characters long' }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.TagUncheckedUpdateManyInput>;

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
  })
  .strict() as z.ZodType<Prisma.IntFilter>;

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z
  .object({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringFilterSchema)])
      .optional(),
  })
  .strict() as z.ZodType<Prisma.StringFilter>;

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z
  .object({
    equals: z.boolean().optional(),
    not: z
      .union([z.boolean(), z.lazy(() => NestedBoolFilterSchema)])
      .optional(),
  })
  .strict() as z.ZodType<Prisma.BoolFilter>;

export const EnumRoleFilterSchema: z.ZodType<Prisma.EnumRoleFilter> = z
  .object({
    equals: z.lazy(() => RoleSchema).optional(),
    in: z
      .lazy(() => RoleSchema)
      .array()
      .optional(),
    notIn: z
      .lazy(() => RoleSchema)
      .array()
      .optional(),
    not: z
      .union([
        z.lazy(() => RoleSchema),
        z.lazy(() => NestedEnumRoleFilterSchema),
      ])
      .optional(),
  })
  .strict() as z.ZodType<Prisma.EnumRoleFilter>;

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z
  .object({
    equals: z.coerce.date().optional(),
    in: z.coerce.date().array().optional(),
    notIn: z.coerce.date().array().optional(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z
      .union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)])
      .optional(),
  })
  .strict() as z.ZodType<Prisma.DateTimeFilter>;

export const TicketListRelationFilterSchema: z.ZodType<Prisma.TicketListRelationFilter> =
  z
    .object({
      every: z.lazy(() => TicketWhereInputSchema).optional(),
      some: z.lazy(() => TicketWhereInputSchema).optional(),
      none: z.lazy(() => TicketWhereInputSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.TicketListRelationFilter>;

export const TicketOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TicketOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.TicketOrderByRelationAggregateInput>;

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      email: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      lastname: z.lazy(() => SortOrderSchema).optional(),
      password: z.lazy(() => SortOrderSchema).optional(),
      company: z.lazy(() => SortOrderSchema).optional(),
      archipel: z.lazy(() => SortOrderSchema).optional(),
      role: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.UserCountOrderByAggregateInput>;

export const UserAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UserAvgOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.UserAvgOrderByAggregateInput>;

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      email: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      lastname: z.lazy(() => SortOrderSchema).optional(),
      password: z.lazy(() => SortOrderSchema).optional(),
      company: z.lazy(() => SortOrderSchema).optional(),
      archipel: z.lazy(() => SortOrderSchema).optional(),
      role: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.UserMaxOrderByAggregateInput>;

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      email: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      lastname: z.lazy(() => SortOrderSchema).optional(),
      password: z.lazy(() => SortOrderSchema).optional(),
      company: z.lazy(() => SortOrderSchema).optional(),
      archipel: z.lazy(() => SortOrderSchema).optional(),
      role: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.UserMinOrderByAggregateInput>;

export const UserSumOrderByAggregateInputSchema: z.ZodType<Prisma.UserSumOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.UserSumOrderByAggregateInput>;

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional(),
      in: z.number().array().optional(),
      notIn: z.number().array().optional(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedIntWithAggregatesFilterSchema)])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
      _sum: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedIntFilterSchema).optional(),
      _max: z.lazy(() => NestedIntFilterSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.IntWithAggregatesFilter>;

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional(),
      in: z.string().array().optional(),
      notIn: z.string().array().optional(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedStringFilterSchema).optional(),
      _max: z.lazy(() => NestedStringFilterSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.StringWithAggregatesFilter>;

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> =
  z
    .object({
      equals: z.boolean().optional(),
      not: z
        .union([
          z.boolean(),
          z.lazy(() => NestedBoolWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedBoolFilterSchema).optional(),
      _max: z.lazy(() => NestedBoolFilterSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.BoolWithAggregatesFilter>;

export const EnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.EnumRoleWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => RoleSchema).optional(),
      in: z
        .lazy(() => RoleSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => RoleSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => RoleSchema),
          z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.EnumRoleWithAggregatesFilter>;

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> =
  z
    .object({
      equals: z.coerce.date().optional(),
      in: z.coerce.date().array().optional(),
      notIn: z.coerce.date().array().optional(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
      _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.DateTimeWithAggregatesFilter>;

export const ActivityListRelationFilterSchema: z.ZodType<Prisma.ActivityListRelationFilter> =
  z
    .object({
      every: z.lazy(() => ActivityWhereInputSchema).optional(),
      some: z.lazy(() => ActivityWhereInputSchema).optional(),
      none: z.lazy(() => ActivityWhereInputSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.ActivityListRelationFilter>;

export const ActivityOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ActivityOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.ActivityOrderByRelationAggregateInput>;

export const EventCountOrderByAggregateInputSchema: z.ZodType<Prisma.EventCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      location: z.lazy(() => SortOrderSchema).optional(),
      start: z.lazy(() => SortOrderSchema).optional(),
      end: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.EventCountOrderByAggregateInput>;

export const EventAvgOrderByAggregateInputSchema: z.ZodType<Prisma.EventAvgOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.EventAvgOrderByAggregateInput>;

export const EventMaxOrderByAggregateInputSchema: z.ZodType<Prisma.EventMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      location: z.lazy(() => SortOrderSchema).optional(),
      start: z.lazy(() => SortOrderSchema).optional(),
      end: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.EventMaxOrderByAggregateInput>;

export const EventMinOrderByAggregateInputSchema: z.ZodType<Prisma.EventMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      location: z.lazy(() => SortOrderSchema).optional(),
      start: z.lazy(() => SortOrderSchema).optional(),
      end: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.EventMinOrderByAggregateInput>;

export const EventSumOrderByAggregateInputSchema: z.ZodType<Prisma.EventSumOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.EventSumOrderByAggregateInput>;

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> =
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.string().array().optional().nullable(),
      notIn: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      not: z
        .union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)])
        .optional()
        .nullable(),
    })
    .strict() as z.ZodType<Prisma.StringNullableFilter>;

export const EnumTypeRoomFilterSchema: z.ZodType<Prisma.EnumTypeRoomFilter> = z
  .object({
    equals: z.lazy(() => TypeRoomSchema).optional(),
    in: z
      .lazy(() => TypeRoomSchema)
      .array()
      .optional(),
    notIn: z
      .lazy(() => TypeRoomSchema)
      .array()
      .optional(),
    not: z
      .union([
        z.lazy(() => TypeRoomSchema),
        z.lazy(() => NestedEnumTypeRoomFilterSchema),
      ])
      .optional(),
  })
  .strict() as z.ZodType<Prisma.EnumTypeRoomFilter>;

export const EventRelationFilterSchema: z.ZodType<Prisma.EventRelationFilter> =
  z
    .object({
      is: z.lazy(() => EventWhereInputSchema).optional(),
      isNot: z.lazy(() => EventWhereInputSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.EventRelationFilter>;

export const TagListRelationFilterSchema: z.ZodType<Prisma.TagListRelationFilter> =
  z
    .object({
      every: z.lazy(() => TagWhereInputSchema).optional(),
      some: z.lazy(() => TagWhereInputSchema).optional(),
      none: z.lazy(() => TagWhereInputSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.TagListRelationFilter>;

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z
  .object({
    sort: z.lazy(() => SortOrderSchema),
    nulls: z.lazy(() => NullsOrderSchema).optional(),
  })
  .strict() as z.ZodType<Prisma.SortOrderInput>;

export const TagOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TagOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.TagOrderByRelationAggregateInput>;

export const ActivityCountOrderByAggregateInputSchema: z.ZodType<Prisma.ActivityCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      roomName: z.lazy(() => SortOrderSchema).optional(),
      speaker: z.lazy(() => SortOrderSchema).optional(),
      image: z.lazy(() => SortOrderSchema).optional(),
      start: z.lazy(() => SortOrderSchema).optional(),
      end: z.lazy(() => SortOrderSchema).optional(),
      ticketMax: z.lazy(() => SortOrderSchema).optional(),
      ticketBuy: z.lazy(() => SortOrderSchema).optional(),
      replay: z.lazy(() => SortOrderSchema).optional(),
      typeRoom: z.lazy(() => SortOrderSchema).optional(),
      eventId: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.ActivityCountOrderByAggregateInput>;

export const ActivityAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ActivityAvgOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      ticketMax: z.lazy(() => SortOrderSchema).optional(),
      ticketBuy: z.lazy(() => SortOrderSchema).optional(),
      eventId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.ActivityAvgOrderByAggregateInput>;

export const ActivityMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ActivityMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      roomName: z.lazy(() => SortOrderSchema).optional(),
      speaker: z.lazy(() => SortOrderSchema).optional(),
      image: z.lazy(() => SortOrderSchema).optional(),
      start: z.lazy(() => SortOrderSchema).optional(),
      end: z.lazy(() => SortOrderSchema).optional(),
      ticketMax: z.lazy(() => SortOrderSchema).optional(),
      ticketBuy: z.lazy(() => SortOrderSchema).optional(),
      replay: z.lazy(() => SortOrderSchema).optional(),
      typeRoom: z.lazy(() => SortOrderSchema).optional(),
      eventId: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.ActivityMaxOrderByAggregateInput>;

export const ActivityMinOrderByAggregateInputSchema: z.ZodType<Prisma.ActivityMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      roomName: z.lazy(() => SortOrderSchema).optional(),
      speaker: z.lazy(() => SortOrderSchema).optional(),
      image: z.lazy(() => SortOrderSchema).optional(),
      start: z.lazy(() => SortOrderSchema).optional(),
      end: z.lazy(() => SortOrderSchema).optional(),
      ticketMax: z.lazy(() => SortOrderSchema).optional(),
      ticketBuy: z.lazy(() => SortOrderSchema).optional(),
      replay: z.lazy(() => SortOrderSchema).optional(),
      typeRoom: z.lazy(() => SortOrderSchema).optional(),
      eventId: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.ActivityMinOrderByAggregateInput>;

export const ActivitySumOrderByAggregateInputSchema: z.ZodType<Prisma.ActivitySumOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      ticketMax: z.lazy(() => SortOrderSchema).optional(),
      ticketBuy: z.lazy(() => SortOrderSchema).optional(),
      eventId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.ActivitySumOrderByAggregateInput>;

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.string().array().optional().nullable(),
      notIn: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.StringNullableWithAggregatesFilter>;

export const EnumTypeRoomWithAggregatesFilterSchema: z.ZodType<Prisma.EnumTypeRoomWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => TypeRoomSchema).optional(),
      in: z
        .lazy(() => TypeRoomSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => TypeRoomSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => TypeRoomSchema),
          z.lazy(() => NestedEnumTypeRoomWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumTypeRoomFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumTypeRoomFilterSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.EnumTypeRoomWithAggregatesFilter>;

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z
  .object({
    is: z.lazy(() => UserWhereInputSchema).optional(),
    isNot: z.lazy(() => UserWhereInputSchema).optional(),
  })
  .strict() as z.ZodType<Prisma.UserRelationFilter>;

export const ActivityRelationFilterSchema: z.ZodType<Prisma.ActivityRelationFilter> =
  z
    .object({
      is: z.lazy(() => ActivityWhereInputSchema).optional(),
      isNot: z.lazy(() => ActivityWhereInputSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.ActivityRelationFilter>;

export const TicketCountOrderByAggregateInputSchema: z.ZodType<Prisma.TicketCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      online: z.lazy(() => SortOrderSchema).optional(),
      used: z.lazy(() => SortOrderSchema).optional(),
      ownerId: z.lazy(() => SortOrderSchema).optional(),
      activityId: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.TicketCountOrderByAggregateInput>;

export const TicketAvgOrderByAggregateInputSchema: z.ZodType<Prisma.TicketAvgOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      ownerId: z.lazy(() => SortOrderSchema).optional(),
      activityId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.TicketAvgOrderByAggregateInput>;

export const TicketMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TicketMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      online: z.lazy(() => SortOrderSchema).optional(),
      used: z.lazy(() => SortOrderSchema).optional(),
      ownerId: z.lazy(() => SortOrderSchema).optional(),
      activityId: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.TicketMaxOrderByAggregateInput>;

export const TicketMinOrderByAggregateInputSchema: z.ZodType<Prisma.TicketMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      online: z.lazy(() => SortOrderSchema).optional(),
      used: z.lazy(() => SortOrderSchema).optional(),
      ownerId: z.lazy(() => SortOrderSchema).optional(),
      activityId: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.TicketMinOrderByAggregateInput>;

export const TicketSumOrderByAggregateInputSchema: z.ZodType<Prisma.TicketSumOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      ownerId: z.lazy(() => SortOrderSchema).optional(),
      activityId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.TicketSumOrderByAggregateInput>;

export const TagCountOrderByAggregateInputSchema: z.ZodType<Prisma.TagCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.TagCountOrderByAggregateInput>;

export const TagAvgOrderByAggregateInputSchema: z.ZodType<Prisma.TagAvgOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.TagAvgOrderByAggregateInput>;

export const TagMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TagMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.TagMaxOrderByAggregateInput>;

export const TagMinOrderByAggregateInputSchema: z.ZodType<Prisma.TagMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.TagMinOrderByAggregateInput>;

export const TagSumOrderByAggregateInputSchema: z.ZodType<Prisma.TagSumOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.TagSumOrderByAggregateInput>;

export const TicketCreateNestedManyWithoutOwnerInputSchema: z.ZodType<Prisma.TicketCreateNestedManyWithoutOwnerInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TicketCreateWithoutOwnerInputSchema),
          z.lazy(() => TicketCreateWithoutOwnerInputSchema).array(),
          z.lazy(() => TicketUncheckedCreateWithoutOwnerInputSchema),
          z.lazy(() => TicketUncheckedCreateWithoutOwnerInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TicketCreateOrConnectWithoutOwnerInputSchema),
          z.lazy(() => TicketCreateOrConnectWithoutOwnerInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => TicketCreateManyOwnerInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => TicketWhereUniqueInputSchema),
          z.lazy(() => TicketWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.TicketCreateNestedManyWithoutOwnerInput>;

export const TicketUncheckedCreateNestedManyWithoutOwnerInputSchema: z.ZodType<Prisma.TicketUncheckedCreateNestedManyWithoutOwnerInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TicketCreateWithoutOwnerInputSchema),
          z.lazy(() => TicketCreateWithoutOwnerInputSchema).array(),
          z.lazy(() => TicketUncheckedCreateWithoutOwnerInputSchema),
          z.lazy(() => TicketUncheckedCreateWithoutOwnerInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TicketCreateOrConnectWithoutOwnerInputSchema),
          z.lazy(() => TicketCreateOrConnectWithoutOwnerInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => TicketCreateManyOwnerInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => TicketWhereUniqueInputSchema),
          z.lazy(() => TicketWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.TicketUncheckedCreateNestedManyWithoutOwnerInput>;

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> =
  z
    .object({
      set: z.string().optional(),
    })
    .strict() as z.ZodType<Prisma.StringFieldUpdateOperationsInput>;

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> =
  z
    .object({
      set: z.boolean().optional(),
    })
    .strict() as z.ZodType<Prisma.BoolFieldUpdateOperationsInput>;

export const EnumRoleFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumRoleFieldUpdateOperationsInput> =
  z
    .object({
      set: z.lazy(() => RoleSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.EnumRoleFieldUpdateOperationsInput>;

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> =
  z
    .object({
      set: z.coerce.date().optional(),
    })
    .strict() as z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput>;

export const TicketUpdateManyWithoutOwnerNestedInputSchema: z.ZodType<Prisma.TicketUpdateManyWithoutOwnerNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TicketCreateWithoutOwnerInputSchema),
          z.lazy(() => TicketCreateWithoutOwnerInputSchema).array(),
          z.lazy(() => TicketUncheckedCreateWithoutOwnerInputSchema),
          z.lazy(() => TicketUncheckedCreateWithoutOwnerInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TicketCreateOrConnectWithoutOwnerInputSchema),
          z.lazy(() => TicketCreateOrConnectWithoutOwnerInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => TicketUpsertWithWhereUniqueWithoutOwnerInputSchema),
          z
            .lazy(() => TicketUpsertWithWhereUniqueWithoutOwnerInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => TicketCreateManyOwnerInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => TicketWhereUniqueInputSchema),
          z.lazy(() => TicketWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => TicketWhereUniqueInputSchema),
          z.lazy(() => TicketWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => TicketWhereUniqueInputSchema),
          z.lazy(() => TicketWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => TicketWhereUniqueInputSchema),
          z.lazy(() => TicketWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => TicketUpdateWithWhereUniqueWithoutOwnerInputSchema),
          z
            .lazy(() => TicketUpdateWithWhereUniqueWithoutOwnerInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => TicketUpdateManyWithWhereWithoutOwnerInputSchema),
          z
            .lazy(() => TicketUpdateManyWithWhereWithoutOwnerInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => TicketScalarWhereInputSchema),
          z.lazy(() => TicketScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.TicketUpdateManyWithoutOwnerNestedInput>;

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> =
  z
    .object({
      set: z.number().optional(),
      increment: z.number().optional(),
      decrement: z.number().optional(),
      multiply: z.number().optional(),
      divide: z.number().optional(),
    })
    .strict() as z.ZodType<Prisma.IntFieldUpdateOperationsInput>;

export const TicketUncheckedUpdateManyWithoutOwnerNestedInputSchema: z.ZodType<Prisma.TicketUncheckedUpdateManyWithoutOwnerNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TicketCreateWithoutOwnerInputSchema),
          z.lazy(() => TicketCreateWithoutOwnerInputSchema).array(),
          z.lazy(() => TicketUncheckedCreateWithoutOwnerInputSchema),
          z.lazy(() => TicketUncheckedCreateWithoutOwnerInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TicketCreateOrConnectWithoutOwnerInputSchema),
          z.lazy(() => TicketCreateOrConnectWithoutOwnerInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => TicketUpsertWithWhereUniqueWithoutOwnerInputSchema),
          z
            .lazy(() => TicketUpsertWithWhereUniqueWithoutOwnerInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => TicketCreateManyOwnerInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => TicketWhereUniqueInputSchema),
          z.lazy(() => TicketWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => TicketWhereUniqueInputSchema),
          z.lazy(() => TicketWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => TicketWhereUniqueInputSchema),
          z.lazy(() => TicketWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => TicketWhereUniqueInputSchema),
          z.lazy(() => TicketWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => TicketUpdateWithWhereUniqueWithoutOwnerInputSchema),
          z
            .lazy(() => TicketUpdateWithWhereUniqueWithoutOwnerInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => TicketUpdateManyWithWhereWithoutOwnerInputSchema),
          z
            .lazy(() => TicketUpdateManyWithWhereWithoutOwnerInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => TicketScalarWhereInputSchema),
          z.lazy(() => TicketScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.TicketUncheckedUpdateManyWithoutOwnerNestedInput>;

export const ActivityCreateNestedManyWithoutEventInputSchema: z.ZodType<Prisma.ActivityCreateNestedManyWithoutEventInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ActivityCreateWithoutEventInputSchema),
          z.lazy(() => ActivityCreateWithoutEventInputSchema).array(),
          z.lazy(() => ActivityUncheckedCreateWithoutEventInputSchema),
          z.lazy(() => ActivityUncheckedCreateWithoutEventInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ActivityCreateOrConnectWithoutEventInputSchema),
          z.lazy(() => ActivityCreateOrConnectWithoutEventInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ActivityCreateManyEventInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => ActivityWhereUniqueInputSchema),
          z.lazy(() => ActivityWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.ActivityCreateNestedManyWithoutEventInput>;

export const ActivityUncheckedCreateNestedManyWithoutEventInputSchema: z.ZodType<Prisma.ActivityUncheckedCreateNestedManyWithoutEventInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ActivityCreateWithoutEventInputSchema),
          z.lazy(() => ActivityCreateWithoutEventInputSchema).array(),
          z.lazy(() => ActivityUncheckedCreateWithoutEventInputSchema),
          z.lazy(() => ActivityUncheckedCreateWithoutEventInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ActivityCreateOrConnectWithoutEventInputSchema),
          z.lazy(() => ActivityCreateOrConnectWithoutEventInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ActivityCreateManyEventInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => ActivityWhereUniqueInputSchema),
          z.lazy(() => ActivityWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.ActivityUncheckedCreateNestedManyWithoutEventInput>;

export const ActivityUpdateManyWithoutEventNestedInputSchema: z.ZodType<Prisma.ActivityUpdateManyWithoutEventNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ActivityCreateWithoutEventInputSchema),
          z.lazy(() => ActivityCreateWithoutEventInputSchema).array(),
          z.lazy(() => ActivityUncheckedCreateWithoutEventInputSchema),
          z.lazy(() => ActivityUncheckedCreateWithoutEventInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ActivityCreateOrConnectWithoutEventInputSchema),
          z.lazy(() => ActivityCreateOrConnectWithoutEventInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => ActivityUpsertWithWhereUniqueWithoutEventInputSchema),
          z
            .lazy(() => ActivityUpsertWithWhereUniqueWithoutEventInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ActivityCreateManyEventInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => ActivityWhereUniqueInputSchema),
          z.lazy(() => ActivityWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ActivityWhereUniqueInputSchema),
          z.lazy(() => ActivityWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => ActivityWhereUniqueInputSchema),
          z.lazy(() => ActivityWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ActivityWhereUniqueInputSchema),
          z.lazy(() => ActivityWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => ActivityUpdateWithWhereUniqueWithoutEventInputSchema),
          z
            .lazy(() => ActivityUpdateWithWhereUniqueWithoutEventInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => ActivityUpdateManyWithWhereWithoutEventInputSchema),
          z
            .lazy(() => ActivityUpdateManyWithWhereWithoutEventInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ActivityScalarWhereInputSchema),
          z.lazy(() => ActivityScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.ActivityUpdateManyWithoutEventNestedInput>;

export const ActivityUncheckedUpdateManyWithoutEventNestedInputSchema: z.ZodType<Prisma.ActivityUncheckedUpdateManyWithoutEventNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ActivityCreateWithoutEventInputSchema),
          z.lazy(() => ActivityCreateWithoutEventInputSchema).array(),
          z.lazy(() => ActivityUncheckedCreateWithoutEventInputSchema),
          z.lazy(() => ActivityUncheckedCreateWithoutEventInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ActivityCreateOrConnectWithoutEventInputSchema),
          z.lazy(() => ActivityCreateOrConnectWithoutEventInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => ActivityUpsertWithWhereUniqueWithoutEventInputSchema),
          z
            .lazy(() => ActivityUpsertWithWhereUniqueWithoutEventInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ActivityCreateManyEventInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => ActivityWhereUniqueInputSchema),
          z.lazy(() => ActivityWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ActivityWhereUniqueInputSchema),
          z.lazy(() => ActivityWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => ActivityWhereUniqueInputSchema),
          z.lazy(() => ActivityWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ActivityWhereUniqueInputSchema),
          z.lazy(() => ActivityWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => ActivityUpdateWithWhereUniqueWithoutEventInputSchema),
          z
            .lazy(() => ActivityUpdateWithWhereUniqueWithoutEventInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => ActivityUpdateManyWithWhereWithoutEventInputSchema),
          z
            .lazy(() => ActivityUpdateManyWithWhereWithoutEventInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ActivityScalarWhereInputSchema),
          z.lazy(() => ActivityScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.ActivityUncheckedUpdateManyWithoutEventNestedInput>;

export const EventCreateNestedOneWithoutActivityInputSchema: z.ZodType<Prisma.EventCreateNestedOneWithoutActivityInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => EventCreateWithoutActivityInputSchema),
          z.lazy(() => EventUncheckedCreateWithoutActivityInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => EventCreateOrConnectWithoutActivityInputSchema)
        .optional(),
      connect: z.lazy(() => EventWhereUniqueInputSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.EventCreateNestedOneWithoutActivityInput>;

export const TicketCreateNestedManyWithoutActivityInputSchema: z.ZodType<Prisma.TicketCreateNestedManyWithoutActivityInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TicketCreateWithoutActivityInputSchema),
          z.lazy(() => TicketCreateWithoutActivityInputSchema).array(),
          z.lazy(() => TicketUncheckedCreateWithoutActivityInputSchema),
          z.lazy(() => TicketUncheckedCreateWithoutActivityInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TicketCreateOrConnectWithoutActivityInputSchema),
          z.lazy(() => TicketCreateOrConnectWithoutActivityInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => TicketCreateManyActivityInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => TicketWhereUniqueInputSchema),
          z.lazy(() => TicketWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.TicketCreateNestedManyWithoutActivityInput>;

export const TagCreateNestedManyWithoutActivityInputSchema: z.ZodType<Prisma.TagCreateNestedManyWithoutActivityInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TagCreateWithoutActivityInputSchema),
          z.lazy(() => TagCreateWithoutActivityInputSchema).array(),
          z.lazy(() => TagUncheckedCreateWithoutActivityInputSchema),
          z.lazy(() => TagUncheckedCreateWithoutActivityInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TagCreateOrConnectWithoutActivityInputSchema),
          z.lazy(() => TagCreateOrConnectWithoutActivityInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => TagWhereUniqueInputSchema),
          z.lazy(() => TagWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.TagCreateNestedManyWithoutActivityInput>;

export const TicketUncheckedCreateNestedManyWithoutActivityInputSchema: z.ZodType<Prisma.TicketUncheckedCreateNestedManyWithoutActivityInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TicketCreateWithoutActivityInputSchema),
          z.lazy(() => TicketCreateWithoutActivityInputSchema).array(),
          z.lazy(() => TicketUncheckedCreateWithoutActivityInputSchema),
          z.lazy(() => TicketUncheckedCreateWithoutActivityInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TicketCreateOrConnectWithoutActivityInputSchema),
          z.lazy(() => TicketCreateOrConnectWithoutActivityInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => TicketCreateManyActivityInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => TicketWhereUniqueInputSchema),
          z.lazy(() => TicketWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.TicketUncheckedCreateNestedManyWithoutActivityInput>;

export const TagUncheckedCreateNestedManyWithoutActivityInputSchema: z.ZodType<Prisma.TagUncheckedCreateNestedManyWithoutActivityInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TagCreateWithoutActivityInputSchema),
          z.lazy(() => TagCreateWithoutActivityInputSchema).array(),
          z.lazy(() => TagUncheckedCreateWithoutActivityInputSchema),
          z.lazy(() => TagUncheckedCreateWithoutActivityInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TagCreateOrConnectWithoutActivityInputSchema),
          z.lazy(() => TagCreateOrConnectWithoutActivityInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => TagWhereUniqueInputSchema),
          z.lazy(() => TagWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.TagUncheckedCreateNestedManyWithoutActivityInput>;

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> =
  z
    .object({
      set: z.string().optional().nullable(),
    })
    .strict() as z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput>;

export const EnumTypeRoomFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumTypeRoomFieldUpdateOperationsInput> =
  z
    .object({
      set: z.lazy(() => TypeRoomSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.EnumTypeRoomFieldUpdateOperationsInput>;

export const EventUpdateOneRequiredWithoutActivityNestedInputSchema: z.ZodType<Prisma.EventUpdateOneRequiredWithoutActivityNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => EventCreateWithoutActivityInputSchema),
          z.lazy(() => EventUncheckedCreateWithoutActivityInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => EventCreateOrConnectWithoutActivityInputSchema)
        .optional(),
      upsert: z.lazy(() => EventUpsertWithoutActivityInputSchema).optional(),
      connect: z.lazy(() => EventWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => EventUpdateToOneWithWhereWithoutActivityInputSchema),
          z.lazy(() => EventUpdateWithoutActivityInputSchema),
          z.lazy(() => EventUncheckedUpdateWithoutActivityInputSchema),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.EventUpdateOneRequiredWithoutActivityNestedInput>;

export const TicketUpdateManyWithoutActivityNestedInputSchema: z.ZodType<Prisma.TicketUpdateManyWithoutActivityNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TicketCreateWithoutActivityInputSchema),
          z.lazy(() => TicketCreateWithoutActivityInputSchema).array(),
          z.lazy(() => TicketUncheckedCreateWithoutActivityInputSchema),
          z.lazy(() => TicketUncheckedCreateWithoutActivityInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TicketCreateOrConnectWithoutActivityInputSchema),
          z.lazy(() => TicketCreateOrConnectWithoutActivityInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => TicketUpsertWithWhereUniqueWithoutActivityInputSchema),
          z
            .lazy(() => TicketUpsertWithWhereUniqueWithoutActivityInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => TicketCreateManyActivityInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => TicketWhereUniqueInputSchema),
          z.lazy(() => TicketWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => TicketWhereUniqueInputSchema),
          z.lazy(() => TicketWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => TicketWhereUniqueInputSchema),
          z.lazy(() => TicketWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => TicketWhereUniqueInputSchema),
          z.lazy(() => TicketWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => TicketUpdateWithWhereUniqueWithoutActivityInputSchema),
          z
            .lazy(() => TicketUpdateWithWhereUniqueWithoutActivityInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => TicketUpdateManyWithWhereWithoutActivityInputSchema),
          z
            .lazy(() => TicketUpdateManyWithWhereWithoutActivityInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => TicketScalarWhereInputSchema),
          z.lazy(() => TicketScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.TicketUpdateManyWithoutActivityNestedInput>;

export const TagUpdateManyWithoutActivityNestedInputSchema: z.ZodType<Prisma.TagUpdateManyWithoutActivityNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TagCreateWithoutActivityInputSchema),
          z.lazy(() => TagCreateWithoutActivityInputSchema).array(),
          z.lazy(() => TagUncheckedCreateWithoutActivityInputSchema),
          z.lazy(() => TagUncheckedCreateWithoutActivityInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TagCreateOrConnectWithoutActivityInputSchema),
          z.lazy(() => TagCreateOrConnectWithoutActivityInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => TagUpsertWithWhereUniqueWithoutActivityInputSchema),
          z
            .lazy(() => TagUpsertWithWhereUniqueWithoutActivityInputSchema)
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => TagWhereUniqueInputSchema),
          z.lazy(() => TagWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => TagWhereUniqueInputSchema),
          z.lazy(() => TagWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => TagWhereUniqueInputSchema),
          z.lazy(() => TagWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => TagWhereUniqueInputSchema),
          z.lazy(() => TagWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => TagUpdateWithWhereUniqueWithoutActivityInputSchema),
          z
            .lazy(() => TagUpdateWithWhereUniqueWithoutActivityInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => TagUpdateManyWithWhereWithoutActivityInputSchema),
          z
            .lazy(() => TagUpdateManyWithWhereWithoutActivityInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => TagScalarWhereInputSchema),
          z.lazy(() => TagScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.TagUpdateManyWithoutActivityNestedInput>;

export const TicketUncheckedUpdateManyWithoutActivityNestedInputSchema: z.ZodType<Prisma.TicketUncheckedUpdateManyWithoutActivityNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TicketCreateWithoutActivityInputSchema),
          z.lazy(() => TicketCreateWithoutActivityInputSchema).array(),
          z.lazy(() => TicketUncheckedCreateWithoutActivityInputSchema),
          z.lazy(() => TicketUncheckedCreateWithoutActivityInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TicketCreateOrConnectWithoutActivityInputSchema),
          z.lazy(() => TicketCreateOrConnectWithoutActivityInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => TicketUpsertWithWhereUniqueWithoutActivityInputSchema),
          z
            .lazy(() => TicketUpsertWithWhereUniqueWithoutActivityInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => TicketCreateManyActivityInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => TicketWhereUniqueInputSchema),
          z.lazy(() => TicketWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => TicketWhereUniqueInputSchema),
          z.lazy(() => TicketWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => TicketWhereUniqueInputSchema),
          z.lazy(() => TicketWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => TicketWhereUniqueInputSchema),
          z.lazy(() => TicketWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => TicketUpdateWithWhereUniqueWithoutActivityInputSchema),
          z
            .lazy(() => TicketUpdateWithWhereUniqueWithoutActivityInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => TicketUpdateManyWithWhereWithoutActivityInputSchema),
          z
            .lazy(() => TicketUpdateManyWithWhereWithoutActivityInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => TicketScalarWhereInputSchema),
          z.lazy(() => TicketScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.TicketUncheckedUpdateManyWithoutActivityNestedInput>;

export const TagUncheckedUpdateManyWithoutActivityNestedInputSchema: z.ZodType<Prisma.TagUncheckedUpdateManyWithoutActivityNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TagCreateWithoutActivityInputSchema),
          z.lazy(() => TagCreateWithoutActivityInputSchema).array(),
          z.lazy(() => TagUncheckedCreateWithoutActivityInputSchema),
          z.lazy(() => TagUncheckedCreateWithoutActivityInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TagCreateOrConnectWithoutActivityInputSchema),
          z.lazy(() => TagCreateOrConnectWithoutActivityInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => TagUpsertWithWhereUniqueWithoutActivityInputSchema),
          z
            .lazy(() => TagUpsertWithWhereUniqueWithoutActivityInputSchema)
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => TagWhereUniqueInputSchema),
          z.lazy(() => TagWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => TagWhereUniqueInputSchema),
          z.lazy(() => TagWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => TagWhereUniqueInputSchema),
          z.lazy(() => TagWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => TagWhereUniqueInputSchema),
          z.lazy(() => TagWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => TagUpdateWithWhereUniqueWithoutActivityInputSchema),
          z
            .lazy(() => TagUpdateWithWhereUniqueWithoutActivityInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => TagUpdateManyWithWhereWithoutActivityInputSchema),
          z
            .lazy(() => TagUpdateManyWithWhereWithoutActivityInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => TagScalarWhereInputSchema),
          z.lazy(() => TagScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.TagUncheckedUpdateManyWithoutActivityNestedInput>;

export const UserCreateNestedOneWithoutTicketsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutTicketsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutTicketsInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutTicketsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutTicketsInputSchema)
        .optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.UserCreateNestedOneWithoutTicketsInput>;

export const ActivityCreateNestedOneWithoutTicketInputSchema: z.ZodType<Prisma.ActivityCreateNestedOneWithoutTicketInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ActivityCreateWithoutTicketInputSchema),
          z.lazy(() => ActivityUncheckedCreateWithoutTicketInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => ActivityCreateOrConnectWithoutTicketInputSchema)
        .optional(),
      connect: z.lazy(() => ActivityWhereUniqueInputSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.ActivityCreateNestedOneWithoutTicketInput>;

export const UserUpdateOneRequiredWithoutTicketsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutTicketsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UserCreateWithoutTicketsInputSchema),
          z.lazy(() => UserUncheckedCreateWithoutTicketsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UserCreateOrConnectWithoutTicketsInputSchema)
        .optional(),
      upsert: z.lazy(() => UserUpsertWithoutTicketsInputSchema).optional(),
      connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => UserUpdateToOneWithWhereWithoutTicketsInputSchema),
          z.lazy(() => UserUpdateWithoutTicketsInputSchema),
          z.lazy(() => UserUncheckedUpdateWithoutTicketsInputSchema),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.UserUpdateOneRequiredWithoutTicketsNestedInput>;

export const ActivityUpdateOneRequiredWithoutTicketNestedInputSchema: z.ZodType<Prisma.ActivityUpdateOneRequiredWithoutTicketNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ActivityCreateWithoutTicketInputSchema),
          z.lazy(() => ActivityUncheckedCreateWithoutTicketInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => ActivityCreateOrConnectWithoutTicketInputSchema)
        .optional(),
      upsert: z.lazy(() => ActivityUpsertWithoutTicketInputSchema).optional(),
      connect: z.lazy(() => ActivityWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => ActivityUpdateToOneWithWhereWithoutTicketInputSchema),
          z.lazy(() => ActivityUpdateWithoutTicketInputSchema),
          z.lazy(() => ActivityUncheckedUpdateWithoutTicketInputSchema),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.ActivityUpdateOneRequiredWithoutTicketNestedInput>;

export const ActivityCreateNestedManyWithoutCategoryInputSchema: z.ZodType<Prisma.ActivityCreateNestedManyWithoutCategoryInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ActivityCreateWithoutCategoryInputSchema),
          z.lazy(() => ActivityCreateWithoutCategoryInputSchema).array(),
          z.lazy(() => ActivityUncheckedCreateWithoutCategoryInputSchema),
          z
            .lazy(() => ActivityUncheckedCreateWithoutCategoryInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ActivityCreateOrConnectWithoutCategoryInputSchema),
          z
            .lazy(() => ActivityCreateOrConnectWithoutCategoryInputSchema)
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ActivityWhereUniqueInputSchema),
          z.lazy(() => ActivityWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.ActivityCreateNestedManyWithoutCategoryInput>;

export const ActivityUncheckedCreateNestedManyWithoutCategoryInputSchema: z.ZodType<Prisma.ActivityUncheckedCreateNestedManyWithoutCategoryInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ActivityCreateWithoutCategoryInputSchema),
          z.lazy(() => ActivityCreateWithoutCategoryInputSchema).array(),
          z.lazy(() => ActivityUncheckedCreateWithoutCategoryInputSchema),
          z
            .lazy(() => ActivityUncheckedCreateWithoutCategoryInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ActivityCreateOrConnectWithoutCategoryInputSchema),
          z
            .lazy(() => ActivityCreateOrConnectWithoutCategoryInputSchema)
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ActivityWhereUniqueInputSchema),
          z.lazy(() => ActivityWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.ActivityUncheckedCreateNestedManyWithoutCategoryInput>;

export const ActivityUpdateManyWithoutCategoryNestedInputSchema: z.ZodType<Prisma.ActivityUpdateManyWithoutCategoryNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ActivityCreateWithoutCategoryInputSchema),
          z.lazy(() => ActivityCreateWithoutCategoryInputSchema).array(),
          z.lazy(() => ActivityUncheckedCreateWithoutCategoryInputSchema),
          z
            .lazy(() => ActivityUncheckedCreateWithoutCategoryInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ActivityCreateOrConnectWithoutCategoryInputSchema),
          z
            .lazy(() => ActivityCreateOrConnectWithoutCategoryInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => ActivityUpsertWithWhereUniqueWithoutCategoryInputSchema),
          z
            .lazy(() => ActivityUpsertWithWhereUniqueWithoutCategoryInputSchema)
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => ActivityWhereUniqueInputSchema),
          z.lazy(() => ActivityWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ActivityWhereUniqueInputSchema),
          z.lazy(() => ActivityWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => ActivityWhereUniqueInputSchema),
          z.lazy(() => ActivityWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ActivityWhereUniqueInputSchema),
          z.lazy(() => ActivityWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => ActivityUpdateWithWhereUniqueWithoutCategoryInputSchema),
          z
            .lazy(() => ActivityUpdateWithWhereUniqueWithoutCategoryInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => ActivityUpdateManyWithWhereWithoutCategoryInputSchema),
          z
            .lazy(() => ActivityUpdateManyWithWhereWithoutCategoryInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ActivityScalarWhereInputSchema),
          z.lazy(() => ActivityScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.ActivityUpdateManyWithoutCategoryNestedInput>;

export const ActivityUncheckedUpdateManyWithoutCategoryNestedInputSchema: z.ZodType<Prisma.ActivityUncheckedUpdateManyWithoutCategoryNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ActivityCreateWithoutCategoryInputSchema),
          z.lazy(() => ActivityCreateWithoutCategoryInputSchema).array(),
          z.lazy(() => ActivityUncheckedCreateWithoutCategoryInputSchema),
          z
            .lazy(() => ActivityUncheckedCreateWithoutCategoryInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ActivityCreateOrConnectWithoutCategoryInputSchema),
          z
            .lazy(() => ActivityCreateOrConnectWithoutCategoryInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => ActivityUpsertWithWhereUniqueWithoutCategoryInputSchema),
          z
            .lazy(() => ActivityUpsertWithWhereUniqueWithoutCategoryInputSchema)
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => ActivityWhereUniqueInputSchema),
          z.lazy(() => ActivityWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ActivityWhereUniqueInputSchema),
          z.lazy(() => ActivityWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => ActivityWhereUniqueInputSchema),
          z.lazy(() => ActivityWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ActivityWhereUniqueInputSchema),
          z.lazy(() => ActivityWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => ActivityUpdateWithWhereUniqueWithoutCategoryInputSchema),
          z
            .lazy(() => ActivityUpdateWithWhereUniqueWithoutCategoryInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => ActivityUpdateManyWithWhereWithoutCategoryInputSchema),
          z
            .lazy(() => ActivityUpdateManyWithWhereWithoutCategoryInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ActivityScalarWhereInputSchema),
          z.lazy(() => ActivityScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.ActivityUncheckedUpdateManyWithoutCategoryNestedInput>;

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
  })
  .strict() as z.ZodType<Prisma.NestedIntFilter>;

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z
  .object({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringFilterSchema)])
      .optional(),
  })
  .strict() as z.ZodType<Prisma.NestedStringFilter>;

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z
  .object({
    equals: z.boolean().optional(),
    not: z
      .union([z.boolean(), z.lazy(() => NestedBoolFilterSchema)])
      .optional(),
  })
  .strict() as z.ZodType<Prisma.NestedBoolFilter>;

export const NestedEnumRoleFilterSchema: z.ZodType<Prisma.NestedEnumRoleFilter> =
  z
    .object({
      equals: z.lazy(() => RoleSchema).optional(),
      in: z
        .lazy(() => RoleSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => RoleSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => RoleSchema),
          z.lazy(() => NestedEnumRoleFilterSchema),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.NestedEnumRoleFilter>;

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> =
  z
    .object({
      equals: z.coerce.date().optional(),
      in: z.coerce.date().array().optional(),
      notIn: z.coerce.date().array().optional(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.NestedDateTimeFilter>;

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional(),
      in: z.number().array().optional(),
      notIn: z.number().array().optional(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedIntWithAggregatesFilterSchema)])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
      _sum: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedIntFilterSchema).optional(),
      _max: z.lazy(() => NestedIntFilterSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.NestedIntWithAggregatesFilter>;

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedFloatFilterSchema)])
      .optional(),
  })
  .strict() as z.ZodType<Prisma.NestedFloatFilter>;

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional(),
      in: z.string().array().optional(),
      notIn: z.string().array().optional(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedStringFilterSchema).optional(),
      _max: z.lazy(() => NestedStringFilterSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.NestedStringWithAggregatesFilter>;

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> =
  z
    .object({
      equals: z.boolean().optional(),
      not: z
        .union([
          z.boolean(),
          z.lazy(() => NestedBoolWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedBoolFilterSchema).optional(),
      _max: z.lazy(() => NestedBoolFilterSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.NestedBoolWithAggregatesFilter>;

export const NestedEnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumRoleWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => RoleSchema).optional(),
      in: z
        .lazy(() => RoleSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => RoleSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => RoleSchema),
          z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.NestedEnumRoleWithAggregatesFilter>;

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> =
  z
    .object({
      equals: z.coerce.date().optional(),
      in: z.coerce.date().array().optional(),
      notIn: z.coerce.date().array().optional(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
      _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter>;

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> =
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.string().array().optional().nullable(),
      notIn: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      not: z
        .union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)])
        .optional()
        .nullable(),
    })
    .strict() as z.ZodType<Prisma.NestedStringNullableFilter>;

export const NestedEnumTypeRoomFilterSchema: z.ZodType<Prisma.NestedEnumTypeRoomFilter> =
  z
    .object({
      equals: z.lazy(() => TypeRoomSchema).optional(),
      in: z
        .lazy(() => TypeRoomSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => TypeRoomSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => TypeRoomSchema),
          z.lazy(() => NestedEnumTypeRoomFilterSchema),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.NestedEnumTypeRoomFilter>;

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.string().array().optional().nullable(),
      notIn: z.string().array().optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter>;

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.number().array().optional().nullable(),
      notIn: z.number().array().optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedIntNullableFilterSchema)])
        .optional()
        .nullable(),
    })
    .strict() as z.ZodType<Prisma.NestedIntNullableFilter>;

export const NestedEnumTypeRoomWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumTypeRoomWithAggregatesFilter> =
  z
    .object({
      equals: z.lazy(() => TypeRoomSchema).optional(),
      in: z
        .lazy(() => TypeRoomSchema)
        .array()
        .optional(),
      notIn: z
        .lazy(() => TypeRoomSchema)
        .array()
        .optional(),
      not: z
        .union([
          z.lazy(() => TypeRoomSchema),
          z.lazy(() => NestedEnumTypeRoomWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedEnumTypeRoomFilterSchema).optional(),
      _max: z.lazy(() => NestedEnumTypeRoomFilterSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.NestedEnumTypeRoomWithAggregatesFilter>;

export const TicketCreateWithoutOwnerInputSchema: z.ZodType<Prisma.TicketCreateWithoutOwnerInput> =
  z
    .object({
      online: z.boolean(),
      used: z.boolean().optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      activity: z.lazy(() => ActivityCreateNestedOneWithoutTicketInputSchema),
    })
    .strict() as z.ZodType<Prisma.TicketCreateWithoutOwnerInput>;

export const TicketUncheckedCreateWithoutOwnerInputSchema: z.ZodType<Prisma.TicketUncheckedCreateWithoutOwnerInput> =
  z
    .object({
      id: z.number().int().optional(),
      online: z.boolean(),
      used: z.boolean().optional(),
      activityId: z
        .number({
          invalid_type_error: 'activityId must be type number',
          required_error: 'activityId is required',
          description: 'schema validation error',
        })
        .nonnegative({ message: 'activityId must be > 0' }),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict() as z.ZodType<Prisma.TicketUncheckedCreateWithoutOwnerInput>;

export const TicketCreateOrConnectWithoutOwnerInputSchema: z.ZodType<Prisma.TicketCreateOrConnectWithoutOwnerInput> =
  z
    .object({
      where: z.lazy(() => TicketWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => TicketCreateWithoutOwnerInputSchema),
        z.lazy(() => TicketUncheckedCreateWithoutOwnerInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.TicketCreateOrConnectWithoutOwnerInput>;

export const TicketCreateManyOwnerInputEnvelopeSchema: z.ZodType<Prisma.TicketCreateManyOwnerInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => TicketCreateManyOwnerInputSchema),
        z.lazy(() => TicketCreateManyOwnerInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict() as z.ZodType<Prisma.TicketCreateManyOwnerInputEnvelope>;

export const TicketUpsertWithWhereUniqueWithoutOwnerInputSchema: z.ZodType<Prisma.TicketUpsertWithWhereUniqueWithoutOwnerInput> =
  z
    .object({
      where: z.lazy(() => TicketWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => TicketUpdateWithoutOwnerInputSchema),
        z.lazy(() => TicketUncheckedUpdateWithoutOwnerInputSchema),
      ]),
      create: z.union([
        z.lazy(() => TicketCreateWithoutOwnerInputSchema),
        z.lazy(() => TicketUncheckedCreateWithoutOwnerInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.TicketUpsertWithWhereUniqueWithoutOwnerInput>;

export const TicketUpdateWithWhereUniqueWithoutOwnerInputSchema: z.ZodType<Prisma.TicketUpdateWithWhereUniqueWithoutOwnerInput> =
  z
    .object({
      where: z.lazy(() => TicketWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => TicketUpdateWithoutOwnerInputSchema),
        z.lazy(() => TicketUncheckedUpdateWithoutOwnerInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.TicketUpdateWithWhereUniqueWithoutOwnerInput>;

export const TicketUpdateManyWithWhereWithoutOwnerInputSchema: z.ZodType<Prisma.TicketUpdateManyWithWhereWithoutOwnerInput> =
  z
    .object({
      where: z.lazy(() => TicketScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => TicketUpdateManyMutationInputSchema),
        z.lazy(() => TicketUncheckedUpdateManyWithoutOwnerInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.TicketUpdateManyWithWhereWithoutOwnerInput>;

export const TicketScalarWhereInputSchema: z.ZodType<Prisma.TicketScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => TicketScalarWhereInputSchema),
          z.lazy(() => TicketScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => TicketScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => TicketScalarWhereInputSchema),
          z.lazy(() => TicketScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      online: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
      used: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
      ownerId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      activityId: z
        .union([z.lazy(() => IntFilterSchema), z.number()])
        .optional(),
      createdAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      updatedAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.TicketScalarWhereInput>;

export const ActivityCreateWithoutEventInputSchema: z.ZodType<Prisma.ActivityCreateWithoutEventInput> =
  z
    .object({
      title: z.string({
        invalid_type_error: 'title must be type string',
        required_error: 'title is required',
        description: 'schema validation error',
      }),
      description: z.string({
        invalid_type_error: 'description must be type string',
        required_error: 'description is required',
        description: 'schema validation error',
      }),
      roomName: z.string({
        invalid_type_error: 'roomName must be type string',
        required_error: 'roomName is required',
        description: 'schema validation error',
      }),
      speaker: z.string({
        invalid_type_error: 'speaker must be type string',
        required_error: 'speaker is required',
        description: 'schema validation error',
      }),
      image: z
        .string({
          invalid_type_error: 'image must be type string',
          required_error: 'image is required',
          description: 'schema validation error',
        })
        .optional()
        .nullable(),
      start: z.coerce.date({
        invalid_type_error: 'start must be type date',
        required_error: 'start is required',
        description: 'schema validation error',
      }),
      end: z.coerce.date({
        invalid_type_error: 'end must be type date',
        required_error: 'end is required',
        description: 'schema validation error',
      }),
      ticketMax: z.number({
        invalid_type_error: 'ticketMax must be type number',
        required_error: 'ticketMax is required',
        description: 'schema validation error',
      }),
      ticketBuy: z
        .number({
          invalid_type_error: 'ticketBuy must be type number',
          required_error: 'ticketBuy is required',
          description: 'schema validation error',
        })
        .nonnegative({ message: 'ticketMin must be >= 0' })
        .optional(),
      replay: z.string().url({ message: 'invalid url' }).optional().nullable(),
      typeRoom: z.lazy(() => TypeRoomSchema).optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      ticket: z
        .lazy(() => TicketCreateNestedManyWithoutActivityInputSchema)
        .optional(),
      category: z
        .lazy(() => TagCreateNestedManyWithoutActivityInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.ActivityCreateWithoutEventInput>;

export const ActivityUncheckedCreateWithoutEventInputSchema: z.ZodType<Prisma.ActivityUncheckedCreateWithoutEventInput> =
  z
    .object({
      id: z.number().int().optional(),
      title: z.string({
        invalid_type_error: 'title must be type string',
        required_error: 'title is required',
        description: 'schema validation error',
      }),
      description: z.string({
        invalid_type_error: 'description must be type string',
        required_error: 'description is required',
        description: 'schema validation error',
      }),
      roomName: z.string({
        invalid_type_error: 'roomName must be type string',
        required_error: 'roomName is required',
        description: 'schema validation error',
      }),
      speaker: z.string({
        invalid_type_error: 'speaker must be type string',
        required_error: 'speaker is required',
        description: 'schema validation error',
      }),
      image: z
        .string({
          invalid_type_error: 'image must be type string',
          required_error: 'image is required',
          description: 'schema validation error',
        })
        .optional()
        .nullable(),
      start: z.coerce.date({
        invalid_type_error: 'start must be type date',
        required_error: 'start is required',
        description: 'schema validation error',
      }),
      end: z.coerce.date({
        invalid_type_error: 'end must be type date',
        required_error: 'end is required',
        description: 'schema validation error',
      }),
      ticketMax: z.number({
        invalid_type_error: 'ticketMax must be type number',
        required_error: 'ticketMax is required',
        description: 'schema validation error',
      }),
      ticketBuy: z
        .number({
          invalid_type_error: 'ticketBuy must be type number',
          required_error: 'ticketBuy is required',
          description: 'schema validation error',
        })
        .nonnegative({ message: 'ticketMin must be >= 0' })
        .optional(),
      replay: z.string().url({ message: 'invalid url' }).optional().nullable(),
      typeRoom: z.lazy(() => TypeRoomSchema).optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      ticket: z
        .lazy(() => TicketUncheckedCreateNestedManyWithoutActivityInputSchema)
        .optional(),
      category: z
        .lazy(() => TagUncheckedCreateNestedManyWithoutActivityInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.ActivityUncheckedCreateWithoutEventInput>;

export const ActivityCreateOrConnectWithoutEventInputSchema: z.ZodType<Prisma.ActivityCreateOrConnectWithoutEventInput> =
  z
    .object({
      where: z.lazy(() => ActivityWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => ActivityCreateWithoutEventInputSchema),
        z.lazy(() => ActivityUncheckedCreateWithoutEventInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.ActivityCreateOrConnectWithoutEventInput>;

export const ActivityCreateManyEventInputEnvelopeSchema: z.ZodType<Prisma.ActivityCreateManyEventInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => ActivityCreateManyEventInputSchema),
        z.lazy(() => ActivityCreateManyEventInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict() as z.ZodType<Prisma.ActivityCreateManyEventInputEnvelope>;

export const ActivityUpsertWithWhereUniqueWithoutEventInputSchema: z.ZodType<Prisma.ActivityUpsertWithWhereUniqueWithoutEventInput> =
  z
    .object({
      where: z.lazy(() => ActivityWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => ActivityUpdateWithoutEventInputSchema),
        z.lazy(() => ActivityUncheckedUpdateWithoutEventInputSchema),
      ]),
      create: z.union([
        z.lazy(() => ActivityCreateWithoutEventInputSchema),
        z.lazy(() => ActivityUncheckedCreateWithoutEventInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.ActivityUpsertWithWhereUniqueWithoutEventInput>;

export const ActivityUpdateWithWhereUniqueWithoutEventInputSchema: z.ZodType<Prisma.ActivityUpdateWithWhereUniqueWithoutEventInput> =
  z
    .object({
      where: z.lazy(() => ActivityWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => ActivityUpdateWithoutEventInputSchema),
        z.lazy(() => ActivityUncheckedUpdateWithoutEventInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.ActivityUpdateWithWhereUniqueWithoutEventInput>;

export const ActivityUpdateManyWithWhereWithoutEventInputSchema: z.ZodType<Prisma.ActivityUpdateManyWithWhereWithoutEventInput> =
  z
    .object({
      where: z.lazy(() => ActivityScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => ActivityUpdateManyMutationInputSchema),
        z.lazy(() => ActivityUncheckedUpdateManyWithoutEventInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.ActivityUpdateManyWithWhereWithoutEventInput>;

export const ActivityScalarWhereInputSchema: z.ZodType<Prisma.ActivityScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => ActivityScalarWhereInputSchema),
          z.lazy(() => ActivityScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => ActivityScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => ActivityScalarWhereInputSchema),
          z.lazy(() => ActivityScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      title: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      description: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      roomName: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      speaker: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      image: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      start: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      end: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      ticketMax: z
        .union([z.lazy(() => IntFilterSchema), z.number()])
        .optional(),
      ticketBuy: z
        .union([z.lazy(() => IntFilterSchema), z.number()])
        .optional(),
      replay: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      typeRoom: z
        .union([
          z.lazy(() => EnumTypeRoomFilterSchema),
          z.lazy(() => TypeRoomSchema),
        ])
        .optional(),
      eventId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      createdAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      updatedAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.ActivityScalarWhereInput>;

export const EventCreateWithoutActivityInputSchema: z.ZodType<Prisma.EventCreateWithoutActivityInput> =
  z
    .object({
      title: z.string({
        invalid_type_error: 'title must be type string',
        required_error: 'title is required',
        description: 'schema validation error',
      }),
      description: z.string({
        invalid_type_error: 'description must be type string',
        required_error: 'description is required',
        description: 'schema validation error',
      }),
      location: z.string({
        invalid_type_error: 'location must be type string',
        required_error: 'location is required',
        description: 'schema validation error',
      }),
      start: z.coerce.date({
        invalid_type_error: 'start must be type date',
        required_error: 'start is required',
        description: 'schema validation error',
      }),
      end: z.coerce.date({
        invalid_type_error: 'end must be type date',
        required_error: 'end is required',
        description: 'schema validation error',
      }),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict() as z.ZodType<Prisma.EventCreateWithoutActivityInput>;

export const EventUncheckedCreateWithoutActivityInputSchema: z.ZodType<Prisma.EventUncheckedCreateWithoutActivityInput> =
  z
    .object({
      id: z.number().int().optional(),
      title: z.string({
        invalid_type_error: 'title must be type string',
        required_error: 'title is required',
        description: 'schema validation error',
      }),
      description: z.string({
        invalid_type_error: 'description must be type string',
        required_error: 'description is required',
        description: 'schema validation error',
      }),
      location: z.string({
        invalid_type_error: 'location must be type string',
        required_error: 'location is required',
        description: 'schema validation error',
      }),
      start: z.coerce.date({
        invalid_type_error: 'start must be type date',
        required_error: 'start is required',
        description: 'schema validation error',
      }),
      end: z.coerce.date({
        invalid_type_error: 'end must be type date',
        required_error: 'end is required',
        description: 'schema validation error',
      }),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict() as z.ZodType<Prisma.EventUncheckedCreateWithoutActivityInput>;

export const EventCreateOrConnectWithoutActivityInputSchema: z.ZodType<Prisma.EventCreateOrConnectWithoutActivityInput> =
  z
    .object({
      where: z.lazy(() => EventWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => EventCreateWithoutActivityInputSchema),
        z.lazy(() => EventUncheckedCreateWithoutActivityInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.EventCreateOrConnectWithoutActivityInput>;

export const TicketCreateWithoutActivityInputSchema: z.ZodType<Prisma.TicketCreateWithoutActivityInput> =
  z
    .object({
      online: z.boolean(),
      used: z.boolean().optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      owner: z.lazy(() => UserCreateNestedOneWithoutTicketsInputSchema),
    })
    .strict() as z.ZodType<Prisma.TicketCreateWithoutActivityInput>;

export const TicketUncheckedCreateWithoutActivityInputSchema: z.ZodType<Prisma.TicketUncheckedCreateWithoutActivityInput> =
  z
    .object({
      id: z.number().int().optional(),
      online: z.boolean(),
      used: z.boolean().optional(),
      ownerId: z
        .number({
          invalid_type_error: 'ownerId must be type number',
          required_error: 'ownerId is required',
          description: 'schema validation error',
        })
        .nonnegative({ message: 'ownerId must be > 0' }),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict() as z.ZodType<Prisma.TicketUncheckedCreateWithoutActivityInput>;

export const TicketCreateOrConnectWithoutActivityInputSchema: z.ZodType<Prisma.TicketCreateOrConnectWithoutActivityInput> =
  z
    .object({
      where: z.lazy(() => TicketWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => TicketCreateWithoutActivityInputSchema),
        z.lazy(() => TicketUncheckedCreateWithoutActivityInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.TicketCreateOrConnectWithoutActivityInput>;

export const TicketCreateManyActivityInputEnvelopeSchema: z.ZodType<Prisma.TicketCreateManyActivityInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => TicketCreateManyActivityInputSchema),
        z.lazy(() => TicketCreateManyActivityInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict() as z.ZodType<Prisma.TicketCreateManyActivityInputEnvelope>;

export const TagCreateWithoutActivityInputSchema: z.ZodType<Prisma.TagCreateWithoutActivityInput> =
  z
    .object({
      name: z
        .string({
          invalid_type_error: 'name must be type string',
          required_error: 'name is required',
          description: 'schema validation error',
        })
        .min(3, { message: 'Must be 3 or more characters long' }),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict() as z.ZodType<Prisma.TagCreateWithoutActivityInput>;

export const TagUncheckedCreateWithoutActivityInputSchema: z.ZodType<Prisma.TagUncheckedCreateWithoutActivityInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z
        .string({
          invalid_type_error: 'name must be type string',
          required_error: 'name is required',
          description: 'schema validation error',
        })
        .min(3, { message: 'Must be 3 or more characters long' }),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict() as z.ZodType<Prisma.TagUncheckedCreateWithoutActivityInput>;

export const TagCreateOrConnectWithoutActivityInputSchema: z.ZodType<Prisma.TagCreateOrConnectWithoutActivityInput> =
  z
    .object({
      where: z.lazy(() => TagWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => TagCreateWithoutActivityInputSchema),
        z.lazy(() => TagUncheckedCreateWithoutActivityInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.TagCreateOrConnectWithoutActivityInput>;

export const EventUpsertWithoutActivityInputSchema: z.ZodType<Prisma.EventUpsertWithoutActivityInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => EventUpdateWithoutActivityInputSchema),
        z.lazy(() => EventUncheckedUpdateWithoutActivityInputSchema),
      ]),
      create: z.union([
        z.lazy(() => EventCreateWithoutActivityInputSchema),
        z.lazy(() => EventUncheckedCreateWithoutActivityInputSchema),
      ]),
      where: z.lazy(() => EventWhereInputSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.EventUpsertWithoutActivityInput>;

export const EventUpdateToOneWithWhereWithoutActivityInputSchema: z.ZodType<Prisma.EventUpdateToOneWithWhereWithoutActivityInput> =
  z
    .object({
      where: z.lazy(() => EventWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => EventUpdateWithoutActivityInputSchema),
        z.lazy(() => EventUncheckedUpdateWithoutActivityInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.EventUpdateToOneWithWhereWithoutActivityInput>;

export const EventUpdateWithoutActivityInputSchema: z.ZodType<Prisma.EventUpdateWithoutActivityInput> =
  z
    .object({
      title: z
        .union([
          z.string({
            invalid_type_error: 'title must be type string',
            required_error: 'title is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string({
            invalid_type_error: 'description must be type string',
            required_error: 'description is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      location: z
        .union([
          z.string({
            invalid_type_error: 'location must be type string',
            required_error: 'location is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      start: z
        .union([
          z.coerce.date({
            invalid_type_error: 'start must be type date',
            required_error: 'start is required',
            description: 'schema validation error',
          }),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      end: z
        .union([
          z.coerce.date({
            invalid_type_error: 'end must be type date',
            required_error: 'end is required',
            description: 'schema validation error',
          }),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.EventUpdateWithoutActivityInput>;

export const EventUncheckedUpdateWithoutActivityInputSchema: z.ZodType<Prisma.EventUncheckedUpdateWithoutActivityInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      title: z
        .union([
          z.string({
            invalid_type_error: 'title must be type string',
            required_error: 'title is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string({
            invalid_type_error: 'description must be type string',
            required_error: 'description is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      location: z
        .union([
          z.string({
            invalid_type_error: 'location must be type string',
            required_error: 'location is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      start: z
        .union([
          z.coerce.date({
            invalid_type_error: 'start must be type date',
            required_error: 'start is required',
            description: 'schema validation error',
          }),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      end: z
        .union([
          z.coerce.date({
            invalid_type_error: 'end must be type date',
            required_error: 'end is required',
            description: 'schema validation error',
          }),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.EventUncheckedUpdateWithoutActivityInput>;

export const TicketUpsertWithWhereUniqueWithoutActivityInputSchema: z.ZodType<Prisma.TicketUpsertWithWhereUniqueWithoutActivityInput> =
  z
    .object({
      where: z.lazy(() => TicketWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => TicketUpdateWithoutActivityInputSchema),
        z.lazy(() => TicketUncheckedUpdateWithoutActivityInputSchema),
      ]),
      create: z.union([
        z.lazy(() => TicketCreateWithoutActivityInputSchema),
        z.lazy(() => TicketUncheckedCreateWithoutActivityInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.TicketUpsertWithWhereUniqueWithoutActivityInput>;

export const TicketUpdateWithWhereUniqueWithoutActivityInputSchema: z.ZodType<Prisma.TicketUpdateWithWhereUniqueWithoutActivityInput> =
  z
    .object({
      where: z.lazy(() => TicketWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => TicketUpdateWithoutActivityInputSchema),
        z.lazy(() => TicketUncheckedUpdateWithoutActivityInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.TicketUpdateWithWhereUniqueWithoutActivityInput>;

export const TicketUpdateManyWithWhereWithoutActivityInputSchema: z.ZodType<Prisma.TicketUpdateManyWithWhereWithoutActivityInput> =
  z
    .object({
      where: z.lazy(() => TicketScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => TicketUpdateManyMutationInputSchema),
        z.lazy(() => TicketUncheckedUpdateManyWithoutActivityInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.TicketUpdateManyWithWhereWithoutActivityInput>;

export const TagUpsertWithWhereUniqueWithoutActivityInputSchema: z.ZodType<Prisma.TagUpsertWithWhereUniqueWithoutActivityInput> =
  z
    .object({
      where: z.lazy(() => TagWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => TagUpdateWithoutActivityInputSchema),
        z.lazy(() => TagUncheckedUpdateWithoutActivityInputSchema),
      ]),
      create: z.union([
        z.lazy(() => TagCreateWithoutActivityInputSchema),
        z.lazy(() => TagUncheckedCreateWithoutActivityInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.TagUpsertWithWhereUniqueWithoutActivityInput>;

export const TagUpdateWithWhereUniqueWithoutActivityInputSchema: z.ZodType<Prisma.TagUpdateWithWhereUniqueWithoutActivityInput> =
  z
    .object({
      where: z.lazy(() => TagWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => TagUpdateWithoutActivityInputSchema),
        z.lazy(() => TagUncheckedUpdateWithoutActivityInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.TagUpdateWithWhereUniqueWithoutActivityInput>;

export const TagUpdateManyWithWhereWithoutActivityInputSchema: z.ZodType<Prisma.TagUpdateManyWithWhereWithoutActivityInput> =
  z
    .object({
      where: z.lazy(() => TagScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => TagUpdateManyMutationInputSchema),
        z.lazy(() => TagUncheckedUpdateManyWithoutActivityInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.TagUpdateManyWithWhereWithoutActivityInput>;

export const TagScalarWhereInputSchema: z.ZodType<Prisma.TagScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => TagScalarWhereInputSchema),
          z.lazy(() => TagScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => TagScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => TagScalarWhereInputSchema),
          z.lazy(() => TagScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      createdAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      updatedAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.TagScalarWhereInput>;

export const UserCreateWithoutTicketsInputSchema: z.ZodType<Prisma.UserCreateWithoutTicketsInput> =
  z
    .object({
      email: z.string().email({ message: 'invalid email address' }),
      name: z.string({
        invalid_type_error: 'name must be type string',
        required_error: 'name is required',
        description: 'schema validation error',
      }),
      lastname: z.string({
        invalid_type_error: 'lastname must be type string',
        required_error: 'lastname is required',
        description: 'schema validation error',
      }),
      password: z.string({
        invalid_type_error: 'password must be type string',
        required_error: 'password is required',
        description: 'schema validation error',
      }),
      company: z.string({
        invalid_type_error: 'company must be type string',
        required_error: 'company is required',
        description: 'schema validation error',
      }),
      archipel: z.boolean().optional(),
      role: z.lazy(() => RoleSchema).optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict() as z.ZodType<Prisma.UserCreateWithoutTicketsInput>;

export const UserUncheckedCreateWithoutTicketsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutTicketsInput> =
  z
    .object({
      id: z.number().int().optional(),
      email: z.string().email({ message: 'invalid email address' }),
      name: z.string({
        invalid_type_error: 'name must be type string',
        required_error: 'name is required',
        description: 'schema validation error',
      }),
      lastname: z.string({
        invalid_type_error: 'lastname must be type string',
        required_error: 'lastname is required',
        description: 'schema validation error',
      }),
      password: z.string({
        invalid_type_error: 'password must be type string',
        required_error: 'password is required',
        description: 'schema validation error',
      }),
      company: z.string({
        invalid_type_error: 'company must be type string',
        required_error: 'company is required',
        description: 'schema validation error',
      }),
      archipel: z.boolean().optional(),
      role: z.lazy(() => RoleSchema).optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict() as z.ZodType<Prisma.UserUncheckedCreateWithoutTicketsInput>;

export const UserCreateOrConnectWithoutTicketsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutTicketsInput> =
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => UserCreateWithoutTicketsInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutTicketsInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.UserCreateOrConnectWithoutTicketsInput>;

export const ActivityCreateWithoutTicketInputSchema: z.ZodType<Prisma.ActivityCreateWithoutTicketInput> =
  z
    .object({
      title: z.string({
        invalid_type_error: 'title must be type string',
        required_error: 'title is required',
        description: 'schema validation error',
      }),
      description: z.string({
        invalid_type_error: 'description must be type string',
        required_error: 'description is required',
        description: 'schema validation error',
      }),
      roomName: z.string({
        invalid_type_error: 'roomName must be type string',
        required_error: 'roomName is required',
        description: 'schema validation error',
      }),
      speaker: z.string({
        invalid_type_error: 'speaker must be type string',
        required_error: 'speaker is required',
        description: 'schema validation error',
      }),
      image: z
        .string({
          invalid_type_error: 'image must be type string',
          required_error: 'image is required',
          description: 'schema validation error',
        })
        .optional()
        .nullable(),
      start: z.coerce.date({
        invalid_type_error: 'start must be type date',
        required_error: 'start is required',
        description: 'schema validation error',
      }),
      end: z.coerce.date({
        invalid_type_error: 'end must be type date',
        required_error: 'end is required',
        description: 'schema validation error',
      }),
      ticketMax: z.number({
        invalid_type_error: 'ticketMax must be type number',
        required_error: 'ticketMax is required',
        description: 'schema validation error',
      }),
      ticketBuy: z
        .number({
          invalid_type_error: 'ticketBuy must be type number',
          required_error: 'ticketBuy is required',
          description: 'schema validation error',
        })
        .nonnegative({ message: 'ticketMin must be >= 0' })
        .optional(),
      replay: z.string().url({ message: 'invalid url' }).optional().nullable(),
      typeRoom: z.lazy(() => TypeRoomSchema).optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      event: z.lazy(() => EventCreateNestedOneWithoutActivityInputSchema),
      category: z
        .lazy(() => TagCreateNestedManyWithoutActivityInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.ActivityCreateWithoutTicketInput>;

export const ActivityUncheckedCreateWithoutTicketInputSchema: z.ZodType<Prisma.ActivityUncheckedCreateWithoutTicketInput> =
  z
    .object({
      id: z.number().int().optional(),
      title: z.string({
        invalid_type_error: 'title must be type string',
        required_error: 'title is required',
        description: 'schema validation error',
      }),
      description: z.string({
        invalid_type_error: 'description must be type string',
        required_error: 'description is required',
        description: 'schema validation error',
      }),
      roomName: z.string({
        invalid_type_error: 'roomName must be type string',
        required_error: 'roomName is required',
        description: 'schema validation error',
      }),
      speaker: z.string({
        invalid_type_error: 'speaker must be type string',
        required_error: 'speaker is required',
        description: 'schema validation error',
      }),
      image: z
        .string({
          invalid_type_error: 'image must be type string',
          required_error: 'image is required',
          description: 'schema validation error',
        })
        .optional()
        .nullable(),
      start: z.coerce.date({
        invalid_type_error: 'start must be type date',
        required_error: 'start is required',
        description: 'schema validation error',
      }),
      end: z.coerce.date({
        invalid_type_error: 'end must be type date',
        required_error: 'end is required',
        description: 'schema validation error',
      }),
      ticketMax: z.number({
        invalid_type_error: 'ticketMax must be type number',
        required_error: 'ticketMax is required',
        description: 'schema validation error',
      }),
      ticketBuy: z
        .number({
          invalid_type_error: 'ticketBuy must be type number',
          required_error: 'ticketBuy is required',
          description: 'schema validation error',
        })
        .nonnegative({ message: 'ticketMin must be >= 0' })
        .optional(),
      replay: z.string().url({ message: 'invalid url' }).optional().nullable(),
      typeRoom: z.lazy(() => TypeRoomSchema).optional(),
      eventId: z
        .number({
          invalid_type_error: 'eventId must be type number',
          required_error: 'eventId is required',
          description: 'schema validation error',
        })
        .nonnegative({ message: 'eventId must be > 0' }),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      category: z
        .lazy(() => TagUncheckedCreateNestedManyWithoutActivityInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.ActivityUncheckedCreateWithoutTicketInput>;

export const ActivityCreateOrConnectWithoutTicketInputSchema: z.ZodType<Prisma.ActivityCreateOrConnectWithoutTicketInput> =
  z
    .object({
      where: z.lazy(() => ActivityWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => ActivityCreateWithoutTicketInputSchema),
        z.lazy(() => ActivityUncheckedCreateWithoutTicketInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.ActivityCreateOrConnectWithoutTicketInput>;

export const UserUpsertWithoutTicketsInputSchema: z.ZodType<Prisma.UserUpsertWithoutTicketsInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => UserUpdateWithoutTicketsInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutTicketsInputSchema),
      ]),
      create: z.union([
        z.lazy(() => UserCreateWithoutTicketsInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutTicketsInputSchema),
      ]),
      where: z.lazy(() => UserWhereInputSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.UserUpsertWithoutTicketsInput>;

export const UserUpdateToOneWithWhereWithoutTicketsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutTicketsInput> =
  z
    .object({
      where: z.lazy(() => UserWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => UserUpdateWithoutTicketsInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutTicketsInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutTicketsInput>;

export const UserUpdateWithoutTicketsInputSchema: z.ZodType<Prisma.UserUpdateWithoutTicketsInput> =
  z
    .object({
      email: z
        .union([
          z.string().email({ message: 'invalid email address' }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string({
            invalid_type_error: 'name must be type string',
            required_error: 'name is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      lastname: z
        .union([
          z.string({
            invalid_type_error: 'lastname must be type string',
            required_error: 'lastname is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      password: z
        .union([
          z.string({
            invalid_type_error: 'password must be type string',
            required_error: 'password is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      company: z
        .union([
          z.string({
            invalid_type_error: 'company must be type string',
            required_error: 'company is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      archipel: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      role: z
        .union([
          z.lazy(() => RoleSchema),
          z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.UserUpdateWithoutTicketsInput>;

export const UserUncheckedUpdateWithoutTicketsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutTicketsInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      email: z
        .union([
          z.string().email({ message: 'invalid email address' }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string({
            invalid_type_error: 'name must be type string',
            required_error: 'name is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      lastname: z
        .union([
          z.string({
            invalid_type_error: 'lastname must be type string',
            required_error: 'lastname is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      password: z
        .union([
          z.string({
            invalid_type_error: 'password must be type string',
            required_error: 'password is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      company: z
        .union([
          z.string({
            invalid_type_error: 'company must be type string',
            required_error: 'company is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      archipel: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      role: z
        .union([
          z.lazy(() => RoleSchema),
          z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.UserUncheckedUpdateWithoutTicketsInput>;

export const ActivityUpsertWithoutTicketInputSchema: z.ZodType<Prisma.ActivityUpsertWithoutTicketInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => ActivityUpdateWithoutTicketInputSchema),
        z.lazy(() => ActivityUncheckedUpdateWithoutTicketInputSchema),
      ]),
      create: z.union([
        z.lazy(() => ActivityCreateWithoutTicketInputSchema),
        z.lazy(() => ActivityUncheckedCreateWithoutTicketInputSchema),
      ]),
      where: z.lazy(() => ActivityWhereInputSchema).optional(),
    })
    .strict() as z.ZodType<Prisma.ActivityUpsertWithoutTicketInput>;

export const ActivityUpdateToOneWithWhereWithoutTicketInputSchema: z.ZodType<Prisma.ActivityUpdateToOneWithWhereWithoutTicketInput> =
  z
    .object({
      where: z.lazy(() => ActivityWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => ActivityUpdateWithoutTicketInputSchema),
        z.lazy(() => ActivityUncheckedUpdateWithoutTicketInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.ActivityUpdateToOneWithWhereWithoutTicketInput>;

export const ActivityUpdateWithoutTicketInputSchema: z.ZodType<Prisma.ActivityUpdateWithoutTicketInput> =
  z
    .object({
      title: z
        .union([
          z.string({
            invalid_type_error: 'title must be type string',
            required_error: 'title is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string({
            invalid_type_error: 'description must be type string',
            required_error: 'description is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      roomName: z
        .union([
          z.string({
            invalid_type_error: 'roomName must be type string',
            required_error: 'roomName is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      speaker: z
        .union([
          z.string({
            invalid_type_error: 'speaker must be type string',
            required_error: 'speaker is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      image: z
        .union([
          z.string({
            invalid_type_error: 'image must be type string',
            required_error: 'image is required',
            description: 'schema validation error',
          }),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      start: z
        .union([
          z.coerce.date({
            invalid_type_error: 'start must be type date',
            required_error: 'start is required',
            description: 'schema validation error',
          }),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      end: z
        .union([
          z.coerce.date({
            invalid_type_error: 'end must be type date',
            required_error: 'end is required',
            description: 'schema validation error',
          }),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ticketMax: z
        .union([
          z.number({
            invalid_type_error: 'ticketMax must be type number',
            required_error: 'ticketMax is required',
            description: 'schema validation error',
          }),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ticketBuy: z
        .union([
          z
            .number({
              invalid_type_error: 'ticketBuy must be type number',
              required_error: 'ticketBuy is required',
              description: 'schema validation error',
            })
            .nonnegative({ message: 'ticketMin must be >= 0' }),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      replay: z
        .union([
          z.string().url({ message: 'invalid url' }),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      typeRoom: z
        .union([
          z.lazy(() => TypeRoomSchema),
          z.lazy(() => EnumTypeRoomFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      event: z
        .lazy(() => EventUpdateOneRequiredWithoutActivityNestedInputSchema)
        .optional(),
      category: z
        .lazy(() => TagUpdateManyWithoutActivityNestedInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.ActivityUpdateWithoutTicketInput>;

export const ActivityUncheckedUpdateWithoutTicketInputSchema: z.ZodType<Prisma.ActivityUncheckedUpdateWithoutTicketInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      title: z
        .union([
          z.string({
            invalid_type_error: 'title must be type string',
            required_error: 'title is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string({
            invalid_type_error: 'description must be type string',
            required_error: 'description is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      roomName: z
        .union([
          z.string({
            invalid_type_error: 'roomName must be type string',
            required_error: 'roomName is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      speaker: z
        .union([
          z.string({
            invalid_type_error: 'speaker must be type string',
            required_error: 'speaker is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      image: z
        .union([
          z.string({
            invalid_type_error: 'image must be type string',
            required_error: 'image is required',
            description: 'schema validation error',
          }),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      start: z
        .union([
          z.coerce.date({
            invalid_type_error: 'start must be type date',
            required_error: 'start is required',
            description: 'schema validation error',
          }),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      end: z
        .union([
          z.coerce.date({
            invalid_type_error: 'end must be type date',
            required_error: 'end is required',
            description: 'schema validation error',
          }),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ticketMax: z
        .union([
          z.number({
            invalid_type_error: 'ticketMax must be type number',
            required_error: 'ticketMax is required',
            description: 'schema validation error',
          }),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ticketBuy: z
        .union([
          z
            .number({
              invalid_type_error: 'ticketBuy must be type number',
              required_error: 'ticketBuy is required',
              description: 'schema validation error',
            })
            .nonnegative({ message: 'ticketMin must be >= 0' }),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      replay: z
        .union([
          z.string().url({ message: 'invalid url' }),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      typeRoom: z
        .union([
          z.lazy(() => TypeRoomSchema),
          z.lazy(() => EnumTypeRoomFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      eventId: z
        .union([
          z
            .number({
              invalid_type_error: 'eventId must be type number',
              required_error: 'eventId is required',
              description: 'schema validation error',
            })
            .nonnegative({ message: 'eventId must be > 0' }),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      category: z
        .lazy(() => TagUncheckedUpdateManyWithoutActivityNestedInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.ActivityUncheckedUpdateWithoutTicketInput>;

export const ActivityCreateWithoutCategoryInputSchema: z.ZodType<Prisma.ActivityCreateWithoutCategoryInput> =
  z
    .object({
      title: z.string({
        invalid_type_error: 'title must be type string',
        required_error: 'title is required',
        description: 'schema validation error',
      }),
      description: z.string({
        invalid_type_error: 'description must be type string',
        required_error: 'description is required',
        description: 'schema validation error',
      }),
      roomName: z.string({
        invalid_type_error: 'roomName must be type string',
        required_error: 'roomName is required',
        description: 'schema validation error',
      }),
      speaker: z.string({
        invalid_type_error: 'speaker must be type string',
        required_error: 'speaker is required',
        description: 'schema validation error',
      }),
      image: z
        .string({
          invalid_type_error: 'image must be type string',
          required_error: 'image is required',
          description: 'schema validation error',
        })
        .optional()
        .nullable(),
      start: z.coerce.date({
        invalid_type_error: 'start must be type date',
        required_error: 'start is required',
        description: 'schema validation error',
      }),
      end: z.coerce.date({
        invalid_type_error: 'end must be type date',
        required_error: 'end is required',
        description: 'schema validation error',
      }),
      ticketMax: z.number({
        invalid_type_error: 'ticketMax must be type number',
        required_error: 'ticketMax is required',
        description: 'schema validation error',
      }),
      ticketBuy: z
        .number({
          invalid_type_error: 'ticketBuy must be type number',
          required_error: 'ticketBuy is required',
          description: 'schema validation error',
        })
        .nonnegative({ message: 'ticketMin must be >= 0' })
        .optional(),
      replay: z.string().url({ message: 'invalid url' }).optional().nullable(),
      typeRoom: z.lazy(() => TypeRoomSchema).optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      event: z.lazy(() => EventCreateNestedOneWithoutActivityInputSchema),
      ticket: z
        .lazy(() => TicketCreateNestedManyWithoutActivityInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.ActivityCreateWithoutCategoryInput>;

export const ActivityUncheckedCreateWithoutCategoryInputSchema: z.ZodType<Prisma.ActivityUncheckedCreateWithoutCategoryInput> =
  z
    .object({
      id: z.number().int().optional(),
      title: z.string({
        invalid_type_error: 'title must be type string',
        required_error: 'title is required',
        description: 'schema validation error',
      }),
      description: z.string({
        invalid_type_error: 'description must be type string',
        required_error: 'description is required',
        description: 'schema validation error',
      }),
      roomName: z.string({
        invalid_type_error: 'roomName must be type string',
        required_error: 'roomName is required',
        description: 'schema validation error',
      }),
      speaker: z.string({
        invalid_type_error: 'speaker must be type string',
        required_error: 'speaker is required',
        description: 'schema validation error',
      }),
      image: z
        .string({
          invalid_type_error: 'image must be type string',
          required_error: 'image is required',
          description: 'schema validation error',
        })
        .optional()
        .nullable(),
      start: z.coerce.date({
        invalid_type_error: 'start must be type date',
        required_error: 'start is required',
        description: 'schema validation error',
      }),
      end: z.coerce.date({
        invalid_type_error: 'end must be type date',
        required_error: 'end is required',
        description: 'schema validation error',
      }),
      ticketMax: z.number({
        invalid_type_error: 'ticketMax must be type number',
        required_error: 'ticketMax is required',
        description: 'schema validation error',
      }),
      ticketBuy: z
        .number({
          invalid_type_error: 'ticketBuy must be type number',
          required_error: 'ticketBuy is required',
          description: 'schema validation error',
        })
        .nonnegative({ message: 'ticketMin must be >= 0' })
        .optional(),
      replay: z.string().url({ message: 'invalid url' }).optional().nullable(),
      typeRoom: z.lazy(() => TypeRoomSchema).optional(),
      eventId: z
        .number({
          invalid_type_error: 'eventId must be type number',
          required_error: 'eventId is required',
          description: 'schema validation error',
        })
        .nonnegative({ message: 'eventId must be > 0' }),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      ticket: z
        .lazy(() => TicketUncheckedCreateNestedManyWithoutActivityInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.ActivityUncheckedCreateWithoutCategoryInput>;

export const ActivityCreateOrConnectWithoutCategoryInputSchema: z.ZodType<Prisma.ActivityCreateOrConnectWithoutCategoryInput> =
  z
    .object({
      where: z.lazy(() => ActivityWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => ActivityCreateWithoutCategoryInputSchema),
        z.lazy(() => ActivityUncheckedCreateWithoutCategoryInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.ActivityCreateOrConnectWithoutCategoryInput>;

export const ActivityUpsertWithWhereUniqueWithoutCategoryInputSchema: z.ZodType<Prisma.ActivityUpsertWithWhereUniqueWithoutCategoryInput> =
  z
    .object({
      where: z.lazy(() => ActivityWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => ActivityUpdateWithoutCategoryInputSchema),
        z.lazy(() => ActivityUncheckedUpdateWithoutCategoryInputSchema),
      ]),
      create: z.union([
        z.lazy(() => ActivityCreateWithoutCategoryInputSchema),
        z.lazy(() => ActivityUncheckedCreateWithoutCategoryInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.ActivityUpsertWithWhereUniqueWithoutCategoryInput>;

export const ActivityUpdateWithWhereUniqueWithoutCategoryInputSchema: z.ZodType<Prisma.ActivityUpdateWithWhereUniqueWithoutCategoryInput> =
  z
    .object({
      where: z.lazy(() => ActivityWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => ActivityUpdateWithoutCategoryInputSchema),
        z.lazy(() => ActivityUncheckedUpdateWithoutCategoryInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.ActivityUpdateWithWhereUniqueWithoutCategoryInput>;

export const ActivityUpdateManyWithWhereWithoutCategoryInputSchema: z.ZodType<Prisma.ActivityUpdateManyWithWhereWithoutCategoryInput> =
  z
    .object({
      where: z.lazy(() => ActivityScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => ActivityUpdateManyMutationInputSchema),
        z.lazy(() => ActivityUncheckedUpdateManyWithoutCategoryInputSchema),
      ]),
    })
    .strict() as z.ZodType<Prisma.ActivityUpdateManyWithWhereWithoutCategoryInput>;

export const TicketCreateManyOwnerInputSchema: z.ZodType<Prisma.TicketCreateManyOwnerInput> =
  z
    .object({
      id: z.number().int().optional(),
      online: z.boolean(),
      used: z.boolean().optional(),
      activityId: z
        .number({
          invalid_type_error: 'activityId must be type number',
          required_error: 'activityId is required',
          description: 'schema validation error',
        })
        .nonnegative({ message: 'activityId must be > 0' }),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict() as z.ZodType<Prisma.TicketCreateManyOwnerInput>;

export const TicketUpdateWithoutOwnerInputSchema: z.ZodType<Prisma.TicketUpdateWithoutOwnerInput> =
  z
    .object({
      online: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      used: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      activity: z
        .lazy(() => ActivityUpdateOneRequiredWithoutTicketNestedInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.TicketUpdateWithoutOwnerInput>;

export const TicketUncheckedUpdateWithoutOwnerInputSchema: z.ZodType<Prisma.TicketUncheckedUpdateWithoutOwnerInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      online: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      used: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      activityId: z
        .union([
          z
            .number({
              invalid_type_error: 'activityId must be type number',
              required_error: 'activityId is required',
              description: 'schema validation error',
            })
            .nonnegative({ message: 'activityId must be > 0' }),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.TicketUncheckedUpdateWithoutOwnerInput>;

export const TicketUncheckedUpdateManyWithoutOwnerInputSchema: z.ZodType<Prisma.TicketUncheckedUpdateManyWithoutOwnerInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      online: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      used: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      activityId: z
        .union([
          z
            .number({
              invalid_type_error: 'activityId must be type number',
              required_error: 'activityId is required',
              description: 'schema validation error',
            })
            .nonnegative({ message: 'activityId must be > 0' }),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.TicketUncheckedUpdateManyWithoutOwnerInput>;

export const ActivityCreateManyEventInputSchema: z.ZodType<Prisma.ActivityCreateManyEventInput> =
  z
    .object({
      id: z.number().int().optional(),
      title: z.string({
        invalid_type_error: 'title must be type string',
        required_error: 'title is required',
        description: 'schema validation error',
      }),
      description: z.string({
        invalid_type_error: 'description must be type string',
        required_error: 'description is required',
        description: 'schema validation error',
      }),
      roomName: z.string({
        invalid_type_error: 'roomName must be type string',
        required_error: 'roomName is required',
        description: 'schema validation error',
      }),
      speaker: z.string({
        invalid_type_error: 'speaker must be type string',
        required_error: 'speaker is required',
        description: 'schema validation error',
      }),
      image: z
        .string({
          invalid_type_error: 'image must be type string',
          required_error: 'image is required',
          description: 'schema validation error',
        })
        .optional()
        .nullable(),
      start: z.coerce.date({
        invalid_type_error: 'start must be type date',
        required_error: 'start is required',
        description: 'schema validation error',
      }),
      end: z.coerce.date({
        invalid_type_error: 'end must be type date',
        required_error: 'end is required',
        description: 'schema validation error',
      }),
      ticketMax: z.number({
        invalid_type_error: 'ticketMax must be type number',
        required_error: 'ticketMax is required',
        description: 'schema validation error',
      }),
      ticketBuy: z
        .number({
          invalid_type_error: 'ticketBuy must be type number',
          required_error: 'ticketBuy is required',
          description: 'schema validation error',
        })
        .nonnegative({ message: 'ticketMin must be >= 0' })
        .optional(),
      replay: z.string().url({ message: 'invalid url' }).optional().nullable(),
      typeRoom: z.lazy(() => TypeRoomSchema).optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict() as z.ZodType<Prisma.ActivityCreateManyEventInput>;

export const ActivityUpdateWithoutEventInputSchema: z.ZodType<Prisma.ActivityUpdateWithoutEventInput> =
  z
    .object({
      title: z
        .union([
          z.string({
            invalid_type_error: 'title must be type string',
            required_error: 'title is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string({
            invalid_type_error: 'description must be type string',
            required_error: 'description is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      roomName: z
        .union([
          z.string({
            invalid_type_error: 'roomName must be type string',
            required_error: 'roomName is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      speaker: z
        .union([
          z.string({
            invalid_type_error: 'speaker must be type string',
            required_error: 'speaker is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      image: z
        .union([
          z.string({
            invalid_type_error: 'image must be type string',
            required_error: 'image is required',
            description: 'schema validation error',
          }),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      start: z
        .union([
          z.coerce.date({
            invalid_type_error: 'start must be type date',
            required_error: 'start is required',
            description: 'schema validation error',
          }),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      end: z
        .union([
          z.coerce.date({
            invalid_type_error: 'end must be type date',
            required_error: 'end is required',
            description: 'schema validation error',
          }),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ticketMax: z
        .union([
          z.number({
            invalid_type_error: 'ticketMax must be type number',
            required_error: 'ticketMax is required',
            description: 'schema validation error',
          }),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ticketBuy: z
        .union([
          z
            .number({
              invalid_type_error: 'ticketBuy must be type number',
              required_error: 'ticketBuy is required',
              description: 'schema validation error',
            })
            .nonnegative({ message: 'ticketMin must be >= 0' }),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      replay: z
        .union([
          z.string().url({ message: 'invalid url' }),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      typeRoom: z
        .union([
          z.lazy(() => TypeRoomSchema),
          z.lazy(() => EnumTypeRoomFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ticket: z
        .lazy(() => TicketUpdateManyWithoutActivityNestedInputSchema)
        .optional(),
      category: z
        .lazy(() => TagUpdateManyWithoutActivityNestedInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.ActivityUpdateWithoutEventInput>;

export const ActivityUncheckedUpdateWithoutEventInputSchema: z.ZodType<Prisma.ActivityUncheckedUpdateWithoutEventInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      title: z
        .union([
          z.string({
            invalid_type_error: 'title must be type string',
            required_error: 'title is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string({
            invalid_type_error: 'description must be type string',
            required_error: 'description is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      roomName: z
        .union([
          z.string({
            invalid_type_error: 'roomName must be type string',
            required_error: 'roomName is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      speaker: z
        .union([
          z.string({
            invalid_type_error: 'speaker must be type string',
            required_error: 'speaker is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      image: z
        .union([
          z.string({
            invalid_type_error: 'image must be type string',
            required_error: 'image is required',
            description: 'schema validation error',
          }),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      start: z
        .union([
          z.coerce.date({
            invalid_type_error: 'start must be type date',
            required_error: 'start is required',
            description: 'schema validation error',
          }),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      end: z
        .union([
          z.coerce.date({
            invalid_type_error: 'end must be type date',
            required_error: 'end is required',
            description: 'schema validation error',
          }),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ticketMax: z
        .union([
          z.number({
            invalid_type_error: 'ticketMax must be type number',
            required_error: 'ticketMax is required',
            description: 'schema validation error',
          }),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ticketBuy: z
        .union([
          z
            .number({
              invalid_type_error: 'ticketBuy must be type number',
              required_error: 'ticketBuy is required',
              description: 'schema validation error',
            })
            .nonnegative({ message: 'ticketMin must be >= 0' }),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      replay: z
        .union([
          z.string().url({ message: 'invalid url' }),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      typeRoom: z
        .union([
          z.lazy(() => TypeRoomSchema),
          z.lazy(() => EnumTypeRoomFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ticket: z
        .lazy(() => TicketUncheckedUpdateManyWithoutActivityNestedInputSchema)
        .optional(),
      category: z
        .lazy(() => TagUncheckedUpdateManyWithoutActivityNestedInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.ActivityUncheckedUpdateWithoutEventInput>;

export const ActivityUncheckedUpdateManyWithoutEventInputSchema: z.ZodType<Prisma.ActivityUncheckedUpdateManyWithoutEventInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      title: z
        .union([
          z.string({
            invalid_type_error: 'title must be type string',
            required_error: 'title is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string({
            invalid_type_error: 'description must be type string',
            required_error: 'description is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      roomName: z
        .union([
          z.string({
            invalid_type_error: 'roomName must be type string',
            required_error: 'roomName is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      speaker: z
        .union([
          z.string({
            invalid_type_error: 'speaker must be type string',
            required_error: 'speaker is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      image: z
        .union([
          z.string({
            invalid_type_error: 'image must be type string',
            required_error: 'image is required',
            description: 'schema validation error',
          }),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      start: z
        .union([
          z.coerce.date({
            invalid_type_error: 'start must be type date',
            required_error: 'start is required',
            description: 'schema validation error',
          }),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      end: z
        .union([
          z.coerce.date({
            invalid_type_error: 'end must be type date',
            required_error: 'end is required',
            description: 'schema validation error',
          }),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ticketMax: z
        .union([
          z.number({
            invalid_type_error: 'ticketMax must be type number',
            required_error: 'ticketMax is required',
            description: 'schema validation error',
          }),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ticketBuy: z
        .union([
          z
            .number({
              invalid_type_error: 'ticketBuy must be type number',
              required_error: 'ticketBuy is required',
              description: 'schema validation error',
            })
            .nonnegative({ message: 'ticketMin must be >= 0' }),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      replay: z
        .union([
          z.string().url({ message: 'invalid url' }),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      typeRoom: z
        .union([
          z.lazy(() => TypeRoomSchema),
          z.lazy(() => EnumTypeRoomFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.ActivityUncheckedUpdateManyWithoutEventInput>;

export const TicketCreateManyActivityInputSchema: z.ZodType<Prisma.TicketCreateManyActivityInput> =
  z
    .object({
      id: z.number().int().optional(),
      online: z.boolean(),
      used: z.boolean().optional(),
      ownerId: z
        .number({
          invalid_type_error: 'ownerId must be type number',
          required_error: 'ownerId is required',
          description: 'schema validation error',
        })
        .nonnegative({ message: 'ownerId must be > 0' }),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict() as z.ZodType<Prisma.TicketCreateManyActivityInput>;

export const TicketUpdateWithoutActivityInputSchema: z.ZodType<Prisma.TicketUpdateWithoutActivityInput> =
  z
    .object({
      online: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      used: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      owner: z
        .lazy(() => UserUpdateOneRequiredWithoutTicketsNestedInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.TicketUpdateWithoutActivityInput>;

export const TicketUncheckedUpdateWithoutActivityInputSchema: z.ZodType<Prisma.TicketUncheckedUpdateWithoutActivityInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      online: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      used: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ownerId: z
        .union([
          z
            .number({
              invalid_type_error: 'ownerId must be type number',
              required_error: 'ownerId is required',
              description: 'schema validation error',
            })
            .nonnegative({ message: 'ownerId must be > 0' }),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.TicketUncheckedUpdateWithoutActivityInput>;

export const TicketUncheckedUpdateManyWithoutActivityInputSchema: z.ZodType<Prisma.TicketUncheckedUpdateManyWithoutActivityInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      online: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      used: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ownerId: z
        .union([
          z
            .number({
              invalid_type_error: 'ownerId must be type number',
              required_error: 'ownerId is required',
              description: 'schema validation error',
            })
            .nonnegative({ message: 'ownerId must be > 0' }),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.TicketUncheckedUpdateManyWithoutActivityInput>;

export const TagUpdateWithoutActivityInputSchema: z.ZodType<Prisma.TagUpdateWithoutActivityInput> =
  z
    .object({
      name: z
        .union([
          z
            .string({
              invalid_type_error: 'name must be type string',
              required_error: 'name is required',
              description: 'schema validation error',
            })
            .min(3, { message: 'Must be 3 or more characters long' }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.TagUpdateWithoutActivityInput>;

export const TagUncheckedUpdateWithoutActivityInputSchema: z.ZodType<Prisma.TagUncheckedUpdateWithoutActivityInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z
            .string({
              invalid_type_error: 'name must be type string',
              required_error: 'name is required',
              description: 'schema validation error',
            })
            .min(3, { message: 'Must be 3 or more characters long' }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.TagUncheckedUpdateWithoutActivityInput>;

export const TagUncheckedUpdateManyWithoutActivityInputSchema: z.ZodType<Prisma.TagUncheckedUpdateManyWithoutActivityInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z
            .string({
              invalid_type_error: 'name must be type string',
              required_error: 'name is required',
              description: 'schema validation error',
            })
            .min(3, { message: 'Must be 3 or more characters long' }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.TagUncheckedUpdateManyWithoutActivityInput>;

export const ActivityUpdateWithoutCategoryInputSchema: z.ZodType<Prisma.ActivityUpdateWithoutCategoryInput> =
  z
    .object({
      title: z
        .union([
          z.string({
            invalid_type_error: 'title must be type string',
            required_error: 'title is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string({
            invalid_type_error: 'description must be type string',
            required_error: 'description is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      roomName: z
        .union([
          z.string({
            invalid_type_error: 'roomName must be type string',
            required_error: 'roomName is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      speaker: z
        .union([
          z.string({
            invalid_type_error: 'speaker must be type string',
            required_error: 'speaker is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      image: z
        .union([
          z.string({
            invalid_type_error: 'image must be type string',
            required_error: 'image is required',
            description: 'schema validation error',
          }),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      start: z
        .union([
          z.coerce.date({
            invalid_type_error: 'start must be type date',
            required_error: 'start is required',
            description: 'schema validation error',
          }),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      end: z
        .union([
          z.coerce.date({
            invalid_type_error: 'end must be type date',
            required_error: 'end is required',
            description: 'schema validation error',
          }),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ticketMax: z
        .union([
          z.number({
            invalid_type_error: 'ticketMax must be type number',
            required_error: 'ticketMax is required',
            description: 'schema validation error',
          }),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ticketBuy: z
        .union([
          z
            .number({
              invalid_type_error: 'ticketBuy must be type number',
              required_error: 'ticketBuy is required',
              description: 'schema validation error',
            })
            .nonnegative({ message: 'ticketMin must be >= 0' }),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      replay: z
        .union([
          z.string().url({ message: 'invalid url' }),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      typeRoom: z
        .union([
          z.lazy(() => TypeRoomSchema),
          z.lazy(() => EnumTypeRoomFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      event: z
        .lazy(() => EventUpdateOneRequiredWithoutActivityNestedInputSchema)
        .optional(),
      ticket: z
        .lazy(() => TicketUpdateManyWithoutActivityNestedInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.ActivityUpdateWithoutCategoryInput>;

export const ActivityUncheckedUpdateWithoutCategoryInputSchema: z.ZodType<Prisma.ActivityUncheckedUpdateWithoutCategoryInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      title: z
        .union([
          z.string({
            invalid_type_error: 'title must be type string',
            required_error: 'title is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string({
            invalid_type_error: 'description must be type string',
            required_error: 'description is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      roomName: z
        .union([
          z.string({
            invalid_type_error: 'roomName must be type string',
            required_error: 'roomName is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      speaker: z
        .union([
          z.string({
            invalid_type_error: 'speaker must be type string',
            required_error: 'speaker is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      image: z
        .union([
          z.string({
            invalid_type_error: 'image must be type string',
            required_error: 'image is required',
            description: 'schema validation error',
          }),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      start: z
        .union([
          z.coerce.date({
            invalid_type_error: 'start must be type date',
            required_error: 'start is required',
            description: 'schema validation error',
          }),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      end: z
        .union([
          z.coerce.date({
            invalid_type_error: 'end must be type date',
            required_error: 'end is required',
            description: 'schema validation error',
          }),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ticketMax: z
        .union([
          z.number({
            invalid_type_error: 'ticketMax must be type number',
            required_error: 'ticketMax is required',
            description: 'schema validation error',
          }),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ticketBuy: z
        .union([
          z
            .number({
              invalid_type_error: 'ticketBuy must be type number',
              required_error: 'ticketBuy is required',
              description: 'schema validation error',
            })
            .nonnegative({ message: 'ticketMin must be >= 0' }),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      replay: z
        .union([
          z.string().url({ message: 'invalid url' }),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      typeRoom: z
        .union([
          z.lazy(() => TypeRoomSchema),
          z.lazy(() => EnumTypeRoomFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      eventId: z
        .union([
          z
            .number({
              invalid_type_error: 'eventId must be type number',
              required_error: 'eventId is required',
              description: 'schema validation error',
            })
            .nonnegative({ message: 'eventId must be > 0' }),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ticket: z
        .lazy(() => TicketUncheckedUpdateManyWithoutActivityNestedInputSchema)
        .optional(),
    })
    .strict() as z.ZodType<Prisma.ActivityUncheckedUpdateWithoutCategoryInput>;

export const ActivityUncheckedUpdateManyWithoutCategoryInputSchema: z.ZodType<Prisma.ActivityUncheckedUpdateManyWithoutCategoryInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      title: z
        .union([
          z.string({
            invalid_type_error: 'title must be type string',
            required_error: 'title is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      description: z
        .union([
          z.string({
            invalid_type_error: 'description must be type string',
            required_error: 'description is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      roomName: z
        .union([
          z.string({
            invalid_type_error: 'roomName must be type string',
            required_error: 'roomName is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      speaker: z
        .union([
          z.string({
            invalid_type_error: 'speaker must be type string',
            required_error: 'speaker is required',
            description: 'schema validation error',
          }),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      image: z
        .union([
          z.string({
            invalid_type_error: 'image must be type string',
            required_error: 'image is required',
            description: 'schema validation error',
          }),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      start: z
        .union([
          z.coerce.date({
            invalid_type_error: 'start must be type date',
            required_error: 'start is required',
            description: 'schema validation error',
          }),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      end: z
        .union([
          z.coerce.date({
            invalid_type_error: 'end must be type date',
            required_error: 'end is required',
            description: 'schema validation error',
          }),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ticketMax: z
        .union([
          z.number({
            invalid_type_error: 'ticketMax must be type number',
            required_error: 'ticketMax is required',
            description: 'schema validation error',
          }),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      ticketBuy: z
        .union([
          z
            .number({
              invalid_type_error: 'ticketBuy must be type number',
              required_error: 'ticketBuy is required',
              description: 'schema validation error',
            })
            .nonnegative({ message: 'ticketMin must be >= 0' }),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      replay: z
        .union([
          z.string().url({ message: 'invalid url' }),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      typeRoom: z
        .union([
          z.lazy(() => TypeRoomSchema),
          z.lazy(() => EnumTypeRoomFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      eventId: z
        .union([
          z
            .number({
              invalid_type_error: 'eventId must be type number',
              required_error: 'eventId is required',
              description: 'schema validation error',
            })
            .nonnegative({ message: 'eventId must be > 0' }),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.ActivityUncheckedUpdateManyWithoutCategoryInput>;

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereInputSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithRelationInputSchema.array(),
        UserOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: UserWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict() as z.ZodType<Prisma.UserFindFirstArgs>;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> =
  z
    .object({
      select: UserSelectSchema.optional(),
      include: UserIncludeSchema.optional(),
      where: UserWhereInputSchema.optional(),
      orderBy: z
        .union([
          UserOrderByWithRelationInputSchema.array(),
          UserOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: UserWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.UserFindFirstOrThrowArgs>;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereInputSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithRelationInputSchema.array(),
        UserOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: UserWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict() as z.ZodType<Prisma.UserFindManyArgs>;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z
  .object({
    where: UserWhereInputSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithRelationInputSchema.array(),
        UserOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: UserWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict() as z.ZodType<Prisma.UserAggregateArgs>;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z
  .object({
    where: UserWhereInputSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithAggregationInputSchema.array(),
        UserOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: UserScalarFieldEnumSchema.array(),
    having: UserScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict() as z.ZodType<Prisma.UserGroupByArgs>;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereUniqueInputSchema,
  })
  .strict() as z.ZodType<Prisma.UserFindUniqueArgs>;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> =
  z
    .object({
      select: UserSelectSchema.optional(),
      include: UserIncludeSchema.optional(),
      where: UserWhereUniqueInputSchema,
    })
    .strict() as z.ZodType<Prisma.UserFindUniqueOrThrowArgs>;

export const EventFindFirstArgsSchema: z.ZodType<Prisma.EventFindFirstArgs> = z
  .object({
    select: EventSelectSchema.optional(),
    include: EventIncludeSchema.optional(),
    where: EventWhereInputSchema.optional(),
    orderBy: z
      .union([
        EventOrderByWithRelationInputSchema.array(),
        EventOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: EventWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([EventScalarFieldEnumSchema, EventScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict() as z.ZodType<Prisma.EventFindFirstArgs>;

export const EventFindFirstOrThrowArgsSchema: z.ZodType<Prisma.EventFindFirstOrThrowArgs> =
  z
    .object({
      select: EventSelectSchema.optional(),
      include: EventIncludeSchema.optional(),
      where: EventWhereInputSchema.optional(),
      orderBy: z
        .union([
          EventOrderByWithRelationInputSchema.array(),
          EventOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: EventWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([EventScalarFieldEnumSchema, EventScalarFieldEnumSchema.array()])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.EventFindFirstOrThrowArgs>;

export const EventFindManyArgsSchema: z.ZodType<Prisma.EventFindManyArgs> = z
  .object({
    select: EventSelectSchema.optional(),
    include: EventIncludeSchema.optional(),
    where: EventWhereInputSchema.optional(),
    orderBy: z
      .union([
        EventOrderByWithRelationInputSchema.array(),
        EventOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: EventWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([EventScalarFieldEnumSchema, EventScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict() as z.ZodType<Prisma.EventFindManyArgs>;

export const EventAggregateArgsSchema: z.ZodType<Prisma.EventAggregateArgs> = z
  .object({
    where: EventWhereInputSchema.optional(),
    orderBy: z
      .union([
        EventOrderByWithRelationInputSchema.array(),
        EventOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: EventWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict() as z.ZodType<Prisma.EventAggregateArgs>;

export const EventGroupByArgsSchema: z.ZodType<Prisma.EventGroupByArgs> = z
  .object({
    where: EventWhereInputSchema.optional(),
    orderBy: z
      .union([
        EventOrderByWithAggregationInputSchema.array(),
        EventOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: EventScalarFieldEnumSchema.array(),
    having: EventScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict() as z.ZodType<Prisma.EventGroupByArgs>;

export const EventFindUniqueArgsSchema: z.ZodType<Prisma.EventFindUniqueArgs> =
  z
    .object({
      select: EventSelectSchema.optional(),
      include: EventIncludeSchema.optional(),
      where: EventWhereUniqueInputSchema,
    })
    .strict() as z.ZodType<Prisma.EventFindUniqueArgs>;

export const EventFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.EventFindUniqueOrThrowArgs> =
  z
    .object({
      select: EventSelectSchema.optional(),
      include: EventIncludeSchema.optional(),
      where: EventWhereUniqueInputSchema,
    })
    .strict() as z.ZodType<Prisma.EventFindUniqueOrThrowArgs>;

export const ActivityFindFirstArgsSchema: z.ZodType<Prisma.ActivityFindFirstArgs> =
  z
    .object({
      select: ActivitySelectSchema.optional(),
      include: ActivityIncludeSchema.optional(),
      where: ActivityWhereInputSchema.optional(),
      orderBy: z
        .union([
          ActivityOrderByWithRelationInputSchema.array(),
          ActivityOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ActivityWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          ActivityScalarFieldEnumSchema,
          ActivityScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.ActivityFindFirstArgs>;

export const ActivityFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ActivityFindFirstOrThrowArgs> =
  z
    .object({
      select: ActivitySelectSchema.optional(),
      include: ActivityIncludeSchema.optional(),
      where: ActivityWhereInputSchema.optional(),
      orderBy: z
        .union([
          ActivityOrderByWithRelationInputSchema.array(),
          ActivityOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ActivityWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          ActivityScalarFieldEnumSchema,
          ActivityScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.ActivityFindFirstOrThrowArgs>;

export const ActivityFindManyArgsSchema: z.ZodType<Prisma.ActivityFindManyArgs> =
  z
    .object({
      select: ActivitySelectSchema.optional(),
      include: ActivityIncludeSchema.optional(),
      where: ActivityWhereInputSchema.optional(),
      orderBy: z
        .union([
          ActivityOrderByWithRelationInputSchema.array(),
          ActivityOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ActivityWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          ActivityScalarFieldEnumSchema,
          ActivityScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.ActivityFindManyArgs>;

export const ActivityAggregateArgsSchema: z.ZodType<Prisma.ActivityAggregateArgs> =
  z
    .object({
      where: ActivityWhereInputSchema.optional(),
      orderBy: z
        .union([
          ActivityOrderByWithRelationInputSchema.array(),
          ActivityOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ActivityWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict() as z.ZodType<Prisma.ActivityAggregateArgs>;

export const ActivityGroupByArgsSchema: z.ZodType<Prisma.ActivityGroupByArgs> =
  z
    .object({
      where: ActivityWhereInputSchema.optional(),
      orderBy: z
        .union([
          ActivityOrderByWithAggregationInputSchema.array(),
          ActivityOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: ActivityScalarFieldEnumSchema.array(),
      having: ActivityScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict() as z.ZodType<Prisma.ActivityGroupByArgs>;

export const ActivityFindUniqueArgsSchema: z.ZodType<Prisma.ActivityFindUniqueArgs> =
  z
    .object({
      select: ActivitySelectSchema.optional(),
      include: ActivityIncludeSchema.optional(),
      where: ActivityWhereUniqueInputSchema,
    })
    .strict() as z.ZodType<Prisma.ActivityFindUniqueArgs>;

export const ActivityFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ActivityFindUniqueOrThrowArgs> =
  z
    .object({
      select: ActivitySelectSchema.optional(),
      include: ActivityIncludeSchema.optional(),
      where: ActivityWhereUniqueInputSchema,
    })
    .strict() as z.ZodType<Prisma.ActivityFindUniqueOrThrowArgs>;

export const TicketFindFirstArgsSchema: z.ZodType<Prisma.TicketFindFirstArgs> =
  z
    .object({
      select: TicketSelectSchema.optional(),
      include: TicketIncludeSchema.optional(),
      where: TicketWhereInputSchema.optional(),
      orderBy: z
        .union([
          TicketOrderByWithRelationInputSchema.array(),
          TicketOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: TicketWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          TicketScalarFieldEnumSchema,
          TicketScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.TicketFindFirstArgs>;

export const TicketFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TicketFindFirstOrThrowArgs> =
  z
    .object({
      select: TicketSelectSchema.optional(),
      include: TicketIncludeSchema.optional(),
      where: TicketWhereInputSchema.optional(),
      orderBy: z
        .union([
          TicketOrderByWithRelationInputSchema.array(),
          TicketOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: TicketWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          TicketScalarFieldEnumSchema,
          TicketScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.TicketFindFirstOrThrowArgs>;

export const TicketFindManyArgsSchema: z.ZodType<Prisma.TicketFindManyArgs> = z
  .object({
    select: TicketSelectSchema.optional(),
    include: TicketIncludeSchema.optional(),
    where: TicketWhereInputSchema.optional(),
    orderBy: z
      .union([
        TicketOrderByWithRelationInputSchema.array(),
        TicketOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: TicketWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([TicketScalarFieldEnumSchema, TicketScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict() as z.ZodType<Prisma.TicketFindManyArgs>;

export const TicketAggregateArgsSchema: z.ZodType<Prisma.TicketAggregateArgs> =
  z
    .object({
      where: TicketWhereInputSchema.optional(),
      orderBy: z
        .union([
          TicketOrderByWithRelationInputSchema.array(),
          TicketOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: TicketWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict() as z.ZodType<Prisma.TicketAggregateArgs>;

export const TicketGroupByArgsSchema: z.ZodType<Prisma.TicketGroupByArgs> = z
  .object({
    where: TicketWhereInputSchema.optional(),
    orderBy: z
      .union([
        TicketOrderByWithAggregationInputSchema.array(),
        TicketOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: TicketScalarFieldEnumSchema.array(),
    having: TicketScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict() as z.ZodType<Prisma.TicketGroupByArgs>;

export const TicketFindUniqueArgsSchema: z.ZodType<Prisma.TicketFindUniqueArgs> =
  z
    .object({
      select: TicketSelectSchema.optional(),
      include: TicketIncludeSchema.optional(),
      where: TicketWhereUniqueInputSchema,
    })
    .strict() as z.ZodType<Prisma.TicketFindUniqueArgs>;

export const TicketFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TicketFindUniqueOrThrowArgs> =
  z
    .object({
      select: TicketSelectSchema.optional(),
      include: TicketIncludeSchema.optional(),
      where: TicketWhereUniqueInputSchema,
    })
    .strict() as z.ZodType<Prisma.TicketFindUniqueOrThrowArgs>;

export const TagFindFirstArgsSchema: z.ZodType<Prisma.TagFindFirstArgs> = z
  .object({
    select: TagSelectSchema.optional(),
    include: TagIncludeSchema.optional(),
    where: TagWhereInputSchema.optional(),
    orderBy: z
      .union([
        TagOrderByWithRelationInputSchema.array(),
        TagOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: TagWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([TagScalarFieldEnumSchema, TagScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict() as z.ZodType<Prisma.TagFindFirstArgs>;

export const TagFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TagFindFirstOrThrowArgs> =
  z
    .object({
      select: TagSelectSchema.optional(),
      include: TagIncludeSchema.optional(),
      where: TagWhereInputSchema.optional(),
      orderBy: z
        .union([
          TagOrderByWithRelationInputSchema.array(),
          TagOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: TagWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([TagScalarFieldEnumSchema, TagScalarFieldEnumSchema.array()])
        .optional(),
    })
    .strict() as z.ZodType<Prisma.TagFindFirstOrThrowArgs>;

export const TagFindManyArgsSchema: z.ZodType<Prisma.TagFindManyArgs> = z
  .object({
    select: TagSelectSchema.optional(),
    include: TagIncludeSchema.optional(),
    where: TagWhereInputSchema.optional(),
    orderBy: z
      .union([
        TagOrderByWithRelationInputSchema.array(),
        TagOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: TagWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([TagScalarFieldEnumSchema, TagScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict() as z.ZodType<Prisma.TagFindManyArgs>;

export const TagAggregateArgsSchema: z.ZodType<Prisma.TagAggregateArgs> = z
  .object({
    where: TagWhereInputSchema.optional(),
    orderBy: z
      .union([
        TagOrderByWithRelationInputSchema.array(),
        TagOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: TagWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict() as z.ZodType<Prisma.TagAggregateArgs>;

export const TagGroupByArgsSchema: z.ZodType<Prisma.TagGroupByArgs> = z
  .object({
    where: TagWhereInputSchema.optional(),
    orderBy: z
      .union([
        TagOrderByWithAggregationInputSchema.array(),
        TagOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: TagScalarFieldEnumSchema.array(),
    having: TagScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict() as z.ZodType<Prisma.TagGroupByArgs>;

export const TagFindUniqueArgsSchema: z.ZodType<Prisma.TagFindUniqueArgs> = z
  .object({
    select: TagSelectSchema.optional(),
    include: TagIncludeSchema.optional(),
    where: TagWhereUniqueInputSchema,
  })
  .strict() as z.ZodType<Prisma.TagFindUniqueArgs>;

export const TagFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TagFindUniqueOrThrowArgs> =
  z
    .object({
      select: TagSelectSchema.optional(),
      include: TagIncludeSchema.optional(),
      where: TagWhereUniqueInputSchema,
    })
    .strict() as z.ZodType<Prisma.TagFindUniqueOrThrowArgs>;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    data: z.union([UserCreateInputSchema, UserUncheckedCreateInputSchema]),
  })
  .strict() as z.ZodType<Prisma.UserCreateArgs>;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereUniqueInputSchema,
    create: z.union([UserCreateInputSchema, UserUncheckedCreateInputSchema]),
    update: z.union([UserUpdateInputSchema, UserUncheckedUpdateInputSchema]),
  })
  .strict() as z.ZodType<Prisma.UserUpsertArgs>;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z
  .object({
    data: z.union([
      UserCreateManyInputSchema,
      UserCreateManyInputSchema.array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict() as z.ZodType<Prisma.UserCreateManyArgs>;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereUniqueInputSchema,
  })
  .strict() as z.ZodType<Prisma.UserDeleteArgs>;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    data: z.union([UserUpdateInputSchema, UserUncheckedUpdateInputSchema]),
    where: UserWhereUniqueInputSchema,
  })
  .strict() as z.ZodType<Prisma.UserUpdateArgs>;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z
  .object({
    data: z.union([
      UserUpdateManyMutationInputSchema,
      UserUncheckedUpdateManyInputSchema,
    ]),
    where: UserWhereInputSchema.optional(),
  })
  .strict() as z.ZodType<Prisma.UserUpdateManyArgs>;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z
  .object({
    where: UserWhereInputSchema.optional(),
  })
  .strict() as z.ZodType<Prisma.UserDeleteManyArgs>;

export const EventCreateArgsSchema: z.ZodType<Prisma.EventCreateArgs> = z
  .object({
    select: EventSelectSchema.optional(),
    include: EventIncludeSchema.optional(),
    data: z.union([EventCreateInputSchema, EventUncheckedCreateInputSchema]),
  })
  .strict() as z.ZodType<Prisma.EventCreateArgs>;

export const EventUpsertArgsSchema: z.ZodType<Prisma.EventUpsertArgs> = z
  .object({
    select: EventSelectSchema.optional(),
    include: EventIncludeSchema.optional(),
    where: EventWhereUniqueInputSchema,
    create: z.union([EventCreateInputSchema, EventUncheckedCreateInputSchema]),
    update: z.union([EventUpdateInputSchema, EventUncheckedUpdateInputSchema]),
  })
  .strict() as z.ZodType<Prisma.EventUpsertArgs>;

export const EventCreateManyArgsSchema: z.ZodType<Prisma.EventCreateManyArgs> =
  z
    .object({
      data: z.union([
        EventCreateManyInputSchema,
        EventCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict() as z.ZodType<Prisma.EventCreateManyArgs>;

export const EventDeleteArgsSchema: z.ZodType<Prisma.EventDeleteArgs> = z
  .object({
    select: EventSelectSchema.optional(),
    include: EventIncludeSchema.optional(),
    where: EventWhereUniqueInputSchema,
  })
  .strict() as z.ZodType<Prisma.EventDeleteArgs>;

export const EventUpdateArgsSchema: z.ZodType<Prisma.EventUpdateArgs> = z
  .object({
    select: EventSelectSchema.optional(),
    include: EventIncludeSchema.optional(),
    data: z.union([EventUpdateInputSchema, EventUncheckedUpdateInputSchema]),
    where: EventWhereUniqueInputSchema,
  })
  .strict() as z.ZodType<Prisma.EventUpdateArgs>;

export const EventUpdateManyArgsSchema: z.ZodType<Prisma.EventUpdateManyArgs> =
  z
    .object({
      data: z.union([
        EventUpdateManyMutationInputSchema,
        EventUncheckedUpdateManyInputSchema,
      ]),
      where: EventWhereInputSchema.optional(),
    })
    .strict() as z.ZodType<Prisma.EventUpdateManyArgs>;

export const EventDeleteManyArgsSchema: z.ZodType<Prisma.EventDeleteManyArgs> =
  z
    .object({
      where: EventWhereInputSchema.optional(),
    })
    .strict() as z.ZodType<Prisma.EventDeleteManyArgs>;

export const ActivityCreateArgsSchema: z.ZodType<Prisma.ActivityCreateArgs> = z
  .object({
    select: ActivitySelectSchema.optional(),
    include: ActivityIncludeSchema.optional(),
    data: z.union([
      ActivityCreateInputSchema,
      ActivityUncheckedCreateInputSchema,
    ]),
  })
  .strict() as z.ZodType<Prisma.ActivityCreateArgs>;

export const ActivityUpsertArgsSchema: z.ZodType<Prisma.ActivityUpsertArgs> = z
  .object({
    select: ActivitySelectSchema.optional(),
    include: ActivityIncludeSchema.optional(),
    where: ActivityWhereUniqueInputSchema,
    create: z.union([
      ActivityCreateInputSchema,
      ActivityUncheckedCreateInputSchema,
    ]),
    update: z.union([
      ActivityUpdateInputSchema,
      ActivityUncheckedUpdateInputSchema,
    ]),
  })
  .strict() as z.ZodType<Prisma.ActivityUpsertArgs>;

export const ActivityCreateManyArgsSchema: z.ZodType<Prisma.ActivityCreateManyArgs> =
  z
    .object({
      data: z.union([
        ActivityCreateManyInputSchema,
        ActivityCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict() as z.ZodType<Prisma.ActivityCreateManyArgs>;

export const ActivityDeleteArgsSchema: z.ZodType<Prisma.ActivityDeleteArgs> = z
  .object({
    select: ActivitySelectSchema.optional(),
    include: ActivityIncludeSchema.optional(),
    where: ActivityWhereUniqueInputSchema,
  })
  .strict() as z.ZodType<Prisma.ActivityDeleteArgs>;

export const ActivityUpdateArgsSchema: z.ZodType<Prisma.ActivityUpdateArgs> = z
  .object({
    select: ActivitySelectSchema.optional(),
    include: ActivityIncludeSchema.optional(),
    data: z.union([
      ActivityUpdateInputSchema,
      ActivityUncheckedUpdateInputSchema,
    ]),
    where: ActivityWhereUniqueInputSchema,
  })
  .strict() as z.ZodType<Prisma.ActivityUpdateArgs>;

export const ActivityUpdateManyArgsSchema: z.ZodType<Prisma.ActivityUpdateManyArgs> =
  z
    .object({
      data: z.union([
        ActivityUpdateManyMutationInputSchema,
        ActivityUncheckedUpdateManyInputSchema,
      ]),
      where: ActivityWhereInputSchema.optional(),
    })
    .strict() as z.ZodType<Prisma.ActivityUpdateManyArgs>;

export const ActivityDeleteManyArgsSchema: z.ZodType<Prisma.ActivityDeleteManyArgs> =
  z
    .object({
      where: ActivityWhereInputSchema.optional(),
    })
    .strict() as z.ZodType<Prisma.ActivityDeleteManyArgs>;

export const TicketCreateArgsSchema: z.ZodType<Prisma.TicketCreateArgs> = z
  .object({
    select: TicketSelectSchema.optional(),
    include: TicketIncludeSchema.optional(),
    data: z.union([TicketCreateInputSchema, TicketUncheckedCreateInputSchema]),
  })
  .strict() as z.ZodType<Prisma.TicketCreateArgs>;

export const TicketUpsertArgsSchema: z.ZodType<Prisma.TicketUpsertArgs> = z
  .object({
    select: TicketSelectSchema.optional(),
    include: TicketIncludeSchema.optional(),
    where: TicketWhereUniqueInputSchema,
    create: z.union([
      TicketCreateInputSchema,
      TicketUncheckedCreateInputSchema,
    ]),
    update: z.union([
      TicketUpdateInputSchema,
      TicketUncheckedUpdateInputSchema,
    ]),
  })
  .strict() as z.ZodType<Prisma.TicketUpsertArgs>;

export const TicketCreateManyArgsSchema: z.ZodType<Prisma.TicketCreateManyArgs> =
  z
    .object({
      data: z.union([
        TicketCreateManyInputSchema,
        TicketCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict() as z.ZodType<Prisma.TicketCreateManyArgs>;

export const TicketDeleteArgsSchema: z.ZodType<Prisma.TicketDeleteArgs> = z
  .object({
    select: TicketSelectSchema.optional(),
    include: TicketIncludeSchema.optional(),
    where: TicketWhereUniqueInputSchema,
  })
  .strict() as z.ZodType<Prisma.TicketDeleteArgs>;

export const TicketUpdateArgsSchema: z.ZodType<Prisma.TicketUpdateArgs> = z
  .object({
    select: TicketSelectSchema.optional(),
    include: TicketIncludeSchema.optional(),
    data: z.union([TicketUpdateInputSchema, TicketUncheckedUpdateInputSchema]),
    where: TicketWhereUniqueInputSchema,
  })
  .strict() as z.ZodType<Prisma.TicketUpdateArgs>;

export const TicketUpdateManyArgsSchema: z.ZodType<Prisma.TicketUpdateManyArgs> =
  z
    .object({
      data: z.union([
        TicketUpdateManyMutationInputSchema,
        TicketUncheckedUpdateManyInputSchema,
      ]),
      where: TicketWhereInputSchema.optional(),
    })
    .strict() as z.ZodType<Prisma.TicketUpdateManyArgs>;

export const TicketDeleteManyArgsSchema: z.ZodType<Prisma.TicketDeleteManyArgs> =
  z
    .object({
      where: TicketWhereInputSchema.optional(),
    })
    .strict() as z.ZodType<Prisma.TicketDeleteManyArgs>;

export const TagCreateArgsSchema: z.ZodType<Prisma.TagCreateArgs> = z
  .object({
    select: TagSelectSchema.optional(),
    include: TagIncludeSchema.optional(),
    data: z.union([TagCreateInputSchema, TagUncheckedCreateInputSchema]),
  })
  .strict() as z.ZodType<Prisma.TagCreateArgs>;

export const TagUpsertArgsSchema: z.ZodType<Prisma.TagUpsertArgs> = z
  .object({
    select: TagSelectSchema.optional(),
    include: TagIncludeSchema.optional(),
    where: TagWhereUniqueInputSchema,
    create: z.union([TagCreateInputSchema, TagUncheckedCreateInputSchema]),
    update: z.union([TagUpdateInputSchema, TagUncheckedUpdateInputSchema]),
  })
  .strict() as z.ZodType<Prisma.TagUpsertArgs>;

export const TagCreateManyArgsSchema: z.ZodType<Prisma.TagCreateManyArgs> = z
  .object({
    data: z.union([TagCreateManyInputSchema, TagCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict() as z.ZodType<Prisma.TagCreateManyArgs>;

export const TagDeleteArgsSchema: z.ZodType<Prisma.TagDeleteArgs> = z
  .object({
    select: TagSelectSchema.optional(),
    include: TagIncludeSchema.optional(),
    where: TagWhereUniqueInputSchema,
  })
  .strict() as z.ZodType<Prisma.TagDeleteArgs>;

export const TagUpdateArgsSchema: z.ZodType<Prisma.TagUpdateArgs> = z
  .object({
    select: TagSelectSchema.optional(),
    include: TagIncludeSchema.optional(),
    data: z.union([TagUpdateInputSchema, TagUncheckedUpdateInputSchema]),
    where: TagWhereUniqueInputSchema,
  })
  .strict() as z.ZodType<Prisma.TagUpdateArgs>;

export const TagUpdateManyArgsSchema: z.ZodType<Prisma.TagUpdateManyArgs> = z
  .object({
    data: z.union([
      TagUpdateManyMutationInputSchema,
      TagUncheckedUpdateManyInputSchema,
    ]),
    where: TagWhereInputSchema.optional(),
  })
  .strict() as z.ZodType<Prisma.TagUpdateManyArgs>;

export const TagDeleteManyArgsSchema: z.ZodType<Prisma.TagDeleteManyArgs> = z
  .object({
    where: TagWhereInputSchema.optional(),
  })
  .strict() as z.ZodType<Prisma.TagDeleteManyArgs>;
