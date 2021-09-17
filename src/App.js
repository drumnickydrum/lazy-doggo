import React from 'react';
import {
  ApolloClient,
  ApolloProvider,
  gql,
  InMemoryCache,
  NetworkStatus,
  useQuery,
} from '@apollo/client';
import { useRef, useState } from 'react';

const client = new ApolloClient({
  uri: 'https://71z1g.sse.codesandbox.io/',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <DogPhoto />
      </div>
    </ApolloProvider>
  );
}

export default App;

const getDogPhotoQuery = gql`
  query Dog($breed: String!) {
    dog(breed: $breed) {
      id
      displayImage
    }
  }
`;

export function DogPhoto() {
  // const [getDog, { loading, error, data }] = useLazyQuery(getDogPhotoQuery, {
  //   variables: { breed: "corgi" },
  //   fetchPolicy: "no-cache"
  // });
  const [renderToggle, setRenderToggle] = useState(true);

  const { loading, error, data, refetch, networkStatus } = useQuery(
    getDogPhotoQuery,
    {
      variables: { breed: 'corgi' },
      notifyOnNetworkStatusChange: true,
    }
  );
  console.log(data?.dog?.displayImage);

  const countRef = useRef(0);
  countRef.current++;

  if (error) return `Error! ${error}`;
  return (
    <Section title='useQuery' subtitle='(cache-first)'>
      <ul className='description'>
        <li>
          Subsequent renders will query my <b>cache</b>
        </li>
        <li>
          Use the
          <InlineCode>refetch</InlineCode>
          function to make a new network request
        </li>
      </ul>
      <code className='count'>Component rendered {countRef.current} times</code>
      <button
        className='button'
        onClick={() => setRenderToggle(renderToggle => !renderToggle)}
      >
        Re-render component
      </button>
      <button className='button' onClick={() => !loading && refetch()}>
        Refetch a Corgi!
      </button>

      <hr />
      <div className='photoContainer'>
        <Photo
          breed={'corgi'}
          image={data?.dog?.displayImage}
          loading={loading}
          networkStatus={networkStatus}
        />
      </div>
    </Section>
  );
}

function Section({ title, subtitle, children }) {
  return (
    <section className='section'>
      <h2 className='title'>{title}</h2>
      <p className='subtitle'>{subtitle}</p>
      {children}
    </section>
  );
}

function Photo({ breed, image, loading, networkStatus }) {
  if (networkStatus === NetworkStatus.refetch) {
    return `Refetching ${breed} from network`;
  } else if (loading) {
    return `Loading ${breed} from network...`;
  }
  return <Image image={image} />;
}

function Image({ image }) {
  const prevImgRef = useRef();
  const isCache = prevImgRef.current === image;
  prevImgRef.current = image;
  const cacheColor = `rgb(${Math.random() * 255 + 50},${
    Math.random() * 255 + 50
  },${Math.random() * 255 + 50})`;
  return (
    <div>
      <img className='photo' alt='corgi' src={image} />
      {isCache && (
        <pre className='cacheStatus' style={{ color: cacheColor }}>
          <code>(I came from cache)</code>
        </pre>
      )}
    </div>
  );
}

function InlineCode({ children }) {
  return (
    <span className='code'>
      <code>{children}</code>
    </span>
  );
}
