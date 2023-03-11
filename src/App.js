import './App.css';
import DragAndDrop from './Components/DragAndDrop';


const data = [
  { title: "To DO", items: ["Cooking", "Cleaning", "Studying"] },
  { title: "Done", items: ["Laundry", "Eating"] },
  { title: "Don't Do", items: ["Smoking", "Drinking"] }

]

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <DragAndDrop data={data} />
      </div>
    </div >
  );
}

export default App;
