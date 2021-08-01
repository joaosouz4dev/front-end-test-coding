import { useLocation, Link } from "react-router-dom";

function NoMatch() {
  let location = useLocation();

  return (
    <div className="container pt-5">
      <h3 className="text-center">
        No match for <code>{location.pathname}</code>
      </h3>
      <Link className="btn btn-primary d-block m-auto" to={`/`} style={{maxWidth: '100px'}}>
        Go back
      </Link>
    </div>
  );
}

export default NoMatch;
