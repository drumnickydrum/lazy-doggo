export function CodeBlock({ color, code, withBackground }) {
  return (
    <pre
      className='codeBlock'
      style={{
        color,
        backgroundColor: withBackground ? 'rgba(21, 58, 51, 0.5)' : '',
      }}
    >
      <code>{code}</code>
    </pre>
  );
}
