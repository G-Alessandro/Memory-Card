import { useState, useEffect } from 'react';
import {test} from "./components/test"
import HeroCards from "./components/HeroCards"
import VictoryScreen from './components/VictoryScreen';
import DefeatScreen from './components/DefeatScreen';
import MarvelLogo from './logo/marvel.svg'

export default function App() {

  const [characters, setCharacters] = useState(test);
  const [difficulty, setDifficulty] = useState("");
  const [randomCharacters, setRandomCharacters] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [chosenCards, setChosenCard] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const [showScore, setShowScore] = useState(false);
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
    setShowScore(true);
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
        setShowScore(false);
      }
      
    } else {
      setChosenCard([]);
      setScore(0);
      setGameDefeat(true);
      setShowCards(false);
      setShowScore(false);
    }
    
  }

  useEffect(() => {
    if(score>bestScore) {
      setBestScore(score)
    }
  },[score])

  function resetBtn() {
    setScore(0);
    setShowCards(true);
    setChosenCard([]);
    setGameWin(false);
    setGameDefeat(false);
    setShowScore(true);
  }

  function anotherRound() {
    addRandomCharacters()
    setScore(0);
    setShowCards(true);
    setChosenCard([]);
    setGameWin(false);
    setGameDefeat(false);
    setShowScore(true);
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
    setShowScore(false);
  }

  return (
    <div className='container'>
      {!gameStarted && 
      <div className='main-menu'>
        <img src={MarvelLogo} alt="Marvel Logo" className='marvel-logo'/>
        <h2>MEMORY GAME</h2>
        <div className='difficulty-btn-rules-container'>
          <p className='rules'>Choose the difficulty level and don't choose the same hero/heroine more than once!</p>
          <div className='difficulty-btn-container'>
            <button className='difficulty-btn easy-btn' onClick={()=> setDifficulty("easy")}>EASY</button>
            <button className='difficulty-btn medium-btn' onClick={()=> setDifficulty("medium")}>MEDIUM</button>
            <button className='difficulty-btn hard-btn' onClick={()=> setDifficulty("hard")}>HARD</button>
          </div>
        </div>
      </div>
      }
      {showScore && 
      <div className='score-main_menu-container'>
          <button onClick={mainMenuBtn} className='main-menu-btn'>Main Menu</button>
        <div className='score-container'>
          <p className='best-score'>Best score : {bestScore}</p>
          <p className='score'>Score : {score}</p>
        </div>
      </div>}
      {showCards &&
      <HeroCards
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
