import { useParams, Link } from 'react-router-dom';
import { MdArrowBackIosNew }  from 'react-icons/md'
import { useAppSelector } from '../hooks';
import { Item, Item2 } from '../types/character';
import { FaHeartCirclePlus } from "react-icons/fa6";
import { useState } from 'react';

import { character } from "../types/character"
import { fav } from '../types/character';

import '../styles/routes/CharacterInfo.scss'

export default function CharacterCard() {
    const [showCSS, setShowCSS] = useState<boolean[]>([])

    const { id } = useParams();

    const char = useAppSelector(state => state.cards.characters.find((char) => {return char.id === Number(id) && char}))

    function SaveChar(char?: character) {

        if(char != undefined){
            let fav: fav[] | null = null
            fav = JSON.parse(localStorage.getItem('fav')!)
    
            if(fav != null){
                
                if(!fav.find(p => p.id == char.id)){
                    const newFav=([{id: char.id, name:char.name, img:`${char.thumbnail.path}.${char.thumbnail.extension}`}])
    
                    fav = fav.concat(newFav)
    
                    localStorage.setItem('fav', JSON.stringify(fav))
                }else {
                    alert('You alredy have this card in the favorites')
                }
    
            } else if(char){
                localStorage.setItem('fav', JSON.stringify([{id: char?.id, name:char?.name, img:`${char?.thumbnail.path}.${char?.thumbnail.extension}`}]))
            }
        }
    }

    return (
        <div className='infoContainer'>
            <Link to="/"><MdArrowBackIosNew/></Link>
            {char &&
                <div className='charInfoContainer'>
                    <div className='imageContainer'>
                        <img className='imgInfo' src={`${char.thumbnail.path}.${char.thumbnail.extension}`}></img>
                        <h1>{char.name}<button className='btn-Save' onClick={() => SaveChar(char)}><FaHeartCirclePlus /></button></h1>
                    </div>
                    {char.description &&
                        <div className='charDescription'>
                            <h2>Description</h2>
                            <h3>{char.description}</h3>
                        </div>
                    }
                    <div className='charApparition'>
                        {
                            <>
                                <div className='InfoButtons'>
                                    <button onClick={() => setShowCSS([true, false, false])}>Comics</button>
                                    <button onClick={() => setShowCSS([false, true, false])}>Series</button>
                                    <button onClick={() => setShowCSS([false, false, true])}>Stories</button>
                                </div>
                                <div style={{textAlign: 'center'}}>
                                    {showCSS[0] &&
                                        <CharComics comics={char.comics.items} />
                                    }
                                    {showCSS[1] &&
                                        <CharSeries series={char.series.items} />
                                    }
                                    {showCSS[2] &&
                                        <CharStories stories={char.stories.items} />
                                    }
                                </div>
                            </>
                        }
                    </div>
                </div>
            }
        </div>
    )
}

type CharComicsProps = {
    comics: Item[] 
}

function CharComics(items: CharComicsProps){
    return (
        <>
            {items.comics.length >= 1 &&
                <div>
                    <h3>Comics</h3>
                    <ul>
                        {items.comics.map((comic, i)=> <li key={i}>{comic.name}</li>)}
                    </ul>
                </div>   
            }
        </>
    )
}

type CharSeriesProps = {
    series: Item[] 
}

function CharSeries(items: CharSeriesProps){
    return (
        <>
            {items.series.length >= 1 &&
                <div> 
                    <h3>Series</h3>
                    <ul>
                        {items.series.map((serie, i)=> <li key={i}>{serie.name}</li>)}
                    </ul>
                </div>
            }
        </>
    )
}

type CharStoriesProps = {
    stories: Item2[] 
}

function CharStories(items: CharStoriesProps){
    return (
        <>
            {items.stories.length >= 1 &&
                <div>
                    <h3>Stories</h3>
                    <ul>
                        {items.stories.map((story, i)=><li key={i}>{story.name}</li>)}
                    </ul>
                </div>
            }
        </>
    )
}