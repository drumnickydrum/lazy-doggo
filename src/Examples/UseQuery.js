import { useQuery } from '@apollo/client';
import { getDogPhotoQuery } from '../graphql';
import { useReRender } from '../hooks';
import { Section, InlineCode, Photo } from '../components';

export function UseQuery() {
  const ReRender = useReRender();

  const { loading, error, data, refetch, networkStatus } = useQuery(
    getDogPhotoQuery,
    {
      variables: { breed: 'corgi' },
      notifyOnNetworkStatusChange: true,
    }
  );

  if (error) return `Error! ${error}`;
  return (
    <Section title='useQuery' subtitle='(cache-first)'>
      <Features />

      <hr />

      <ReRender />

      <button className='button' onClick={refetch}>
        Refetch a Corgi!
      </button>

      <hr />

      <div className='photoContainer'>
        <Photo
          id={data?.dog?.id}
          breed={'corgi'}
          image={data?.dog?.displayImage}
          loading={loading}
          networkStatus={networkStatus}
        />
      </div>
    </Section>
  );
}

function Features() {
  return (
    <ul className='description'>
      <li>I will query the network on initial render</li>
      <li>
        Subsequent renders will query my <b>cache</b>
      </li>
      <li>
        Use the
        <InlineCode code='refetch' withBackground />
        function to make a new network request
      </li>
    </ul>
  );
}
