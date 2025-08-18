const Filter = ({ value, onChange }) => (
  <div className="grid-2 row">
    <label htmlFor="filter">filter shown with:</label>
    <input id="filter" type="search" value={value} onChange={onChange} />
  </div>
);

export default Filter;