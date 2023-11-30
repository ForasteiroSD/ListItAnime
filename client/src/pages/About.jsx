import Cookies from "js-cookie";
import "./About.css";

function About() {
  if (!Cookies.get("id")) window.location.href = "/login";
  else
    return (
      <>
        <div className="animeBar">
          <h1 className="animeName">ABOUT</h1>
        </div>

        <div className="about">

          <div className="info">
            <p>
              This is a web made application that let the users save their
              whatched animes and animes to watch, while create a list of highest
              rated animes by the user. The application was created with the
              intuite to help its creators to rate their watched animes and as the
              final project of the course <i>Programação Web</i>.
            </p>
          </div>
          
          <h2 className="animeName">ABOUT US</h2>
          <div className="aboutUs">
            <div className="data">
              <figure>
                <img
                  src="https://avatars.githubusercontent.com/u/94070943?v=4"
                  alt=""
                />
              </figure>
              <div className="texts">
                <p className="names">Diogo Sobral</p>
                <a href="https://github.com/ForasteiroSD" target="__blank">
                  Link GitHub
                </a>
              </div>
            </div>
            <div className="data">
              <div className="texts">
                <p className="names">Thiago Fernandes</p>
                <a href="https://github.com/fivvvve" target="__blank">
                  Link GitHub
                </a>
              </div>
              <figure>
                <img
                  src="https://avatars.githubusercontent.com/u/86969851?v=4"
                  alt=""
                />
              </figure>
            </div>
          </div>
          <footer>
            <p>
              <i>
                "Às vezes, as perguntas são complicadas e as respostas são
                simples."
              </i>
              <br />
              L. Lawliet (Death Note)
            </p>
          </footer>
        </div>
      </>
    );
}

export default About;
