import * as React from 'react';
import styled from 'styled-components';

interface IDiceRollResultProps{
    rollResult: number[];
}

export default function DiceRollResult(props: IDiceRollResultProps) {    
    
    function drawRoll(){
        //const orderedResults = props.rollResult.slice().sort((a, b) => a - b);

        // TODO: Figure out how to get this to return an array
        const groupedResults = props.rollResult.reduce((rollGrouper, rollValue) => (rollGrouper[rollValue] = (rollGrouper[rollValue] || 0) + 1, rollGrouper), Object.create(null));

        // TODO: Figure out how to do this with mutating
        var rollResultsUI: JSX.Element[] = [];
        for (const rollResult in groupedResults) {
                const resultCount = groupedResults[rollResult];
                rollResultsUI.push(<DiceResult result={rollResult} resultCount={resultCount} key={rollResult}></DiceResult>)
        }

        return rollResultsUI;
    }
    
    return <div>{drawRoll()}</div>;
}

interface IDiceResultProps{
    result: string;
    resultCount: number
}

function DiceResult(props:IDiceResultProps){
    function drawGroupedDice(){
        var diceUI: JSX.Element[] = []
        for(var cnt = 0; cnt < props.resultCount; cnt++){
            diceUI.push(
                <DiceFace key={cnt}>
                    {props.result}
                </DiceFace>
            );
        }

        return diceUI;
    }
    
    return (
        <DiceContainer>
            {drawGroupedDice()}
        </DiceContainer>
    );
}

const DiceContainer = styled.div`
    display: flex;
    flex-direction:row;
`;

const DiceFace = styled.div`
        text-align: center;
        border-style: solid;
        width: 20px;
        height: 20px;
        margin: 5px;
        background-color:white;
`;