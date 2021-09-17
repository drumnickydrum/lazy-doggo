import { useLazyQuery } from '@apollo/client';
import { getDogPhotoQuery } from '../graphql';
import { useReRender } from '../hooks';
import { Section, Photo } from '../components';

export function UseLazyQuery() {
  const ReRender = useReRender();

  const [getDog, { loading, error, data, called }] = useLazyQuery(
    getDogPhotoQuery,
    {
      variables: { breed: 'retriever' },
      fetchPolicy: 'no-cache',
    }
  );

  if (error) return `Error! ${error}`;
  return (
    <Section title='useLazyQuery' subtitle=''>
      <ul className='description'>
        <li>
          I will <em>not</em> query the network on initial render
        </li>
        <li>I provide an on-demand query function</li>
      </ul>

      <ReRender />

      <button className='button' onClick={getDog}>
        Fetch a new doggo!
      </button>

      <hr />
      <div className='photoContainer'>
        {called ? (
          <Photo
            id={data?.dog?.id}
            breed={'good boy'}
            image={data?.dog?.displayImage}
            loading={loading}
          />
        ) : (
          <p className='description'>query function not called yet</p>
        )}
      </div>
    </Section>
  );
}
