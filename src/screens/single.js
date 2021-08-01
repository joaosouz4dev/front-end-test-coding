import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";

function Single() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  let { login } = useParams();

  useEffect(() => {
    let monted = true;
    if (login) {
      setLoading(true);
      fetch(`https://api.github.com/users/${login}`)
        .then((response) => response.json())
        .then((json) => {
          if (monted) {
            // console.log(json);
            if (json && json.login) {
              setTimeout(() => {
                setData(json);
                setLoading(false);
              }, 300);
            } else {
              setData(null);
              setLoading(false);
              if (json.message) {
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
                toast.error("No podemos encontrar al usuario", {
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
          }
        });
    }
    return () => {
      monted = false;
    };
  }, [login]);

  function convertDate(date) {
    date = new Date(date);
    return moment(date).format("MMMM Do YYYY, h:mm:ss a");
  }

  return (
    <div className="container pt-5">
      {loading === true && (
        <div className="d-flex align-items-center justify-content-center p-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {data && loading === false && (
        <div className="card" style={{ width: "315px", margin: "0 auto" }}>
          <img src={data.avatar_url} className="card-img-top p-3" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{data.login}</h5>
            <p className="card-text">{data.bio ? data.bio : "Sin bio"}</p>
            <p className="card-text">
              <small className="text-muted">
                Creado en: {convertDate(data.created_at)}
              </small>
            </p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              Repos:{" "}
              <span className="badge bg-secondary">{data.public_repos}</span>
            </li>
            <li className="list-group-item">
              Gists:{" "}
              <span className="badge bg-secondary">{data.public_gists}</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Single;
