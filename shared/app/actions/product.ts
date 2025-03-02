'use server';

import type { ProductFormData } from '@/app/types/product';
import { ServerActionResponse } from '@/app/types/response';
import { handleError } from '@/lib/error-handler';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const productSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  // price: z.number().min(1, { message: 'Price is required' }),
  price: z.preprocess(
    (val) => (typeof val === 'string' ? Number(val) : val),
    z.number().min(1, { message: 'Price must be greater than 0' })
  ),
});

export async function createProduct(
  prev: ServerActionResponse<ProductFormData> | null,
  formData: FormData
): Promise<ServerActionResponse<ProductFormData>> {
  const rawData: ProductFormData = {
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    price: Number(formData.get('price')),
  };
  const validatedData = productSchema.safeParse(rawData);

  if (!validatedData.success) {
    return handleError(validatedData.error);
  }

  try {
    await prisma.product.create({ data: validatedData.data });
    revalidatePath('/');

    return {
      success: true,
      message: 'Product created successfully',
    };
  } catch (e) {
    return handleError(e);
  }
}

export async function updateProduct(
  prev: ServerActionResponse<ProductFormData> | null,
  formData: FormData
) {
  const rawData: ProductFormData = {
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    price: Number(formData.get('price')),
  };
  const validatedData = productSchema.safeParse(rawData);

  if (!validatedData.success) {
    return handleError(validatedData.error);
  }

  try {
    await prisma.product.update({
      where: {
        id: Number(formData.get('id')),
      },
      data: validatedData.data,
    });
    revalidatePath('/');

    return {
      success: true,
      message: 'Product updated successfully',
    };
  } catch (e) {
    return handleError(e);
  }
}

export async function deleteProduct(
  prev: ServerActionResponse<ProductFormData> | null,
  formData: FormData
) {
  try {
    await prisma.product.delete({
      where: {
        id: Number(formData.get('id')),
      },
    });
    revalidatePath('/');

    return {
      success: true,
      message: 'Product deleted successfully',
    };
  } catch (e) {
    return handleError(e);
  }
}
