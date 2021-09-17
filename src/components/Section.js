export function Section({ title, subtitle, children }) {
  return (
    <section className='section'>
      <h2 className='title'>{title}</h2>
      <p className='subtitle'>{subtitle}</p>
      {children}
    </section>
  );
}
