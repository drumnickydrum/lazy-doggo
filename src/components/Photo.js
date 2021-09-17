import { NetworkStatus } from '@apollo/client';
import { useRef } from 'react';
import { getRandomRGB } from '../utils/getRandomRGB';
import { CodeBlock } from './CodeBlock';

export function Photo({ id, breed, image, loading, networkStatus }) {
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
      <CodeBlock code={`ID: ${id}`} />
      <img className='photo' alt='dog' src={image} />
      <CodeBlock
        color={cacheColor}
        code={isCache ? 'I came from cache' : "I'm a new img"}
      />
    </div>
  );
}
