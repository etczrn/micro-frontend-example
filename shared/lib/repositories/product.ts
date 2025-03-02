import { Product } from '@prisma/client';
import { prisma } from '@/lib/prisma';

export function getProducts() {
  return prisma.product.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export function createProduct(product: Omit<Product, 'id'>) {
  return prisma.product.create({
    data: product,
  });
}
export function updateProduct({ id, ...product }: Product) {
  return prisma.product.update({
    where: { id },
    data: product,
  });
}

export function deleteProduct({ id }: Pick<Product, 'id'>) {
  return prisma.product.delete({
    where: { id },
  });
}
