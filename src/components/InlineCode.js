export function InlineCode({ code, withBackground }) {
  return (
    <span
      className='inlineCode'
      style={{ backgroundColor: withBackground ? 'rgba(21, 58, 51, 0.5)' : '' }}
    >
      <code>{code}</code>
    </span>
  );
}
