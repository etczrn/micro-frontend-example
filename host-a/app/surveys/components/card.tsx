'use client';

import { useEffect, useState } from 'react';

import { Survey } from '@prisma/client';
import { updateSurvey } from '@/app/actions/survey';
import { useFormState } from 'react-dom';

export function Card({ data }: Readonly<{ data: Survey }>) {
  const [isEditing, setIsEditing] = useState(false);
  const { title, description } = data;

  return (
    <>
      {isEditing ? (
        <EditForm data={data} onSubmit={() => setIsEditing(false)} />
      ) : (
        <>
          <h2>{title}</h2>
          <p>{description}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
    </>
  );
}

const initialState = {
  success: false,
  message: '',
};

function EditForm({
  data: { id, title, description },
  onSubmit,
}: Readonly<{ data: Survey; onSubmit?: () => void }>) {
  const [state, action] = useFormState(updateSurvey, initialState);

  useEffect(() => {
    if (!state.success) return;
    if (!onSubmit) return;

    onSubmit();
  }, [state, onSubmit]);

  return (
    <form action={action}>
      <input hidden name="id" id="id" value={id} readOnly />
      <label htmlFor="title">Title</label>
      <input type="text" id="title" name="title" defaultValue={title} />
      {description && (
        <>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            defaultValue={description}
          />
        </>
      )}
      <button>Save</button>
    </form>
  );
}
