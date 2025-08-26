import gmailIcon from "../renderer/images/gmailicon.png";
import contaLogoBlanco from "../renderer/images/conta icon white.png";
import telefonoIcon from "../renderer/images/telefono.png";

const Footer = () => {
  return (
    <footer className="footer">
      <section className="footer__container">
        <nav className="nav nav--footer">
          <h2 className="footer__title">CONTA.</h2>
          <ul className="nav__link nav__link--footer">
            <li className="nav__items">
              <a
                className="left-align"
                href="https://github.com/ju4ncb"
                target="_blank"
              >
                <p>Juan Caballero</p>
              </a>
              <p className="left-align">Santiago Donado</p>
              <p className="left-align">Julio Escobar</p>
              <p className="left-align">Haiver Gutiérrez</p>
              <p className="left-align">Jorge Valencia</p>
            </li>
          </ul>
        </nav>
      </section>

      <section className="footer__copy">
        <div className="footer__social">
          <a href="#" className="footer__icons">
            <img src={gmailIcon} className="footer__img" />
          </a>
          <a href="#" className="footer__icons">
            <img src={telefonoIcon} className="footer__img" />
          </a>
        </div>

        <h3 className="footer__copyright">Derechos reservados &copy; CONTA </h3>
      </section>

      <section className="imgfoo">
        <div className="img-foo">
          <img src={contaLogoBlanco} alt="" />
        </div>
      </section>
    </footer>
  );
};

export default Footer;
