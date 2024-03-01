import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { Container } from "../components/Container";

export const MainLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Container>
          <Outlet />
        </Container>
      </main>
    </>
  );
};