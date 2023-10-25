export default function DefeatScreen(props) {
  return (
    <div className="end-screen defeat-screen">
      <h1>YOU LOST!</h1>
      <div className="end-screen-btn-container">
        <button onClick={props.mainMenuBtn} className='try-again-btn'>Go To Main Menu</button>
        <button onClick={props.resetBtn} className="try-again-btn">Try Again</button>
      </div>
    </div>
  )
}