import Cookies from 'js-cookie';

function TopAnimes() {
  if(!Cookies.get('id')) window.location.href = "/login";
  else return <div>TopAnimes</div>;
}

export default TopAnimes;
