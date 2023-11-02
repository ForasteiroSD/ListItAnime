import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="notfound">
      <h1>Looks like this page does not exists</h1>
      <p>Click <Link to={'/'}>here</Link> to go to the home page</p>
    </div>
  );
}

export default NotFound;
