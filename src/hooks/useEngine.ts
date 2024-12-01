import { useCallback, useEffect, useState } from "react"
import useCountDownTimer from "./useCountDownTimer";
import useWords from "./useWords";
import useTyping from "./useTyping";
import { countErrors } from "../utils/helpers";
export type State = "start" | "run" | "finish";

const NUMBER_OF_WORDS = 12;
const COUNTDOWN_SECONDS = 30
const useEngine = ()=>{
    const [state,setState] = useState<State>("start")
    const {words,updateWords} = useWords(NUMBER_OF_WORDS)
    const {timeleft,startCountDown,resetCountDown }=  useCountDownTimer(COUNTDOWN_SECONDS)
    const{typed,cursor,clearTyped,resetTotalTyped,totallyTyped} = useTyping(state!=="finish")


    const[errors,setErrors] = useState(0);

    const isStarting = state==="start"&&cursor>0;
    const areWordsFinished = cursor===words.length;

    const sumError= useCallback(()=>{
        const wordReached = words.substring(0,cursor)
        setErrors((prevError)=>prevError+countErrors(typed,wordReached))
    },[typed,words,cursor])

    useEffect(()=>{
        if (isStarting) {
            setState("run")
            startCountDown()
        }

    },[isStarting,startCountDown,cursor])

    useEffect(()=>{
        if (!timeleft) {
            console.log("Time is up ....")
            setState("finish")
            sumError()
        }
    },[timeleft,sumError])


    useEffect(()=>{

        if(areWordsFinished){
            console.log("words are finished")
            sumError()
            updateWords()
            clearTyped()
        }

    },[cursor,words,clearTyped,typed,areWordsFinished,updateWords,sumError])

    const restart = useCallback(()=>{
        console.log("restarting...")
        resetCountDown()
        resetTotalTyped()
        setState("start")
        setErrors(0)
        updateWords();
    },[clearTyped,updateWords,resetCountDown,resetTotalTyped])


    return {state,words,timeleft, typed,errors,totallyTyped,restart};

}
export default useEngine