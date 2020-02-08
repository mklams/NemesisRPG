import * as React from 'react';
import { NemesisStatictic, CharacterStats } from '../Models/Statictics'
import { isNumber } from 'util';
import styled from 'styled-components';

interface ICharacterStatisticsProps{
    updateStat(stat: NemesisStatictic): void;
    rollStat(stat: NemesisStatictic): void;
    stats: CharacterStats;
}

export default function CharacterStatistics(props: ICharacterStatisticsProps){
    function updateStat(stat: NemesisStatictic){
        props.updateStat(stat);
    }
    
    function drawStatsSection(stats: CharacterStats) {
        let statsSection: JSX.Element[] = [];
        
        for(let [statName, statValue] of stats.GetStats()){
            const gameStat: NemesisStatictic = {Name: statName, Value: statValue};
            statsSection.push(
                <StatBox updateStat={updateStat} rollDice={props.rollStat} stat={gameStat} key={gameStat.Name}/>
            )
        }

        return statsSection;
    }

    return(
        <div>
            {drawStatsSection(props.stats)}
        </div>
    );
}

interface IStatBoxProps{
    stat: NemesisStatictic;
    updateStat(stat: NemesisStatictic): void;
    rollDice(stat: NemesisStatictic): void;
}

function StatBox(props: IStatBoxProps){
    // Create a Title component that'll render an <h1> tag with some styles
    
    
    function onValueChange(event: any){
        const updatedValue = parseInt(event.target.value, 10);
        if(isNumber(updatedValue)){
            const updatedStat: NemesisStatictic = {Name: props.stat.Name, Value: updatedValue}
            props.updateStat(updatedStat);
        }
    };

    function onNameClick(){
        props.rollDice(props.stat);
    }
    
    return (
        <Box>
            <StatName onClick={onNameClick}>{[props.stat.Name]}</StatName>
            <StatValue type="number"
                    placeholder="0"
                    value={props.stat.Value}
                    onChange={onValueChange}/>
        </Box>
    );
}

const StatValue = styled.input`
        max-width: 25px;
`;
const StatName = styled.span`
    display: inline-block;
    min-width: 100px;
`;

const Box = styled.div`
    margin: 10px;
`;