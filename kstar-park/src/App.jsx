
import { Drinks } from './pages/drink/Drinks';
import { Home } from './pages/Home';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import { SoldDrinks } from './pages/sold/SoldDrinks';
import { AddDrink } from './pages/drink/AddDrink';
import { UpdateDrink } from './pages/drink/UpdateDrink';
import { DeleteDrink } from './pages/drink/DeleteDrink';
import { NotFound } from './pages/NotFound';
import { ImportDrinks } from './pages/import/ImportDrinks';
import { AddImportDrink } from './pages/import/AddImportDrink';
import { UpdateImportDrink } from './pages/import/UpdateImportDrink';
import { DeleteImportDrink } from './pages/import/DeleteImportDrink';
import { AddSoldDrink } from './pages/sold/AddSoldDrink';
import { UpdateSoldDrink } from './pages/sold/UpdateSoldDrink';
import { DeleteSoldDrink } from './pages/sold/DeleteSoldDrink';
import Expenditure from './pages/expenditure/Expenditure';
import { AddExpenditure} from './pages/expenditure/AddExpenditure';
import { UpdateExpenditure } from './pages/expenditure/UpdateExpenditure';
import { DeleteExpenditure } from './pages/expenditure/DeleteExpenditure';
import { ExpenditureCategory } from './pages/expenditure_category/ExpenditureCategory';
import { AddExpenditureCategory } from './pages/expenditure_category/AddExpenditureCategory';
import { DeleteExpenditureCategory } from './pages/expenditure_category/DeleteExpenditureCategory';
import { UpdateExpenditureCategory } from './pages/expenditure_category/UpdateExpenditureCategory';
import { ShowDebt } from './pages/debt/ShowDebt';
import { AddDebt } from './pages/debt/AddDebt';
import { UpdateDebt } from './pages/debt/UpdateDebt';
import { DeleteDebt } from './pages/debt/DeleteDebt';
import { ShowFloat } from './pages/float/ShowFloat';
import { AddFloat } from './pages/float/AddFloat';
import { UpdateFloat } from './pages/float/UpdateFloat';
import { DeleteFloat } from './pages/float/DeleteFloat'
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from './Keycloak';
import { Summary } from './pages/summary/Summary';
import { ViewRemainDrink } from './pages/sold/ViewRemainDrink';
import { SoldDrinkProfit } from './pages/profit/SoldDrinkProfit';
import { UpdateBuyingPrice } from './pages/profit/UpdateBuyingPrice';
import { PromotionTable } from './pages/promotion/PromotionTable';
import { AddPromotion } from './pages/promotion/AddPromotion';
import { UpdatePromotion } from './pages/promotion/UpdatePromotion';
import { DeletePromotion } from './pages/promotion/DeletePromotion';


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
  {path: '/sold/add-drink', element: <AddSoldDrink/>},
  {path: '/sold/update-sold-drink/:soldDrinkId', element: <UpdateSoldDrink/>},
  {path: '/sold/delete-sold-drink/:soldDrinkId', element: <DeleteSoldDrink/>},

  {path: '/expenditure', element: <Expenditure/>},
  {path: '/expenditure/add-expenditure', element: <AddExpenditure/>},
  {path: '/expenditure/update-expenditure/:expenditureId', element: <UpdateExpenditure/>},
  {path: '/expenditure/delete-expenditure/:expenditureId', element: <DeleteExpenditure/>},
  
  {path: '/expenditure_category', element: <ExpenditureCategory/>},
  {path: '/expenditure_category/add-expenditure_category', element: <AddExpenditureCategory/>},
  {path: '/expenditure_category/update-expenditure_category/:categoryExpenditureId', element: <UpdateExpenditureCategory/>},
  {path: '/expenditure_category/delete-expenditure_category/:categoryExpenditureId', element: <DeleteExpenditureCategory/>},

  {path: '/summary', element: <Summary/>},

  {path: '/debt', element: <ShowDebt/>},
  {path: '/debt/add-debt', element: <AddDebt/>},
  {path: '/debt/update-debt/:debtId', element: <UpdateDebt/>},
  {path: '/debt/delete-debt/:debtId', element: <DeleteDebt/>},

  {path: '/float', element: <ShowFloat/>},
  {path: '/float/add-float', element: <AddFloat/>},
  {path: '/float/update-float/:floatId', element: <UpdateFloat/>},
  {path: '/float/delete-float/:floatId', element: <DeleteFloat/>},

  {path: '/remain-drinks', element: <ViewRemainDrink/>},

  {path: '/profit', element: <SoldDrinkProfit/>},
  {path: '/profit/update-price/:soldDrinkId', element: <UpdateBuyingPrice/>},

  {path: '/promotion', element: <PromotionTable/>},
  {path: '/promotion/add-promotion', element: <AddPromotion/>},
  {path: '/promotion/update-promotion/:promotionId', element: <UpdatePromotion/>},
  {path: '/promotion/delete-promotion/:promotionId', element: <DeletePromotion/>},


  {path: '*', element: <NotFound/>}
]);


const initOptions = {onLoad: 'login-required'}

function App() {
  return(
    <ReactKeycloakProvider authClient={keycloak} initOptions={initOptions}>
         <RouterProvider router={router}/>
    </ReactKeycloakProvider>
  );
}


export default App
