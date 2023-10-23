export default function HeroCard(props) {

  return (
    <div className='container'>
      {props.randomCharacters.map(character => (
        <div className='hero-card' key={character.id}>
          <img src={character.thumbnailPath} alt={character.name} />
          <h3>{character.name}</h3>
        </div>
      ))}
    </div>
  );
}
