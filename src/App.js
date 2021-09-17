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
      onCompleted: () => console.log('on completed'),
      notifyOnNetworkStatusChange: true,
    }
  );
  console.log(data?.dog?.displayImage);

  const countRef = useRef(0);
  countRef.current++;

  if (error) return `Error! ${error}`;
  return (
    <Section title='useQuery' subtitle='(I make a request with every render)'>
      <p className='description'>
        Subsequent renders will query my <b>cache</b>, but you can use the
        <InlineCode>refetch</InlineCode>
        function to make a network request
      </p>
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

      <Photo
        breed={'corgi'}
        image={data?.dog?.displayImage}
        loading={loading}
        networkStatus={networkStatus}
      />
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
  return (
    <>
      <hr />
      <div className='photoContainer'>
        {networkStatus === NetworkStatus.refetch ? (
          `Refetching ${breed} from network`
        ) : loading ? (
          `Loading ${breed} from network...`
        ) : image ? (
          <img className='photo' alt='corgi' src={image} />
        ) : null}
      </div>
    </>
  );
}

function InlineCode({ children }) {
  return (
    <span className='code'>
      <code>{children}</code>
    </span>
  );
}
/*

<p className="description">
        You can pass a
        <span className="code">
          <code>variables</code>
        </span>
        argument to override the initial options
      </p>
      <button className="button" onClick={handleBulldog}>
        Refetch with variable of Bulldog
      </button>

      */
