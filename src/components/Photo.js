import { NetworkStatus } from '@apollo/client';
import { getRandomRGB } from '../utils/getRandomRGB';
import { CodeBlock } from './CodeBlock';

export function Photo({ id, breed, image, loading, networkStatus }) {
  if (networkStatus && networkStatus === NetworkStatus.refetch) {
    return `Refetching ${breed} from network`;
  } else if (loading) {
    return `Loading ${breed} from network...`;
  }
  return <Image id={id} image={image} />;
}

const prevImgs = new Set();
function Image({ id, image }) {
  const isCache = prevImgs.has(image);
  prevImgs.add(image);
  const cacheColor = getRandomRGB();
  return (
    <div>
      <CodeBlock code={`ID: ${id}`} textAlign='center' />
      <img className='photo' alt='dog' src={image} />
      <CodeBlock
        color={cacheColor}
        code={isCache ? 'I came from cache' : "I'm a new img"}
        textAlign='center'
      />
    </div>
  );
}
