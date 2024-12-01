import {faker} from '@faker-js/faker';
// import { MdRestartAlt } from 'react-icons/md';
import RestartButton from './components/RestartButton'
import Results from './components/Results';
import UserTypings from './components/UserTyping';
import useEngine from './hooks/useEngine';
import { calculateAccuracyPercentage } from './utils/helpers';
const words = faker.random.words(10);

const App=()=> {
  const{state,words,timeleft,typed,errors,restart,totallyTyped} = useEngine();



  return <>
  
  <CountdownTimer timeleft={timeleft}/>
  <div className='relative max-w-xl mt-3 text-3xl leading-relaxed break-all'>
    <WordContainer>

    <GeneratedWords words={words}/>
    <UserTypings className='absolute inset-0' words={words} userInput={typed}/>
    </WordContainer>
  </div>
  <RestartButton className={"mx-auto mt-10  text-slate-500"}
    onRestart={restart}
  />
  <Results
    state={state}
    className='mt-10'
    errors={errors}
    accuracyPercentage={calculateAccuracyPercentage(errors,totallyTyped)}
    total={totallyTyped}
  />
  </>
};

const WordContainer =({children}:{children:React.ReactNode})=>{
  return (
    <div className='relative text-3xl max-w-xl leading-relaxed break-all mt-3'>{children}</div>
  )
}

const GeneratedWords=({words}:{words:string})=>{
  return <div className="text-slate-500" >
  {words}
</div>
};

const CountdownTimer = ({timeleft}:{timeleft:number})=>{
  return <h2 className='text-primary-400 text-xl'>
    Time: {timeleft}
  </h2>
}

export default App;
