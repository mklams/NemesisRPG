import * as React from 'react';
import styled from 'styled-components';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { NemesisSkill, AdvancedSkill, BasicSkill, isAdvancedSkill, INemesisSkill, NemesisSkillName, SpecialitySkill } from '../Models/Skills';
import { BodySkills, EmpathySkills, CoordinationSkills, SenseSkills, MindSkills, ComandSkills } from '../Models/Skills';
import { NemesisStaticticName } from '../Models/Statictics';
import { isNumber } from 'util';


interface ISkillWindowProps{
    rollSkill(skillValue: number, statName: NemesisStaticticName):void;
}

export function SkillWindow(props: ISkillWindowProps){
    const [bodySkills, setBodySkills] = React.useState(new BodySkills());
    const [coordinationSkills, setCoordinationSkills] = React.useState(new CoordinationSkills());
    const [senseSkills, setSenseSkills] = React.useState(new SenseSkills());
    const [mindSkills, setMindSkills] = React.useState(new MindSkills());
    const [comandSkills, setComandSkills] = React.useState(new ComandSkills());
    const [empathySkills, setEmpathySkill] = React.useState(new EmpathySkills());
    const [openTab, setOpenTab] = React.useState(0);

    function updateBodySkill(skill: NemesisSkill){ 
      setBodySkills(bodySkills.UpdateSkill(skill));
    }
  
    function updateCoordinationSkill(skill: NemesisSkill){
      setCoordinationSkills(coordinationSkills.UpdateSkill(skill));
    }
  
    function updateSenseSkill(skill: NemesisSkill){ 
      setSenseSkills(senseSkills.UpdateSkill(skill));
    }
  
    function updateMindSkill(skill: NemesisSkill){ 
      setMindSkills(mindSkills.UpdateSkill(skill));
    }
  
    function updateComandSkill(skill: NemesisSkill){ 
      setComandSkills(comandSkills.UpdateSkill(skill));
    }
  
    function updateEmpathySkill(skill: NemesisSkill){
      setEmpathySkill(empathySkills.UpdateSkill(skill));
    }

    function onTabSelect(index: number, lastIndex: number, event: Event){
      setOpenTab(index);
    }

    return(
        <Tabs defaultIndex={openTab} onSelect={onTabSelect}>
            <TabList>
              <Tab>{NemesisStaticticName.Body}</Tab>
              <Tab>{NemesisStaticticName.Coordination}</Tab>
              <Tab>{NemesisStaticticName.Sense}</Tab>
              <Tab>{NemesisStaticticName.Mind}</Tab>
              <Tab>{NemesisStaticticName.Command}</Tab>
              <Tab>{NemesisStaticticName.Empathy}</Tab>
            </TabList>
    
            <TabPanel>
              <CharacterSkills skills={bodySkills} rollSkill={props.rollSkill} updateSkill={updateBodySkill}/>
            </TabPanel>
            <TabPanel>
              <CharacterSkills skills={coordinationSkills} rollSkill={props.rollSkill} updateSkill={updateCoordinationSkill}/>
            </TabPanel>
            <TabPanel>
              <CharacterSkills skills={senseSkills} rollSkill={props.rollSkill} updateSkill={updateSenseSkill}/>
            </TabPanel>
            <TabPanel>
              <CharacterSkills skills={mindSkills} rollSkill={props.rollSkill} updateSkill={updateMindSkill}/>
            </TabPanel>
            <TabPanel>
              <CharacterSkills skills={comandSkills} rollSkill={props.rollSkill} updateSkill={updateComandSkill}/>
            </TabPanel>
            <TabPanel>
            <CharacterSkills skills={empathySkills} rollSkill={props.rollSkill} updateSkill={updateEmpathySkill}/>
            </TabPanel>
        </Tabs>
    );
}

interface ISkillProps{
    skills: INemesisSkill;
    rollSkill(skillValue: number, statName: NemesisStaticticName):void;
    updateSkill(skill: NemesisSkill): void;
}

export function CharacterSkills(props: ISkillProps){
    function renderSkills(skills: Map<NemesisSkillName,NemesisSkill>){
        var skillsUI: JSX.Element[] = [];

        skills.forEach(skill => {
            if(isAdvancedSkill(skill)) {skillsUI.push(renderAdvancedSkill(skill))}
            else {skillsUI.push(renderBasicSkill(skill))}
        });

        

        return skillsUI;
    }
    
    function rollSkill(skillValue: number){
        props.rollSkill(skillValue, props.skills.BaseStat);
    }

    function renderBasicSkill(skill: BasicSkill){
        return <BasicSkillBox skill={skill} skillNameClicked={rollSkill} updateSkill={props.updateSkill} key={skill.Name}/>
    }

    function renderAdvancedSkill(skill: AdvancedSkill){
        return <AdvancedSkillBox skill={skill} key={skill.Name}/>
    }

    return(
        <SkillSection>
            {renderSkills(props.skills.GetSkills())}
        </SkillSection>
    )
}

const SkillSection = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    max-height: 400px;
`;

interface IBasicSkillBoxProps{
    skill: BasicSkill;
    skillNameClicked(skillValue: number):void;
    updateSkill(skill: NemesisSkill): void;
}

function BasicSkillBox(props: IBasicSkillBoxProps){
    function onSkillClick(){
        props.skillNameClicked(props.skill.Value);
    }

    function onValueChange(event: any){
        const updatedValue = parseInt(event.target.value, 10);
         if(isNumber(updatedValue)){
            var updateSkill = props.skill;
             updateSkill.Value = updatedValue;
             props.updateSkill(updateSkill);
        }
    }
    
    return (
        <SkillBox key={props.skill.Name}>
            <SkillName onClick={onSkillClick}>{props.skill.Name}</SkillName>
            <SkillValue type="number"
                    placeholder="0"
                    value={props.skill.Value}
                    onChange={onValueChange} />
        </SkillBox>
    );
}

const SkillValue = styled.input`
    max-width: 25px;
`;

const SkillName = styled.span`
    display: inline-block;
    min-width: 180px;
`;

const SkillBox = styled.div`
    margin:10px;
`;

interface IAdvancedSkillBoxProps{
    skill: AdvancedSkill
}

function AdvancedSkillBox(props: IAdvancedSkillBoxProps){
    function onSpecialityChange(event: any){

    }

    function renderSpeciality(skillName: NemesisSkillName, speciality: SpecialitySkill){
        return (
            <SkillValue type="number"
                placeholder="0"
                value={speciality.Value}
                onChange={onSpecialityChange}
                key={speciality.SpecialityName}/>
        );
    }

    return(
        <SkillBox>
            <SkillName>{props.skill.Name}</SkillName>
            {props.skill.SpecialityNames.map(speciality => renderSpeciality(props.skill.Name, speciality))}
        </SkillBox>
    );
}