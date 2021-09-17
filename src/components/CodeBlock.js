export function CodeBlock({ color, code, withBackground, textAlign }) {
  return (
    <pre
      className='codeBlock'
      style={{
        color,
        backgroundColor: withBackground ? 'rgba(21, 58, 51, 0.5)' : '',
        textAlign: textAlign || 'left',
      }}
    >
      <code>{code}</code>
    </pre>
  );
}
