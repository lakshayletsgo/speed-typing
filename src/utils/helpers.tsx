import { error } from "console";

export const formatPercentage = (percentage: number)=>{
    return percentage.toFixed(0)+"%"
}

export const countErrors = (actual:string, expected:string)=>{
    const expectedCharacter = expected.split("");
    return expectedCharacter.reduce((errors,expectedChar,i)=>{
        const acutalChar = actual[i]
        if(acutalChar!==expectedChar){
            errors++;
        }
        return errors;

    },0);
}

export const calculateAccuracyPercentage = (error:number,total:number)=>{
    if(total>0){
        const corrects =  total-error;
        return (corrects/total)*100;
    }
    return 0;
}