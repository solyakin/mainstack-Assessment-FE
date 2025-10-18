import { Route, Routes } from "react-router-dom"
import Dashboard from "./screens/Dashboard";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App;