import { Card } from './components/card';
import { prisma } from '@/lib/prisma';

async function getSurveys() {
  const surveys = await prisma.survey.findMany();
  return surveys;
}

export default async function Page() {
  const surveys = await getSurveys();

  return (
    <>
      <h1>Surveys</h1>
      <ul>
        {surveys.map((survey) => (
          <li key={survey.id}>
            <Card data={survey} />
          </li>
        ))}
      </ul>
    </>
  );
}
