import NavBar from "./component/NavBar/NavBar";
import HomePage from "./component/HomePage/HomePage";
import News from "./component/News/News";
import Detail from "./component/Detail/Detail";
import { useContext } from "react";
import { ThemeContext } from "./component/ThemeContext/ThemeContext";
import { Routes, Route } from "react-router-dom";
import About from "./component/About/About";
import Contact from "./component/Contact/Contact";
import Protected from "./component/Login/Protected";
import Dashboard from "./component/Dashboard/Dashboard";
import ContactUpdate from "./component/Dashboard/DashboardUpdate/ContactUpdate";

function App() {
  const { theme, toggle, dark } = useContext(ThemeContext);

  const appStyle = {
    background: theme.backgroundColor,
    color: theme.color,
    transition: theme.transition,
  };
  return (
    <>
      <NavBar />
      <div style={appStyle}>
        {/* <TestComponent /> */}
        {/* <Detail /> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/news" element={<News />} />
          <Route
            path="/dashboard"
            element={
              <Protected>
                <Dashboard />
              </Protected>
            }
          ></Route>
          <Route
            path="/dashboard/update/:id"
            element={
              <Protected>
                <ContactUpdate />
              </Protected>
            }
          ></Route>

          <Route path="/feedback" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
