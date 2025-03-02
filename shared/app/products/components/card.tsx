'use client';

import { deleteProduct, updateProduct } from '@/app/actions/product';
import { useActionState, useEffect, useState } from 'react';

import { Product } from '@prisma/client';
import { ProductFormData } from '@/app/types/product';
import { ServerActionResponse } from '@/app/types/response';

export function Card({ id, name, description, price }: Product) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <article className="grid grid-cols-3 p-4 my-4 bg-gray-100 rounded">
      {isEditing ? (
        <UpdateForm
          id={id}
          name={name}
          description={description}
          price={price}
          onCancel={() => setIsEditing(false)}
          onSubmit={() => setIsEditing(false)}
        />
      ) : (
        <>
          <div className="col-span-3 space-y-2">
            <p>이름: {name}</p>
            <p>설명: {description}</p>
            <p>가격: {price}</p>
          </div>
          <div className="flex gap-2 justify-end items-start col-[max-content] ml-2">
            <button
              className="p-2 py-1 border border-gray-300 rounded cursor-pointer"
              type="button"
              onClick={() => setIsEditing(true)}
            >
              Update
            </button>
            <DeleteForm id={id} />
          </div>
        </>
      )}
    </article>
  );
}

const initialState: ServerActionResponse<ProductFormData> = {
  success: false,
  message: '',
};

function UpdateForm({
  id,
  name,
  description,
  price,
  onCancel,
  onSubmit,
}: Product & {
  onCancel: () => void;
  onSubmit?: () => void;
}) {
  const [state, action, isPending] = useActionState(
    updateProduct,
    initialState
  );

  useEffect(() => {
    if (!state.success) return;

    onSubmit?.();
  }, [state, onSubmit]);

  return (
    <form action={action} className="grid grid-cols-3 col-span-3">
      <div className="col-span-3 space-y-2">
        <input hidden name="id" id="id" value={id} readOnly />
        <div className="grid grid-cols-6">
          <label className="col-span-1" htmlFor="name">
            이름
          </label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={name}
            className="col-span-5 p-1 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="grid grid-cols-6">
          <label className="col-span-1" htmlFor="description">
            설명
          </label>
          <textarea
            id="description"
            name="description"
            defaultValue={description}
            className="col-span-5 p-1 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="grid grid-cols-6">
          <label className="col-span-1" htmlFor="price">
            가격
          </label>
          <input
            type="number"
            id="price"
            name="price"
            defaultValue={price}
            className="col-span-5 p-1 border border-gray-300 rounded"
            required
          />
        </div>
      </div>
      <div className="flex gap-2 ml-2 col-[max-content] justify-end items-start">
        <button
          className="p-2 py-1 border border-gray-300 rounded cursor-pointer"
          type="submit"
          disabled={isPending}
        >
          {isPending ? 'Updating...' : 'Update'}
        </button>
        <button
          className="p-2 py-1 border border-gray-300 rounded cursor-pointer"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function DeleteForm({ id }: Pick<Product, 'id'>) {
  const [, action, isPending] = useActionState(deleteProduct, initialState);

  return (
    <form action={action} className="">
      <input hidden name="id" id="id" value={id} readOnly />
      <button
        type="submit"
        disabled={isPending}
        className="p-2 py-1 border border-gray-300 rounded cursor-pointer"
      >
        {isPending ? 'Deleting...' : 'Delete'}
      </button>
    </form>
  );
}
