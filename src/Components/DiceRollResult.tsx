import * as React from 'react';
import styled from 'styled-components';

interface IDiceRollResultProps{
    rollResult: number[];
}

export default function DiceRollResult(props: IDiceRollResultProps) {    
    
    function drawRoll(){
        return props.rollResult.map((result) => {
            return <DiceResult result={result}></DiceResult>;
        //<div>{props.rollResult}</div>
        });
    }
    
return <div>{drawRoll()}</div>;
}

interface IDiceResultProps{
    result: number;
}

function DiceResult(props:IDiceResultProps){
    const DiceFace = styled.div`
        text-align: center;
        border-style: solid;
        width: 20px;
        height: 20px;
        margin: 5px;
    `;
    
    return (
        <DiceFace>
            {props.result}
        </DiceFace>
    );
}