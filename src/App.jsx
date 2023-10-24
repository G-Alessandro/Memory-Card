import { useState, useEffect } from 'react';
import {test} from "./components/test"
import HeroCard from "./components/HeroCard"
import VictoryScreen from './components/VictoryScreen';
import DefeatScreen from './components/DefeatScreen';

export default function App() {

  const [characters, setCharacters] = useState(test);
  const [difficulty, setDifficulty] = useState("");
  const [randomCharacters, setRandomCharacters] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [chosenCards, setChosenCard] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const [gameWin, setGameWin] = useState(false);
  const [gameDefeat, setGameDefeat] = useState(false);

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
    let randomCharacters = [];

    if (difficulty === "easy") {charactersQuantity = Math.floor(characters.length / 3)}
    if (difficulty === "medium") {charactersQuantity = Math.floor((characters.length / 3)*2)}
    if (difficulty === "hard") {charactersQuantity = characters.length}
    
    for(let i = 0; i < charactersQuantity; i += 1){
      
      const randomNum = Math.floor(Math.random() * characters.length)
      const randomCharacter = characters[randomNum];
      if(!randomCharacters.includes(randomCharacter)) {
        randomCharacters.push(randomCharacter)
      } else {
        i -= 1
      }
    }
    setRandomCharacters(randomCharacters);
    setGameStarted(true);
    setShowCards(true);
  }

  useEffect(() => {
    if(difficulty) {
      addRandomCharacters()
    }
  },[difficulty])

  function matchManagement(cardId) {
    if(!chosenCards.includes(cardId)) {
      setChosenCard(prevChosenCard => [...prevChosenCard, cardId]
      )
      setScore(prevScore => prevScore + 1)
      if(score === randomCharacters.length - 1) {
        setGameWin(true);
        setShowCards(false);
      }
      
    } else {
      // setRandomCharacters([]);
      setChosenCard([]);
      setScore(0);
      setGameDefeat(true);
      setShowCards(false);
    }
    
  }

  useEffect(() => {
    if(score>bestScore) {
      setBestScore(score)
    }
  },[score])

  function resetBtn() {
    // setDifficulty("");
    // setRandomCharacters([]);
    setScore(0);
    setShowCards(true);
    setChosenCard([]);
    setGameWin(false);
    setGameDefeat(false);
  }

  function anotherRound() {
    addRandomCharacters()
    setScore(0);
    setShowCards(true);
    setChosenCard([]);
    setGameWin(false);
    setGameDefeat(false);
  }

  function mainMenuBtn() {
    setDifficulty("");
    setScore(0);
    setRandomCharacters([]);
    setChosenCard([]);
    setGameStarted(false);
    setShowCards(false);
    setGameWin(false);
    setGameDefeat(false);
  }

  // useEffect(() => {
  //   if(score === randomCharacters.length && score > 0) {
  //     setGameWin(true)
  //   }
  // },[score])

  return (
    <div>
      {!gameStarted && 
      <div>
        <div>
          <h1>MARVEL HEROES</h1>
          <h3>Memory Game</h3>
        </div>
        <div>
          <button className='difficulty-btn' onClick={()=> setDifficulty("easy")}>Easy</button>
          <button className='difficulty-btn' onClick={()=> setDifficulty("medium")}>Medium</button>
          <button className='difficulty-btn' onClick={()=> setDifficulty("hard")}>Hard</button>
        </div>
      </div>
      }
      {gameStarted && 
      <div>
        <div>
          <button onClick={mainMenuBtn}>Main Menu</button>
        </div>
        <div>Best score : {bestScore}</div>
        <div>Score : {score}</div>
      </div>}
      {showCards &&
      <HeroCard
        randomCharacters={randomCharacters}
        matchManagement={matchManagement}
      />}
      {gameWin && <VictoryScreen
        anotherRound={anotherRound}
        mainMenuBtn={mainMenuBtn}
      />}
      {gameDefeat && <DefeatScreen
        resetBtn={resetBtn}
        mainMenuBtn={mainMenuBtn}
      />}
    </div>
  )
}
