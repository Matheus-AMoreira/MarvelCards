import { Outlet } from 'react-router-dom'

import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "./hooks"
import { storeCards } from "./store/Cards"
import { useEffect, useRef, useState } from "react"
import { VscSearch } from 'react-icons/vsc'
import { Link } from 'react-router-dom'

const url = import.meta.env.VITE_REQUEST_URL
const apiKey = import.meta.env.VITE_API_Key

import './styles/components/NavBar.scss'

function App() {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const search = useRef('')
  const [ favbtn, setFavBtn ] = useState(false)

  async function SearchName(name: string) {
  
      navigate('/')
      
      if(name!='') {
          const charactersUrl = `${url}characters?nameStartsWith=${name}&orderBy=name&${apiKey}`
  
          await axios.get(charactersUrl)
          .then(response => {
              dispatch(storeCards(response.data.data.results))
          })
          .catch(error => console.log(error))
      }
    }

    async function FetchData(){

        const charactersUrl = `${url}characters?&orderBy=modified&limit=42&${apiKey}`
        
        await axios.get(charactersUrl)
        .then(response => {
            dispatch(storeCards(response.data.data.results))
        })
        .catch(error => console.log(error))
    }

    useEffect(() => {FetchData()},[]);


  return (
    <>
      <header>
          <nav>
              <a href='/' className='logo'>
                  <svg xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve"
                  width="200px"
                  viewBox="0 0 200 50">
                      <path fill="#FEFEFE" d="M126.222 40.059v7.906H111.58V4h7.885v36.059h6.757zm-62.564-14.5c-.61.294-1.248.44-1.87.442v-14.14h.04c.622-.005 5.264.184 5.264 6.993 0 3.559-1.58 5.804-3.434 6.705zM40.55 34.24l2.183-18.799 2.265 18.799H40.55zm69.655-22.215V4.007H87.879l-3.675 26.779-3.63-26.78h-8.052l.901 7.15c-.928-1.832-4.224-7.15-11.48-7.15-.047-.002-8.06 0-8.06 0l-.031 39.032-5.868-39.031-10.545-.005-6.072 40.44.002-40.435H21.278L17.64 26.724 14.096 4.006H4v43.966h7.95V26.78l3.618 21.192h4.226l3.565-21.192v21.192h15.327l.928-6.762h6.17l.927 6.762 15.047.008h.01v-.008h.02V33.702l1.845-.27 3.817 14.55h7.784l-.002-.01h.022l-5.011-17.048c2.538-1.88 5.406-6.644 4.643-11.203v-.002C74.894 19.777 79.615 48 79.615 48l9.256-.027 6.327-39.85v39.85h15.007v-7.908h-7.124v-10.08h7.124v-8.03h-7.124v-9.931h7.124z"></path>
                  </svg>
              </a>
              <div className='navbar-search'>
                  <input type='text' onKeyDown={(e) => {e.key == 'Enter' && SearchName(search.current)}} onChange={(e) => search.current = e.target.value} placeholder='Search Characters'></input>
                  <button className='buttonIcon' onClick={() => SearchName(search.current)}><VscSearch/></button>
              </div>
              <div className="button-group">
                  {favbtn ?
                      <button onClick={()=> setFavBtn(false)}><Link to='/'> Home </Link></button> :
                      <button onClick={()=> setFavBtn(true)}><Link to='favs'> Favorite </Link></button>
                  }
              </div>
          </nav>
      </header>
      <Outlet/>
    </>
  )
}

export default App
