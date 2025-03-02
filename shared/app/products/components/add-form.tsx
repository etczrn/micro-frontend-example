'use client';

import { ProductFormData } from '@/app/types/product';
import { ServerActionResponse } from '@/app/types/response';
import { createProduct } from '@/app/actions/product';
import { useActionState } from 'react';

const initialState: ServerActionResponse<ProductFormData> = {
  success: false,
  message: '',
};

export function AddForm() {
  const [state, action, isPending] = useActionState(
    createProduct,
    initialState
  );

  return (
    <form action={action} className="p-4 border-gray-300 border rounded">
      <h2 className="text-2xl font-bold">Add product</h2>
      <div className="my-4">
        <label htmlFor="name">이름</label>
        <input
          type="text"
          id="name"
          name="name"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        {state.errors?.name && (
          <p className="text-red-500">{state.errors.name[0]}</p>
        )}
      </div>
      <div className="my-4">
        <label htmlFor="description">설명</label>
        <textarea
          id="description"
          name="description"
          className="w-full p-2 border border-gray-300 rounded"
        />
        {state.errors?.description && (
          <p className="text-red-500">{state.errors.description[0]}</p>
        )}
      </div>
      <div className="my-4">
        <label htmlFor="price">가격</label>
        <input
          type="number"
          id="price"
          name="price"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        {state.errors?.price && (
          <p className="text-red-500">{state.errors.price[0]}</p>
        )}
      </div>
      {state.message && (
        <p
          className={`border p-2 rounded my-4 ${
            state.success
              ? 'border-blue-500 text-blue-500 font-bold'
              : 'border-red-500 text-red-500 font-bold'
          }`}
        >
          {state.message}
        </p>
      )}
      <button
        type="submit"
        disabled={isPending}
        className="w-full p-2 bg-gray-100 rounded cursor-pointer"
      >
        {isPending ? 'Adding...' : 'Add'}
      </button>
    </form>
  );
}
