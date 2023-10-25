import { useState,useEffect } from "react";

export default function HeroCard(props) {

  const [newCardsOrder, setNewCardsOrder] = useState([])

  useEffect(() => {
    setNewCardsOrder(props.randomCharacters);
  }, [props.randomCharacters]);

  function changeCardsOrder() {

    const orderChanged = [];
    
    while (orderChanged.length < props.randomCharacters.length) {

      const randomNum = Math.floor(Math.random() * props.randomCharacters.length);
      const randomCharacter = props.randomCharacters[randomNum];

      if(!orderChanged.includes(randomCharacter)){
        orderChanged.push(randomCharacter)
      }
    }
    console.log("orderChanged",orderChanged)
    setNewCardsOrder(orderChanged)
  }

  function cardFunction(cardId) {
    props.matchManagement(cardId)
    changeCardsOrder()
  }

  return (
    <div className='cards-container'>
      {newCardsOrder.map(character => {
        const characterName = character.name.replace(/\([^()]*\)/, '').trim();
        return (
          <button key={character.id} onClick={() => cardFunction(character.id)} className="card-container">
            <div className='hero-card'>
              <img src={character.thumbnailPath} alt={characterName} />
            </div>
            <h3 className='hero-name'>{characterName}</h3>
          </button>
        );
      })}
    </div>
  );
}