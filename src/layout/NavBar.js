import React, { useState, useEffect } from "react";
import localAPI from "../api/localAPI";

function NavBar() {
  const [searchs, setSearchs] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    localAPI
      .get(`/users`)
      .then((res) => {
        setSearchs(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return searchs ? (
    <section>
      <div>
        {searchs.map((search) => (
          <li>{search.name}</li>
        ))}
      </div>
      <input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {/* {searchValue && setSearchs.filter(r => r.includes(searchValue)).map(t => <li>{t}</li>)} */}
    </section>
  ) : (
    <section>
      <h1>Not Found! Please try different name </h1>
    </section>
  );
}

export default NavBar;
