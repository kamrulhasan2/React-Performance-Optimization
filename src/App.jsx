import './App.css'
import CalculatorComponent from './components/CalculatorComponent'
import FixCalculatorComponent from './components/FixCalculatorComponent'

function App() {
  
  return (
    <>
      <div>
        <h1>Welcome to React Performance Optimization</h1>
        {/* <CalculatorComponent /> */}
                                 {/*  this component have performance isse */}
      
      
        <FixCalculatorComponent />
      </div> 
    </>
  )
}

export default App
