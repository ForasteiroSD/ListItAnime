import Cookies from 'js-cookie';

function ToWatch() {
  if(!Cookies.get('id')) window.location.href = "/login";
  else return <div>ToWatch</div>;
}

export default ToWatch;
