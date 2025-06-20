import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import ViewItems from './pages/ViewItems';
import HomePage from './pages/HomePage';
import AddPage from './pages/AddItemPage';
import ViewPage from './pages/ViewPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddPage />} />
          <Route path="/seeAll" element={<ViewPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
