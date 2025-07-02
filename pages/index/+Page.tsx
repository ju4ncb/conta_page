import { useEffect, useState } from "react";
import { NavBar, NavOption } from "../../components/NavBar";
import dineroIcon from "../../renderer/images/dinero.svg";
import icon2 from "../../renderer/images/icon2.png";
import icon3 from "../../renderer/images/icon3.png";
import dinero from "../../renderer/images/dinero.jpg";
import c2 from "../../renderer/images/c2.jpg";
import Footer from "../../components/Footer";
import seguridad from "../../renderer/images/seguridad.jpg";

export { Page };

function Page() {
  const [user, setUser] = useState({});
  useEffect(() => {
    const userJson = localStorage.getItem("user");
    setUser(userJson !== null ? JSON.parse(userJson) : {});
  }, []);
  return (
    <>
      <Header>
        <NavBar>
          <NavOption
            handleClick={(e: React.MouseEvent<HTMLElement>) => {
              e.preventDefault();
              if (JSON.stringify(user) === "{}") {
                window.location.href = "/auth";
              } else {
                localStorage.removeItem("user");
                window.location.href = "/";
              }
            }}
          >
            {JSON.stringify(user) === "{}" ? "Iniciar sesión" : "Cerrar sesión"}
          </NavOption>
          {JSON.stringify(user) === "{}" ? (
            <NavOption
              handleClick={(e: React.MouseEvent<HTMLElement>) => {
                e.preventDefault();
                window.location.href = "/register";
              }}
            >
              Registrarse
            </NavOption>
          ) : (
            <NavOption
              handleClick={(e: React.MouseEvent<HTMLElement>) => {
                e.preventDefault();
                window.location.href = "/dashboard";
              }}
            >
              <i className="bi bi-person-fill" style={{ fontSize: 30 }} />
            </NavOption>
          )}
        </NavBar>
      </Header>
      <Conta />
      <Services />
      <General />
      <Footer />
    </>
  );
}

function Header({ children }: { children: React.ReactNode }) {
  return (
    <header className="header_home">
      {children}
      <div className="header-content container">
        <h1>CONTA</h1>
        <p>Administra tus gastos con nosotros.</p>
      </div>
    </header>
  );
}

function Conta() {
  return (
    <section className="conta">
      <div className="conta-content container">
        <h2>Organiza tu dinero</h2>
        <div className="conta-group">
          <ContaBox title="Fácil y sencillo" img={dinero}>
            Nuestra app ofrece un servicio facil de manejar. Contamos con un
            apartado de bolsillo y de movimientos los cuales son faciles de
            administrar.
          </ContaBox>

          <ContaBox title="Controla tus gastos" img={c2}>
            Con nuestra app podras estar al tanto de todos tus gastos. Deberas
            ingresar un monto el cual se vera reflejado en un apartado llamado
            bolsillo, donde podras administrar tus gastos.
          </ContaBox>

          <ContaBox title="Seguridad y Confianza" img={seguridad}>
            Nos tomamos muy en serio la seguridad de tu información. Nuestra app
            utiliza encriptación avanzada para proteger tus datos personales y
            financieros. Puedes estar tranquilo sabiendo que tus datos están
            seguros con nosotros.
          </ContaBox>
        </div>
      </div>
    </section>
  );
}

function ContaBox({
  title,
  img,
  children,
}: {
  title: string;
  img: string;
  children: React.ReactNode;
}) {
  return (
    <div className="conta-1">
      <img src={img} className="conta-group-img" />
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}

function Services() {
  return (
    <main className="services">
      <div className="services-content">
        <h2>Nuestra App</h2>
        <div className="services-group">
          <Service icon={dineroIcon}>Indicamos tus gastos</Service>

          <Service icon={icon2}>Calculamos tus gastos</Service>

          <Service icon={icon3}>Herramientas para ti</Service>
        </div>
        <p>
          Organiza tu dinero mediante nuestro sistema de organización por
          bolisillos, manten al pendiente cada uno de tus gastos y administra
          cada uno de tus movimientos.
        </p>
        <a href="/register" className="btn-1">
          Registrate ya
        </a>
      </div>
    </main>
  );
}

function Service({
  icon,
  children,
}: {
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <div className="services-1">
      <img src={icon} alt="" />
      <h3>{children}</h3>
    </div>
  );
}

function General() {
  return (
    <>
      <section className="general">
        <div className="general-1">
          <h2>¿Ya eres miembro de CONTA?</h2>
          <p>Si ya eres miembro de CONTA, inicia sesión aquí.</p>
          <a href="/auth" className="btn-1" style={{ width: 200 }}>
            Iniciar sesión
          </a>
        </div>
        <div className="general-2"></div>
      </section>
      <section className="general">
        <div className="general-3" />
        <div className="general-1">
          <h2>Conviertete en usuario Premium! </h2>
          <p>Pronto habilitaremos esta opcion</p>
        </div>
      </section>
    </>
  );
}
