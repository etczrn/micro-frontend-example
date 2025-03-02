import { Prisma } from '@prisma/client';
import { ServerActionResponse } from '@/app/types/response';
import { ZodError } from 'zod';

export function handleError<T>(error: unknown): ServerActionResponse<T> {
  if (error instanceof ZodError) {
    return {
      success: false,
      message: 'Please fix the errors in the form',
      errors: error.flatten().fieldErrors,
    };
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002': // Unique constraint violation (중복된 값)
        return {
          success: false,
          message: 'A product already exists',
        };
      case 'P2003': // Foreign key constraint failure
        return {
          success: false,
          message: 'Invalid reference. Please check related data.',
        };
      case 'P2000': // 값 길이 초과
        return {
          success: false,
          message: 'Input value is too long.',
        };
    }
  }

  return {
    success: false,
    message: 'Something went wrong',
  };
}
