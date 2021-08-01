import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

function List() {
  const [list, setList] = useState({});
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.length > 3 && search !== "noloro") {
      setList([]);
      setMessage("");
      setLoading(true);
      fetch(`https://api.github.com/search/users?q=${search}`)
        .then((response) => response.json())
        .then((json) => {
          // console.log(json);
          if (json.items && json.items.length > 0) {
            // apenas os 10 primeiros resultados
            let items = json.items.filter((item, i) => i < 10);
            setList(items);
            setLoading(false);
          } else {
            if (json.message) {
              setMessage(json.message);
              toast.error(json.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            } else {
              setMessage("No results found");
              toast.error("No results found", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }
            setLoading(false);
          }
        });
    } else {
      setList([]);
      if (search === "noloro") {
        setMessage("No permitido esta palabra");
        toast.error("No permitido esta palabra", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        setMessage("Search term must be at least 4 characters");
        toast.error("Search term must be at least 4 characters", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  return (
    <div className="container">
      <div className="list">
        <form className="d-flex mt-5 mb-4" onSubmit={handleSubmit}>
          <input
            className="form-control me-2"
            maxLength={"2048"}
            type="text"
            aria-autocomplete="both"
            aria-haspopup="false"
            autoCapitalize={"off"}
            autoComplete={"off"}
            autoCorrect={"off"}
            autoFocus={true}
            spellCheck={"false"}
            title="Search"
            aria-label="Search"
            placeholder="Buscar un usuario..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          ></input>
          <button className="btn btn-outline-success btn-search" type="submit">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
        <div className="message">{message}</div>
        {list.length > 0 && (
          <div className="list-group">
            {list.map((item) => (
              <Link
                className="list-group-item list-group-item-action pt-3 pb-3"
                to={`/perfil/${item.login}`}
                key={item.login}
              >
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">
                    <FontAwesomeIcon icon={faUser} className="ms-1" />
                    {" - "}
                    {item.login}
                  </h5>
                  <small>#{item.id}</small>
                </div>
              </Link>
            ))}
          </div>
        )}
        {loading === true && (
          <div className="d-flex align-items-center justify-content-center p-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default List;
