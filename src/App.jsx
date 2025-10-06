import './App.css'
import CalculatorComponent from './components/Example-1/CalculatorComponent'
import FixCalculatorComponent from './components/Example-1/FixCalculatorComponent'
import ParentComponent from './components/Example-2/ExampleOfUseCallback'

function App() {
  
  return (
    <>
      <div>
        <h1>Welcome to React Performance Optimization</h1>
        {/* <CalculatorComponent /> */}
                                 {/*  this component have performance isse */}
      
        <ParentComponent/>
        <FixCalculatorComponent />
      </div> 
    </>
  )
}

export default App
