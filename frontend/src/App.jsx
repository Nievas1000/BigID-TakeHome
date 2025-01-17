import { Route, Routes } from "react-router-dom"
import SideMenu from "./components/SideMenu"
import Home from "./components/Home"
import Organizations from "./components/Organization"
import Users from "./components/Users"
import Articles from "./components/Articles"
import Comments from "./components/Comments"


function App() {

  return (
      <div className="d-flex">
        <SideMenu />
        <div className="container-fluid p-4">
          <Routes>
            <Route path="/"  element={<Home />} />
            <Route path="/organizations" element={<Organizations />} />
            <Route path="/users" element={<Users />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/comments" element={<Comments />} />
          </Routes>
        </div>
      </div>
  )
}

export default App
