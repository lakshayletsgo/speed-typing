import { useCallback,useEffect,useState,useRef } from "react"
const isKeyboardCodeAllowed=(code:string)=>{
    return(
        code.startsWith("Key")||code.startsWith("Digit")||code==="Backspace"||code==="Space"
    )
}
const useTyping=(enabled:boolean)=>{
    const[cursor,setCursor] = useState(0)
    const[typed,setTyped] = useState<string>("")
    const totallyTyped = useRef(0);
    const keydownHandler = useCallback(({key,code}:KeyboardEvent)=>{
        if(!enabled||!isKeyboardCodeAllowed(code)){
            return;
        }
        switch(key){
            case "Backspace":
                setTyped((prev)=>prev.slice(0,-1));
                setCursor(cursor-1);
                break;
            default:
                setTyped((prev)=>prev.concat(key))
                setCursor(cursor+1)
                totallyTyped.current+=1
        }

    },[cursor,enabled])

    const clearTyped=useCallback(()=>{
        setTyped("")
        setCursor(0);
    },[])

    const resetTotalTyped = useCallback(()=>{
        totallyTyped.current=0;
    },[])

    useEffect(()=>{
        window.addEventListener("keydown",keydownHandler);
        return ()=>{
            window.removeEventListener("keydown",keydownHandler)
        }
    },[keydownHandler])

    return{
        typed,cursor,clearTyped,resetTotalTyped,totallyTyped:totallyTyped.current
    }

}

export default useTyping