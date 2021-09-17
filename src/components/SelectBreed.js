export function SelectBreed({ setSelectedBreed }) {
  return (
    <select
      defaultValue='default'
      onChange={e => setSelectedBreed(e.target.value)}
    >
      <option value='default' disabled>
        Select a doggo
      </option>
      <option value='shiba'>Shiba</option>
      <option value='bulldog'>Bulldog</option>
      <option value='puggle'>Puggle!</option>
    </select>
  );
}
