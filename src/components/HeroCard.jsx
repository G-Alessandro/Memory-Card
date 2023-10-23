import { useState,useEffect } from "react";
// export default function HeroCard(props) {

//   return (
//     <div className='container'>
//       {props.randomCharacters.map(character => (
//         <button className='hero-card' key={character.id} onClick={() => props.changeCardPosition(character.id)}>
//           <img src={character.thumbnailPath} alt={character.name} />
//           <h3>{character.name}</h3>
//         </button>
//       ))}
//     </div>
//   );
// }

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

  // console.log("props.randomCharacters",props.randomCharacters)
  // console.log("newCardsOrder",newCardsOrder)

  return (
    <div className='container'>
      {newCardsOrder.map(character => (
        <button className='hero-card' key={character.id} onClick={() => cardFunction(character.id)}>
          <img src={character.thumbnailPath} alt={character.name} />
          <h3>{character.name}</h3>
        </button>
      ))}
    </div>
  );
}