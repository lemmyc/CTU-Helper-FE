import Header from "./components/Header";
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";

import routes from './config/routes';


function App() {
  
  return <main>
    <Header />
    <Routes>
      <Route path={routes.home} element={<Home />} />
      <Route path={routes.login} element={<Login />} />
      <Route path={routes.signup} element={<SignUp />} />
      <Route path={routes.chat} element={<Chat />} />
      <Route element={<NotFound />} />
    </Routes>
  </main>;
}

export default App;
