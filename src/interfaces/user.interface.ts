import { number, z } from 'zod';

export const RoleSchema = z.enum(['USER', 'MANAGER', 'ADMIN', 'GUEST']);
export const Signin = z.object({
  email: z
    .string({
      invalid_type_error: 'email must be type string',
      required_error: 'email is required',
      description: 'schema validation error',
    })
    .email(),
  password: z.string({
    invalid_type_error: 'password must be type string',
    required_error: 'password is required',
  }),
});
export const UserGuestCreateArg = z.object({
  email: z.string().email({ message: 'invalid email address' }),
  name: z.string({
    invalid_type_error: 'name must be type string',
  }),
  lastname: z.string({
    invalid_type_error: 'lastname must be type string',
    required_error: 'lastname is required',
  }),
  company: z
    .string({
      invalid_type_error: 'company must be type string',
      required_error: 'company is required',
    })
    .optional(),
  archipel: z.boolean().optional(),
});
export const UserBaseCreateArg = z.object({
  email: z.string().email({ message: 'invalid email address' }),
  name: z.string({
    invalid_type_error: 'name must be type string',
  }),
  lastname: z.string({
    invalid_type_error: 'lastname must be type string',
    required_error: 'lastname is required',
  }),
  password: z.string({
    invalid_type_error: 'password must be type string',
    required_error: 'password is required',
  }),
  company: z.string({
    invalid_type_error: 'company must be type string',
    required_error: 'company is required',
  }),
  archipel: z.boolean(),
  role: RoleSchema,
});
export const UserCreateArg = UserBaseCreateArg.refine(
  data => data.role !== 'ADMIN' && data.role !== 'MANAGER',
  {
    message: 'Validation does not occur if role is ADMIN or MANAGER',
  }
);
export const UserManagerCreateArg = UserBaseCreateArg.refine(
  data => data.role !== 'USER' && data.role !== 'GUEST',
  {
    message: 'Validation does not occur if role is GUEST or USER',
  }
);
export const UserLoginResponse = z.object({
  id: z.number().int(),
  email: z.string().email(),
  name: z.string(),
  role: RoleSchema,
  token: z.string(),
});
export const UserResponse = z.object({
  id: z.number().int(),
  email: z.string().email(),
  name: z.string(),
  lastname: z.string(),
  role: RoleSchema,
  token: z.string().optional(),
  archipel: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
export const UsersResponse = z.array(UserResponse);
export const UserFinOnedArg = z.object({
  id: z.string().transform(Number).optional(),
  email: z.string().email().optional(),
});
export const UserUpdateArg = z.object({
  id: z.number(),
  email: z.string().email({ message: 'invalid email address' }).optional(),
  name: z
    .string({
      invalid_type_error: 'name must be type string',
    })
    .optional(),
  lastname: z
    .string({
      invalid_type_error: 'lastname must be type string',
      required_error: 'lastname is required',
    })
    .optional(),
  password: z
    .string({
      invalid_type_error: 'password must be type string',
      required_error: 'password is required',
    })
    .optional(),
  company: z
    .string({
      invalid_type_error: 'company must be type string',
      required_error: 'company is required',
    })
    .optional(),
  archipel: z.boolean().optional(),
  role: RoleSchema.optional(),
});
export const UserDeleteArg = z.object({ id: z.string().transform(Number) });

export type Signin = z.infer<typeof Signin>;
export type UserCreateArg = z.infer<typeof UserCreateArg>;
export type UserLoginResponse = z.infer<typeof UserLoginResponse>;
export type UserResponse = z.infer<typeof UserResponse>;
export type UsersResponse = z.infer<typeof UserResponse>;
export type UserFinOnedArg = z.infer<typeof UserFinOnedArg>;
export type UserUpdateArg = z.infer<typeof UserUpdateArg>;
export type UserDeleteArg = z.infer<typeof UserDeleteArg>;
export type UserGuestCreateArg = z.infer<typeof UserGuestCreateArg>;
