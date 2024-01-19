import CharacterCard from '../components/CharacterCard'

import '../styles/routes/Home.scss'
import { character } from '../types/character'
import { useAppSelector } from '../hooks'

function App() {
    const characters = useAppSelector(state => state.cards.characters)
  return (
    <div className="mainContainer">
          {characters.length > 0 ? characters
              .map((char: character) => 
                  <CharacterCard key={char.id}
                      id={char.id}
                      name={char.name} 
                      imgUrl={`${char.thumbnail.path}.${char.thumbnail.extension}`}
                      comics={char.comics.available}
                      series={char.series.available}
                      stories={char.stories.available}
              />) : <h1 style={{color:'black'}}>Wasn't possible to find any character</h1>
          }
    </div>
  )
}

export default App
