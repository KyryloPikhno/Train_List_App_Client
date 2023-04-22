import {Navigate, Route, Routes} from "react-router-dom";

import {Layout} from "./layouts";
import {TrainsPage} from "./pages";


const App = () => {

  return (
      <Routes>
          <Route path={'/'} element={<Layout/>}>
              <Route index element={<Navigate to={'/trains-list'}/>}/>
              <Route path={'/trains-list'} element={<TrainsPage/>}/>
          </Route>
      </Routes>
  );
};

export default App;
