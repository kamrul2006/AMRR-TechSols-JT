import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import AddItem from './pages/AddItem';
// import ViewItems from './pages/ViewItems';
import HomePage from './pages/HomePage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/add" element={<AddItem />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
