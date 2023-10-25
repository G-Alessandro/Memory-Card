export default function VictoryScreen(props) {
  return (
    <div className="end-screen victory-screen">
      <h1>YOU WIN!</h1>
      <div className="end-screen-btn-container">
        <button onClick={props.mainMenuBtn} className='another-round-btn'>Go To Main Menu</button>
        <button onClick={props.anotherRound} className="another-round-btn">Another Round</button>
      </div>
    </div>
  )
}