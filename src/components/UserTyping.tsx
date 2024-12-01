import exp from "constants";
import cn from "classnames"
import Carets from "./Carets";
import { useState } from "react";

const UserTypings=({
    userInput,
    className,
    words
}:{
    userInput:string;
    words:string;
    className?:string;
})=>{
    const TypedCharacters = userInput.split("")
    return(<div className={className}>
        {TypedCharacters.map((char,index)=>{
            return <Character key={`${char}_${index}`} actual={char} expected={words[index]}/>
                
        })}
        <Carets/>
    </div>)
};

const Character = ({actual,expected}:{actual:string,expected:string})=>{
    const isCorrect= actual===expected
    const isWhiteSpace = expected===" "
    return <span className={cn({"text-red-500":!isCorrect&&!isWhiteSpace,"text-primary-400":isCorrect&&!isWhiteSpace,"bg-red-500/50":!isCorrect&&isWhiteSpace})}>{expected}</span>
}

export default UserTypings