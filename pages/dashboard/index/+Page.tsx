import { useEffect } from "react";
import Home from "../../../components/Home";

export default Page;

function Page() {
  useEffect(() => {
    const userJson = localStorage.getItem("user");
    if (userJson === null) {
      window.location.href = "/";
    }
  }, []);

  return (
    <>
      <Home />
    </>
  );
}
