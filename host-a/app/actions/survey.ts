'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

type PreviousState = {
  success: boolean;
  message: string;
};

export async function updateSurvey(_: PreviousState, formData: FormData) {
  const rawData = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
  };

  try {
    await prisma.survey.update({
      where: {
        id: Number(formData.get('id')),
      },
      data: rawData,
    });
    revalidatePath('/');

    return {
      success: true,
      message: 'Survey updated successfully',
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message: 'Failed to update survey',
    };
  }
}
