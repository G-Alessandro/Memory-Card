export default function DefeatScreen(props) {
  return (
    <div>
      <div>YOU LOST!</div>
      <button onClick={props.resetBtn}>Try Again</button>
      <button onClick={props.mainMenuBtn}>Go To Main Menu</button>
    </div>
  )
}