import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import {store} from './store/store'
import { Provider } from 'react-redux'

import ErrorPage from './routes/error-page'
import App from './App'
import Home from './routes/Home'
import CharacterInfo from './routes/CharacterInfo'
import FavPage from './routes/FavPage'

import './styles/main.scss'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "characterInfo/:id",
        element: <CharacterInfo />,
      },
      {
        path: "favs",
        element: <FavPage />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
