export default function VictoryScreen(props) {
  return (
    <div>
      <div>YOU WIN!</div>
      <button onClick={props.anotherRound}>Another Round</button>
      <button onClick={props.mainMenuBtn}>Go To Main Menu</button>
    </div>
  )
}