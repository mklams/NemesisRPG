import React from 'react';
import DiceRollResult from './DiceRollResult';
import { DicePool } from '../Models/Dice';
import {NemesisStatictic, NemesisStaticticName, CharacterStats} from '../Models/Statictics';
import CharacterStatistics from './Stat';

import { CharacterSkills, SkillWindow } from './Skill';
import styled from 'styled-components';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Clock from 'react-live-clock';
import { ToolbarMenu } from './Menu';

export default function Desktop() {
  // TODO: Franken state!
  const [stats, setStats] = React.useState(new CharacterStats());
  const [dicePool, setDicePool] = React.useState([] as number[]);
  const [diceWindowOpen, setDiceWindowOpen] = React.useState(false);
  

  function updateStat(updatedStat: NemesisStatictic){
    setStats(stats.UpdateStats(updatedStat));
  }

  function rollStat(stat: NemesisStatictic){
    const dicePool = new DicePool(stat.Value, 10);
    setDicePool(dicePool.RollDicePool());
  }

  function rollSkill(skillValue: number, statName: NemesisStaticticName){
    const numberOfDiceToRoll = stats.GetStatValue(statName) + skillValue;
    const dicePool = new DicePool(numberOfDiceToRoll, 10);
    setDicePool(dicePool.RollDicePool());
  }

  

  return (
    <div>
      <DesktopContainer>
        <Toolbar>
            <StartButton>
              <ToolbarMenu />
            </StartButton>
            <InfoArea title="Timezone is in US/Central">
              <Clock format={'HH:mm:ss'} ticking={true} timezone={'US/Central'} />
            </InfoArea>
        </Toolbar>
        <DesktopWindow>
          <WindowTitle>Statistics</WindowTitle>
          <CharacterStatistics updateStat={updateStat} rollStat={rollStat} stats={stats}/>
        </DesktopWindow>
        <DesktopWindow>
          <WindowTitle>Skills</WindowTitle>
          <SkillWindow rollSkill={rollSkill}/>
        </DesktopWindow>
        {DrawRollResultWindow()}
      </DesktopContainer>
      
    </div>
  );

  function DrawRollResultWindow(){
    if(dicePool.length > 0 || diceWindowOpen){
      return(
        <DesktopWindow>
          <WindowTitle>Roll Result</WindowTitle>
          <DiceRollResult rollResult={dicePool} />
        </DesktopWindow>
      );
    }
  }
}

const DesktopContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const DesktopWindow = styled.div`
  background-color: #B2B2B2;
  border: solid;
  margin: 5px;
  height: fit-content;
  margin-top: 70px;
`;

const WindowTitle = styled.h2`
    text-align: center;
    border-bottom: solid;
    margin-top: 0;
    background-color: blue;
    color: white;
    border-color: black;
  `;

const Toolbar = styled.header`
  height: 30px;
  width: 100%;
  background-color: #B2B2B2;
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: row;
`;

const StartButton = styled.div`
  width: 100px;
  text-align: center;
`;

const InfoArea = styled.div`
  right: 0px;
  position: absolute;
`;


