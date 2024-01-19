import { Link } from 'react-router-dom';

import '../styles/components/CharacterCard.scss';

type CharacterCardProps = {
    id: number, 
    name: string, 
    imgUrl: string, 
    comics: number, 
    series:number, 
    stories: number
}

export default function CharacterCard({id, name, imgUrl, comics, series, stories} : CharacterCardProps) {

    return (
        <div>
            { name ?
                <Link to={`characterInfo/${id}`}>   
                    <div className="cardContent">
                        <img className="img" src={imgUrl}></img>
                        <div className='description'>
                            <h2>{name}</h2>
                            <div className='cardBotton'>
                                <div className='separtion'>
                                    <p>Comics</p>
                                    <p>{comics}</p>
                                </div>

                                <div className='separtion'>
                                    <p>Series</p>
                                    <p>{series}</p>
                                </div>

                                <div className='separtion'>
                                    <p>Stories</p>
                                    <p>{stories}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link> : <h1>None characters found with with {name}</h1>
            }
        </div>
    )
}