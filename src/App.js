import logo from './logo.svg';
import './App.css';
import { useDrag } from 'react-dnd'

function App() {
  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      item: { text },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1
      })
    }),
    []
  )

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
       <div ref={dragRef} style={{ opacity }}>
      {text}
    </div>
    </div>
  );
}

export default App;
