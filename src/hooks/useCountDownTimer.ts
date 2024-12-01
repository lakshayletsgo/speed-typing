import { time } from 'console';
import {useCallback,useRef,useEffect,useState} from 'react'

const useCountDownTimer = (seconds:number)=>{
    const[timeleft,setTimeLeft] = useState(seconds);
    const intervalRef = useRef<NodeJS.Timer | null>(null)
    const startCountDown = useCallback(()=>{
        console.log("starting countdown...")
        intervalRef.current = setInterval(()=>{
            setTimeLeft((timeleft)=> timeleft-1)
        },1000)
    },[setTimeLeft])

    const resetCountDown  =useCallback(()=>{
        console.log("Reset Countdown")
        if(intervalRef.current){
            clearInterval(intervalRef.current);
        }
        setTimeLeft(seconds)
    },[seconds])


    useEffect(()=>{
            if(!timeleft&&intervalRef.current){
                console.log("Clearing time...")


                clearInterval(intervalRef.current)
            }
    },[timeleft,intervalRef])

    return {timeleft, startCountDown,resetCountDown}

}

export default useCountDownTimer