import React, { useEffect, useState, useMemo, useRef } from "react";
import axios from "axios";
import HeaderFilters from "./HeaderFilters";

export default function App() {
  const [companies, setCompanies] = useState([]);
  const originalRef = useRef([]);

  const [field, setField] = useState("industry");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("default");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
// console.log(originalRef,"originalRef")
  // Load data
  useEffect(() => {
    setLoading(true);
    axios.get("/companies.json")
      .then(res => {
        setCompanies(res.data);
        originalRef.current = res.data;
      })
      .catch(() => setError("Failed to load data"))
      .finally(() => setLoading(false));
  }, []);

  // Reactive filtering + sorting
  const visible = useMemo(() => {
    let list = [...companies];

    // filter
    if (query.trim() !== "") {
      const q = query.trim().toLowerCase();
      list = list.filter(c =>
        (c[field] || "").toLowerCase().includes(q)
      );
    }

    // sort
    if (sort === "default") {
      const map = new Map(originalRef.current.map((c, i) => [c.id, i]));
      list.sort((a, b) => (map.get(a.id) ?? 0) - (map.get(b.id) ?? 0));
      // return list.sort((a,b) => (a.id) - (b.id))
    } else {
      const [key, dir] = sort.split("_");
      // console.log(key,dir,"keydir")
      list.sort((a, b) => {
        const aValue = (a[key] || "").toLowerCase();
        const bValue = (b[key] || "").toLowerCase();
        if (aValue < bValue) return dir === "asc" ? -1 : 1;
        if (aValue > bValue) return dir === "asc" ? 1 : -1;
        return 0;
      });
    }

    return list;
  }, [companies, query, field, sort]);

  return (
    <div>
      {/* Header */}
      <div className="app-header">
        <div className="container">
          <h1 className="app-title text-center">Companies Directory</h1>
        </div>
      </div>

      {/* Filters */}
      <div className="container">
        <HeaderFilters
          total={companies.length}
          field={field}
          setField={setField}
          query={query}
          setQuery={setQuery}
          sort={sort}
          setSort={setSort}
        />
      </div>

      {/* Table */}
      <div className="container mb-5">
        {loading && <div className="text-center py-5">Loading...</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-hover table-bordered align-middle">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Industry</th>
                  <th>Location</th>
                  <th>Employees</th>
                  <th>Founded</th>
                  <th>Website</th>
                </tr>
              </thead>
              <tbody>
                {visible.map(c => (
                  <tr key={c.id}>
                    <td>{c.name}</td>
                    <td>{c.industry}</td>
                    <td>{c.location}</td>
                    <td>{c.employees}</td>
                    <td>{c.founded}</td>
                    <td>
                      <a className="btn btn-outline-primary btn-sm" href={c.website} target="_blank">
                        Visit <i className="bi bi-box-arrow-up-right ms-1"></i>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
