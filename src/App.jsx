import './App.css'
import CalculatorComponent from './components/Example-1/CalculatorComponent'
import FixCalculatorComponent from './components/Example-1/FixCalculatorComponent'
import ParentComponent from './components/Example-2/ExampleOfUseCallback'
import ProfileSwitcher from './components/Example-3/ProfileSwitcher'
import SubmitForm from './components/Example-4/SubmitForm'
import UserProfile from './components/Example-4/UserProfile'

function App() {
  
  return (
    <>
      <div>
        <h1>Welcome to React Performance Optimization</h1>
        {/* <CalculatorComponent /> */}
                                 {/*  this component have performance isse */}
      
        {/* <ParentComponent/>
        <FixCalculatorComponent />
        

         <ProfileSwitcher /> */}
        <UserProfile firstName="kamrul" lastName="hasan" />
        <SubmitForm />
    
      </div> 
    </>
  )
}

export default App
