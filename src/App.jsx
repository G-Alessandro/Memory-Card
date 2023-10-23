import { useState, useEffect } from 'react';
import HeroCard from "./components/HeroCard"
import {test} from "./components/test"

export default function App() {

  const [characters, setCharacters] = useState(test);
  const [difficulty, setDifficulty] = useState("");
  const [randomCharacters, setRandomCharacters] = useState([]);

  // useEffect(() => {
  //   const charactersNames = [
  //     "Thor", "Thor%20(Goddess%20of%20Thunder)", "Spider-Man%20(Peter%20Parker)", "Spider-Girl%20(Anya%20Corazon)", "Spider-Gwen%20(Gwen%20Stacy)", "Spider-Man%20(Miles%20Morales)", "Spider-Woman%20(Jessica%20Drew)",
  //     "Iron%20Man", "War%20Machine%20(Marvel:%20Avengers%20Alliance)", "Hulk", "She-Hulk%20(Ultimate)","Captain%20America","Doctor%20Strange", "Black%20Widow", "Black%20Panther", "Professor%20X%20(Ultimate)",
  //     "Hawkeye", "Hawkeye%20(Kate%20Bishop)"
  //   ];

  //   const heroPromises = charactersNames.map(characterName => {
  //     return fetch(`https://gateway.marvel.com/v1/public/characters?name=${characterName}&limit=100&apikey=4ea64ac81653a51da4e6ec143ba73db2`)
  //       .then(response => response.json())
  //       .then(data => {
  //         if (data.data.results && data.data.results.length > 0) {
  //           const character = data.data.results[0];
  //           return {
  //             id: character.id,
  //             name: character.name,
  //             thumbnailPath: `${character.thumbnail.path}.${character.thumbnail.extension}`
  //           };
  //         }
  //         return null;
  //       })
  //       .catch(error => {
  //         console.error(`An error occurred while requesting for ${characterName}:`, error);
  //         return [];
  //       });
  //   });

  //   Promise.all(heroPromises)
  //     .then(charactersData => {
  //       const filteredCharacters = charactersData.filter(character => character !== null);
  //       setCharacters(filteredCharacters);
  //     });

  // }, []);

  function addRandomCharacters() {

    let charactersQuantity = 0;
    let chosenCharacters = [];

    if (difficulty === "easy") {charactersQuantity = Math.floor(characters.length / 3)}
    if (difficulty === "medium") {charactersQuantity = Math.floor((characters.length / 3)*2)}
    if (difficulty === "hard") {charactersQuantity = characters.length}
    
    for(let i = 0; i < charactersQuantity; i += 1){
      
      const randomNum = Math.floor(Math.random() * characters.length)
      const randomCharacter = characters[randomNum];
      if(!chosenCharacters.includes(randomCharacter)) {
        chosenCharacters.push(randomCharacter)
      } else {
        i -= 1
      }
    }
    setRandomCharacters(chosenCharacters)
  }

  useEffect(() => {
    if(difficulty) {
      addRandomCharacters()
    }
  },[difficulty])

  console.log(randomCharacters)
  // function cardRandomPosition() {
    
  // }

  return (
    <div>
      { !difficulty && <div>
        <button className='difficulty-btn' onClick={()=> setDifficulty("easy")}>Easy</button>
        <button className='difficulty-btn' onClick={()=> setDifficulty("medium")}>Medium</button>
        <button className='difficulty-btn' onClick={()=> setDifficulty("hard")}>Hard</button>
      </div>}
      {randomCharacters &&<HeroCard
        randomCharacters={randomCharacters}
      />}
    </div>
  )
}