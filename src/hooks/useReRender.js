import { useRef, useState } from 'react';

export function useReRender() {
  const [_, setRenderToggle] = useState(true);

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
