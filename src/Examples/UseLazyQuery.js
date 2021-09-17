import { useLazyQuery } from '@apollo/client';
import { getDogPhotoQuery } from '../graphql';
import { Section, Photo } from '../components';
import { CodeBlock } from '../components/CodeBlock';
import { useEffect, useState } from 'react';
import { SelectBreed } from '../components/SelectBreed';

let fetchPolicy = 'cache-first';

export function UseLazyQuery() {
  const [isCaching, setIsCaching] = useState(true);
  useEffect(() => {
    fetchPolicy = isCaching ? 'cache-first' : 'no-cache';
  }, [isCaching]);

  const [getDog, { loading, error, data }] = useLazyQuery(getDogPhotoQuery, {
    fetchPolicy,
  });

  const [selectedBreed, setSelectedBreed] = useState();
  useEffect(() => {
    if (!selectedBreed) return;
    getDog({ variables: { breed: selectedBreed, fetchPolicy } });
  }, [selectedBreed, getDog]);

  if (error) return `Error! ${error}`;
  return (
    <Section title='useLazyQuery' subtitle=''>
      <Features />
      <hr />
      <SelectBreed setSelectedBreed={setSelectedBreed} />
      <CacheResults isCaching={isCaching} setIsCaching={setIsCaching} />
      <hr />
      <div className='photoContainer'>
        {data?.dog ? (
          <Photo
            id={data.dog.id}
            breed={selectedBreed}
            image={data.dog.displayImage}
            loading={loading}
          />
        ) : (
          <p className='description'>lazy query not called yet</p>
        )}
      </div>
    </Section>
  );
}

function CacheResults({ isCaching, setIsCaching }) {
  return (
    <div className='cacheResults'>
      <label htmlFor='cacheResults'>Cache Results?</label>
      <input
        id='cacheResults'
        type='checkbox'
        checked={isCaching}
        onChange={() => setIsCaching(isCaching => !isCaching)}
      />
    </div>
  );
}

function Features() {
  return (
    <ul className='description'>
      <li>
        I will <em>not</em> query on initial render
      </li>
      <li>
        I provide an on-demand function to call the query, passing in options:
        <CodeBlock
          withBackground
          code={`() => getDog({ 
        variables: { 
          breed: selectedBreed, 
          fetchPolicy 
        } 
      })`}
        />
      </li>
    </ul>
  );
}
