import Cookies from 'js-cookie';

function ListIt() {
  if(!Cookies.get('id')) window.location.href = "/login";
  else return <div>ListIt</div>;
}

export default ListIt;
