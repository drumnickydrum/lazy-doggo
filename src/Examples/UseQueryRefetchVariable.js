import { useQuery } from '@apollo/client';
import { getDogPhotoQuery } from '../graphql';
import { Section, InlineCode, Photo } from '../components';
import { CodeBlock } from '../components/CodeBlock';
import { useEffect, useState } from 'react';

export function UseQueryRefetchVariable() {
  const { loading, error, data, refetch, networkStatus } = useQuery(
    getDogPhotoQuery,
    {
      variables: { breed: 'shiba' },
      notifyOnNetworkStatusChange: true,
    }
  );

  const [selectedBreed, setSelectedBreed] = useState('shiba');
  useEffect(() => {
    refetch({ breed: selectedBreed });
  }, [refetch, selectedBreed]);

  if (error) return `Error! ${error}`;
  return (
    <Section title='useQuery' subtitle='(refetch with new variable)'>
      <Features />
      <hr />
      <SelectBreed
        selectedBreed={selectedBreed}
        setSelectedBreed={setSelectedBreed}
      />
      <hr />
      <div className='photoContainer'>
        <Photo
          id={data?.dog?.id}
          breed={selectedBreed}
          image={data?.dog?.displayImage}
          loading={loading}
          networkStatus={networkStatus}
        />
      </div>
    </Section>
  );
}

function SelectBreed({ selectedBreed, setSelectedBreed }) {
  return (
    <select
      defaultValue='shiba'
      onChange={e => setSelectedBreed(e.target.value)}
    >
      <option value='shiba'>Doge</option>
      <option value='bulldog'>Bulldog</option>
      <option value='puggle'>Puggle!</option>
    </select>
  );
}

function Features() {
  return (
    <ul className='description'>
      <li>State or hard-code variable on initial render:</li>
      <CodeBlock
        withBackground
        code={`const { refetch } = useQuery(
getDogPhotoQuery,
{ variables: { breed: 'shiba' } }`}
      />
      <li>
        Passing a new variable to <InlineCode code='refetch' withBackground />{' '}
        will override the one originally defined:
      </li>
      <CodeBlock
        withBackground
        code={`() => refetch({ breed: selectedBreed })`}
      />
    </ul>
  );
}
