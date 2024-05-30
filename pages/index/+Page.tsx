import { useEffect, useState } from "react";
import { NavBar, NavOption } from "../../components/NavBar";

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
            {JSON.stringify(user) === "{}" ? "Iniciar sesion" : "Cerrar sesion"}
          </NavOption>
          {JSON.stringify(user) === "{}" ? undefined : (
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
    </>
  );
}

function Header({ children }: { children: React.ReactNode }) {
  return <div className="header_home">{children}</div>;
}
