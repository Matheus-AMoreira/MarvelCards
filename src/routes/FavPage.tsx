import { fav } from '../types/character';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getFavCards, setFavCards } from '../store/Cards';
import { useEffect } from 'react';
import { FaHeartCircleXmark } from "react-icons/fa6";

import '../styles/error.scss';
import '../styles/routes/FavPage.scss';

type favCardProps ={
    name: string,
    img: string
}

function FavCard({name, img}: favCardProps){

    const dispatch = useAppDispatch()
    const favs = useAppSelector(state => state.cards.favCards)

    function RemoveCard(name: string) {

        const clone = favs?.filter((fav) => fav.name !== name)
        console.log(clone)
        
        dispatch(setFavCards(clone!))

        localStorage.setItem('fav', JSON.stringify(clone))
    }

    return (
        <div className="cardContent">
            <img className="img" src={img}></img>
            <div className='description'>
                <h2>{name}<button className='favRemove' onClick={() => RemoveCard(name)}><FaHeartCircleXmark /></button></h2>
            </div>
        </div>
    )
}

export default function FavPage(){

    const dispatch = useAppDispatch()

    useEffect(()=>{dispatch(getFavCards())},[])
            
    const favs = useAppSelector(state => state.cards.favCards)

    return(
        <div className="mainContainer">{favs ? favs.map((fav: fav) => <FavCard key={fav.id} name={fav.name} img={fav.img} />) : <h1 className="error">You don't have any card yet, try to add some</h1>}</div>
    )
}