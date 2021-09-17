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
      <UseQueryCacheFirst />
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

function useReRender() {
  const [renderToggle, setRenderToggle] = useState(true);

  const reRender = () => setRenderToggle(renderToggle => !renderToggle);

  const countRef = useRef(0);
  countRef.current++;

  const ReRender = () => (
    <>
      <code className='renderCount'>
        Component rendered {countRef.current} times
      </code>
      <button className='button' onClick={reRender}>
        Re-render component
      </button>
    </>
  );

  return ReRender;
}

export function UseQueryCacheFirst() {
  // const [getDog, { loading, error, data }] = useLazyQuery(getDogPhotoQuery, {
  //   variables: { breed: "corgi" },
  //   fetchPolicy: "no-cache"
  // });
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
      <ul className='description'>
        <li>I will query the network on initial render</li>
        <li>
          Subsequent renders will query my <b>cache</b>
        </li>
        <li>
          Use the
          <InlineCode>refetch</InlineCode>
          function to make a new network request
        </li>
      </ul>

      <ReRender />

      <button className='button' onClick={() => !loading && refetch()}>
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

function Section({ title, subtitle, children }) {
  return (
    <section className='section'>
      <h2 className='title'>{title}</h2>
      <p className='subtitle'>{subtitle}</p>
      {children}
    </section>
  );
}

function Photo({ id, breed, image, loading, networkStatus }) {
  if (networkStatus === NetworkStatus.refetch) {
    return `Refetching ${breed} from network`;
  } else if (loading) {
    return `Loading ${breed} from network...`;
  }
  return <Image id={id} image={image} />;
}

function Image({ id, image }) {
  const prevImgRef = useRef();
  const isCache = prevImgRef.current === image;
  prevImgRef.current = image;
  const cacheColor = getRandomRGB();
  return (
    <div>
      <pre className='codeBlock'>
        <code>ID: {id}</code>
      </pre>
      <img className='photo' alt='corgi' src={image} />
      <pre className='codeBlock' style={{ color: cacheColor }}>
        <code>{isCache ? 'I came from cache' : "I'm a new img"} </code>
      </pre>
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

function getRandomRGB() {
  return `rgb(${Math.random() * 255 + 50},${Math.random() * 255 + 50},${
    Math.random() * 255 + 50
  })`;
}
