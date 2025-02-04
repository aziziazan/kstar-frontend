
import { Drinks } from './pages/drink/Drinks';
import { Home } from './pages/Home';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import { SoldDrinks } from './pages/sold/SoldDrinks';
import Expenditure from './pages/expenditure/Expenditure';
import { AddDrink } from './pages/drink/AddDrink';
import { UpdateDrink } from './pages/drink/UpdateDrink';
import { DeleteDrink } from './pages/drink/DeleteDrink';
import { NotFound } from './pages/NotFound';
import { ImportDrinks } from './pages/import/ImportDrinks';
import { AddImportDrink } from './pages/import/AddImportDrink';
import { UpdateImportDrink } from './pages/import/UpdateImportDrink';
import { DeleteImportDrink } from './pages/import/DeleteImportDrink';


const router = createBrowserRouter([
  {path: '/', element: <Home/>},
  {path: '/drinks', element: <Drinks/>},
  {path: '/drinks/add-drink', element: <AddDrink/>},
  {path: '/drinks/update-drink/:drinkId', element: <UpdateDrink/>},
  {path: '/drinks/delete-drink/:drinkId', element: <DeleteDrink/>},

  {path: '/import', element: <ImportDrinks/>},
  {path: '/import/add-drink', element: <AddImportDrink/>},
  {path: '/import/update-import-drink/:importDrinkId', element: <UpdateImportDrink/>},
  {path: '/import/delete-import-drink/:importDrinkId', element: <DeleteImportDrink/>},


  {path: '/sold', element: <SoldDrinks/>},

  {path: '/expenditure', element: <Expenditure/>},
  
  {path: '*', element: <NotFound/>}
]);

function App() {
  return <RouterProvider router={router}/>;
}

export default App
