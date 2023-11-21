import Cookies from "js-cookie";
import "./About.css";

function About() {
  if (!Cookies.get("id")) window.location.href = "/login";
  else
    return (
      <div className="about">
        <div className="animeBar">
          <h1 className="animeName">ABOUT</h1>
        </div>

        <div className='info'>
          <p>
            This is a web made application that let the users save their whatched animes and animes to watch, while create a list of highest rated animes by the user. The application was create with the intuite to help its creators to rate their watched animes and as the final project of the course <i>Programação Web</i>.
          </p>
        </div>

        <h2>ABOUT US</h2>
        <div className="aboutUs">
          <div className="data">
            <figure>
              <img
                src="https://pbs.twimg.com/media/FB1gPxUXoAQh5oO?format=jpg&name=small"
                alt=""
              />
            </figure>
            <div className="texts">
              <p>name</p>
              <p>link github</p>
              <p>n sei oq mais</p>
            </div>
          </div>
          <div className="data">
            <figure>
              <img
                src="https://pbs.twimg.com/media/FB1gPxUXoAQh5oO?format=jpg&name=small"
                alt=""
              />
            </figure>
            <div className="texts">
              <p>name</p>
              <p>link github</p>
              <p>n sei oq mais</p>
            </div>
          </div>
        </div>
      </div>
    );
}

export default About;
