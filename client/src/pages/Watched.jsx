import Cookies from 'js-cookie';

function Watched() {
  if(!Cookies.get('id')) window.location.href = "/login";
  else return <div>Watched</div>;
}

export default Watched;
