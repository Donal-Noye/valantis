import { Route, Routes } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import HomePage from "./routes/HomePage";
import './styles/app.scss'

function App() {
  return (
    <Routes>
      <Route path={'/'} element={<MainLayout />}>
        <Route path={'/'} element={<HomePage />}/>
      </Route>
    </Routes>
  );
}

export default App;