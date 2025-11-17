export default function HeaderFilters({
  total,
  field,
  setField,
  query,
  setQuery,
  sort,
  setSort
}) {
  return (
    <div className="filters-card mb-3">
      <div className="row g-2 align-items-center filters-wrapper">

        
        <div className="col-auto">
          <h5 className="fw-bold mb-0">{total} companies</h5>
        </div>

      
        <div className="col-auto">
          <select
            className="form-select form-select-sm"
            value={field}
            onChange={(e) => setField(e.target.value)}
          >
            <option value="name">Name</option>
            <option value="industry">Industry</option>
            <option value="location">Location</option>
          </select>
        </div>

        
        <div className="col">
          <div className="input-group input-group-sm">
            <input
              type="text"
              className="form-control"
              placeholder={`Search by ${field}...`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            
          </div>
        </div>

        
        <div className="col-auto">
          <select
            className="form-select form-select-sm"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="name_asc">Name Asc</option>
            <option value="name_desc">Name Dsc</option>
          </select>
        </div>

      </div>
    </div>
  );
}
