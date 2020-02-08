import { NemesisStaticticName } from "./Statictics";

export type BasicSkill ={
    Name: NemesisSkillName,
    Value: number
}

export type AdvancedSkill = {
    Name: NemesisSkillName,
    SpecialityNames: SpecialitySkill[],
}

export type SpecialitySkill = {SpecialityName: string, Value: number};

export type NemesisSkill = BasicSkill | AdvancedSkill;

export function isAdvancedSkill(skill: NemesisSkill): skill is AdvancedSkill{
    return (skill as AdvancedSkill).SpecialityNames !== undefined;
}

export enum NemesisSkillName{
    // Body Skills
    Athletics = "Athletics",
    Brawling = "Brawling",
    Endurance = "Endurance", 
    Health = "Health",
    MartialArts = "Martial Arts",
    MeleeWeapon = "Melee Weapon",
    Running = "Running",
    Swimming = "Swimming",
    Wrestling = "Wrestling",

    // Coordination Skills
    Acrobatics = "Acrobatics",
    Archery = "Archery",
    Catch = "Catch",
    Climbing = "Climbing",
    Dodge = "Dodge",
    Driving = "Driving",
    EscapeArtist = "Escape Artist",
    Firearms = "Firearms",
    Lockpick = "Lockpick",
    Pilot = "Pilot",
    PickPocket = "Pick Pocket",
    Sail = "Sail",
    Stealth = "Stealth",
    Throw = "Throw",

    // Sense Skills
    Hearing = "Hearing",
    Sight = "Sight",
    Smell = "Smell",
    Taste = "Taste",
    Touch = "Touch",
    Search = "Search",

    // Mind Skills
    Archaeology = "Archaeology",
    Anthropology = "Anthropology",
    ComputerHardware = "Computer Hardware",
    ComputerProgramming = "Computer Programming",
    Criminology = "Criminology",
    Cryptology = "Cryptology",
    Education = "Education",
    Electronics = "Electronics",
    FirstAid = "FirstAid",
    Forgery = "Forgery",
    Language = "Language",
    Mythos = "Mythos",
    Mechanic = "Mechanic",
    Medicine = "Medicine",
    NavigationLand = "Navigation Land",
    NavigationSea = "Navigation Sea",
    NavigationAir = "Navigation Air",
    Occult = "Occult",
    Psychiatry = "Psychiatry",
    Survival = "Survival",
    Tactics = "Tactics",

    // Command Skills
    Inspiration = "Inspiration",
    Intimidation = "Intimidation",
    Leadership = "Leadership",
    Performance = "Performance",
    Psychology = "Psychology",
    Seduction = "Seduction",

    // Empathy Skills
    Bluff = "Bluff",
    Counseling = "Counseling",
    Lie = "Lie",
    Meditation = "Meditation",
    Persuasion = "Persuasion", 
    Resist = "Resist",

    // Misc TODO: Maybe this belongs with sanity
    Equilibrium = "Equilibrium"
}

export interface INemesisSkill{
    BaseStat: NemesisStaticticName;
    GetSkills(): Map<NemesisSkillName,NemesisSkill>;
    UpdateSkill(skill: NemesisSkill): void;
}

export function NemesisSkillFactory(){
    const BodySkillNames = [NemesisSkillName.Athletics,
        NemesisSkillName.Brawling,
        NemesisSkillName.Endurance, 
        NemesisSkillName.Health,
        NemesisSkillName.MartialArts,
        NemesisSkillName.MeleeWeapon,
        NemesisSkillName.Running,
        NemesisSkillName.Swimming,
        NemesisSkillName.Wrestling]

    function createDefaultSkillMap(skillNames: NemesisSkillName[]): Map<NemesisSkillName,NemesisSkill>{
        var skillMap = new Map();
        skillNames.forEach(skillName => {
            skillMap.set(skillName,{Name: [skillName]});
        });

        return skillMap;
    }
}

class SkillBase{
    public readonly Skills: Map<NemesisSkillName,NemesisSkill>;

    public BaseStat: NemesisStaticticName;

    constructor(skills: Map<NemesisSkillName,NemesisSkill>, baseStatic: NemesisStaticticName){
        this.BaseStat = baseStatic;
        this.Skills = skills;
    }

    GetSkills(){
        return this.Skills;
    }

    // Future: This returns an entirely new object so that react state update works. Maybe use a library to manage this instead.
    UpdateSkill(skill: NemesisSkill){
        this.Skills.set(skill.Name, skill);

        return new SkillBase(this.Skills, this.BaseStat);
    }
}

export class BodySkills extends SkillBase implements INemesisSkill {
    constructor(previousBodySkills?: Map<NemesisSkillName,NemesisSkill>){
        const bodySkills = previousBodySkills ? previousBodySkills :
            new Map(
            [
                [NemesisSkillName.Athletics, {Name: NemesisSkillName.Athletics, Value: 0}],
                [NemesisSkillName.Brawling, {Name: NemesisSkillName.Brawling, Value: 0}],
                [NemesisSkillName.Endurance, {Name: NemesisSkillName.Endurance, Value: 0}],
                [NemesisSkillName.Health, {Name: NemesisSkillName.Health, Value: 0}],
                [NemesisSkillName.MartialArts, {Name: NemesisSkillName.MartialArts, Value: 0}],
                [NemesisSkillName.MeleeWeapon, {Name: NemesisSkillName.MeleeWeapon, SpecialityNames: [{SpecialityName: "", Value: 0}]}],
                [NemesisSkillName.Running, {Name: NemesisSkillName.Running, Value: 0}],
                [NemesisSkillName.Swimming, {Name: NemesisSkillName.Swimming, Value: 0}],
                [NemesisSkillName.Wrestling, {Name: NemesisSkillName.Wrestling, Value: 0}],
            ]);
        super(bodySkills, NemesisStaticticName.Body);
    }
}

export class CoordinationSkills extends SkillBase implements INemesisSkill{
    constructor(previousCoordinationSkills?: Map<NemesisSkillName,NemesisSkill>){
        const coordinationSkills = previousCoordinationSkills ? previousCoordinationSkills :
            new Map(
            [
                [NemesisSkillName.Acrobatics, {Name: NemesisSkillName.Acrobatics, Value: 0}],
                [NemesisSkillName.Archery, {Name: NemesisSkillName.Archery, Value: 0}],
                [NemesisSkillName.Catch, {Name: NemesisSkillName.Catch, Value: 0}],
                [NemesisSkillName.Climbing, {Name: NemesisSkillName.Climbing, Value: 0}],
                [NemesisSkillName.Dodge, {Name: NemesisSkillName.Dodge, Value: 0}],
                [NemesisSkillName.Driving, {Name: NemesisSkillName.Driving, Value: 0}],
                [NemesisSkillName.EscapeArtist, {Name: NemesisSkillName.EscapeArtist, Value: 0}],
                [NemesisSkillName.Firearms, {Name: NemesisSkillName.Firearms, Value: 0}],
                [NemesisSkillName.Lockpick, {Name: NemesisSkillName.Lockpick, Value: 0}],
                [NemesisSkillName.Pilot, {Name: NemesisSkillName.Pilot, Value: 0}],
                [NemesisSkillName.PickPocket, {Name: NemesisSkillName.PickPocket, Value: 0}],
                [NemesisSkillName.Sail, {Name: NemesisSkillName.Sail, Value: 0}],
                [NemesisSkillName.Stealth, {Name: NemesisSkillName.Stealth, Value: 0}],
                [NemesisSkillName.Throw, {Name: NemesisSkillName.Throw, Value: 0}],
            ]);
        super(coordinationSkills, NemesisStaticticName.Coordination);
    }
}

export class SenseSkills extends SkillBase implements INemesisSkill {
    constructor(previousSenseSkills?: Map<NemesisSkillName,NemesisSkill>){
        const senseSkills = previousSenseSkills ? previousSenseSkills :
            new Map(
            [
                [NemesisSkillName.Hearing, {Name: NemesisSkillName.Hearing, Value: 0}],
                [NemesisSkillName.Sight, {Name: NemesisSkillName.Sight, Value: 0}],
                [NemesisSkillName.Smell, {Name: NemesisSkillName.Smell, Value: 0}],
                [NemesisSkillName.Taste, {Name: NemesisSkillName.Taste, Value: 0}],
                [NemesisSkillName.Touch, {Name: NemesisSkillName.Touch, Value: 0}],
                [NemesisSkillName.Search, {Name: NemesisSkillName.Search, Value: 0}],
            ]);
            super(senseSkills, NemesisStaticticName.Sense);
    }
}

export class MindSkills extends SkillBase implements INemesisSkill{
    constructor(previousMindSkills?: Map<NemesisSkillName,NemesisSkill>){
        const mindSkills = previousMindSkills ? previousMindSkills :
            new Map(
            [
                [NemesisSkillName.Archaeology, {Name: NemesisSkillName.Archaeology, Value: 0}],
                [NemesisSkillName.Anthropology, {Name: NemesisSkillName.Anthropology, Value: 0}],
                [NemesisSkillName.ComputerHardware, {Name: NemesisSkillName.ComputerHardware, Value: 0}],
                [NemesisSkillName.ComputerProgramming, {Name: NemesisSkillName.ComputerProgramming, Value: 0}],
                [NemesisSkillName.Criminology, {Name: NemesisSkillName.Criminology, Value: 0}],
                [NemesisSkillName.Cryptology, {Name: NemesisSkillName.Cryptology, Value: 0}],
                [NemesisSkillName.Education, {Name: NemesisSkillName.Education, Value: 0}],
                [NemesisSkillName.Electronics, {Name: NemesisSkillName.Electronics, Value: 0}],
                [NemesisSkillName.FirstAid, {Name: NemesisSkillName.FirstAid, Value: 0}],
                [NemesisSkillName.Forgery, {Name: NemesisSkillName.Forgery, Value: 0}],
                [NemesisSkillName.Mythos, {Name: NemesisSkillName.Mythos, Value: 0}],
                [NemesisSkillName.Mechanic, {Name: NemesisSkillName.Mechanic, Value: 0}],
                [NemesisSkillName.Medicine, {Name: NemesisSkillName.Medicine, Value: 0}],
                [NemesisSkillName.NavigationLand, {Name: NemesisSkillName.NavigationLand, Value: 0}],
                [NemesisSkillName.NavigationSea, {Name: NemesisSkillName.NavigationSea, Value: 0}],
                [NemesisSkillName.NavigationAir, {Name: NemesisSkillName.NavigationAir, Value: 0}],
                [NemesisSkillName.Occult, {Name: NemesisSkillName.Occult, Value: 0}],
                [NemesisSkillName.Psychiatry, {Name: NemesisSkillName.Psychiatry, Value: 0}],
                [NemesisSkillName.Survival, {Name: NemesisSkillName.Survival, Value: 0}],
                [NemesisSkillName.Tactics, {Name: NemesisSkillName.Tactics, Value: 0}],
            ]);
        super(mindSkills, NemesisStaticticName.Mind);
    }
}

export class ComandSkills extends SkillBase implements INemesisSkill{
    constructor(previousComandSkills?: Map<NemesisSkillName,NemesisSkill>){
        const comandSkills = previousComandSkills ? previousComandSkills :
            new Map(
            [
                [NemesisSkillName.Inspiration, {Name: NemesisSkillName.Inspiration, Value: 0}],
                [NemesisSkillName.Intimidation, {Name: NemesisSkillName.Intimidation, Value: 0}],
                [NemesisSkillName.Leadership, {Name: NemesisSkillName.Leadership, Value: 0}],
                [NemesisSkillName.Performance, {Name: NemesisSkillName.Performance, Value: 0}],
                [NemesisSkillName.Psychology, {Name: NemesisSkillName.Psychology, Value: 0}],
                [NemesisSkillName.Seduction, {Name: NemesisSkillName.Seduction, Value: 0}],
            ]);
            super(comandSkills, NemesisStaticticName.Command);
    }
}

export class EmpathySkills extends SkillBase implements INemesisSkill{
    constructor(previousEmpathySkills?: Map<NemesisSkillName,NemesisSkill>){
        const empathySkills = previousEmpathySkills ? previousEmpathySkills :
            new Map(
            [
                [NemesisSkillName.Bluff, {Name: NemesisSkillName.Bluff, Value: 0}],
                [NemesisSkillName.Counseling, {Name: NemesisSkillName.Counseling, Value: 0}],
                [NemesisSkillName.Lie, {Name: NemesisSkillName.Lie, Value: 0}],
                [NemesisSkillName.Meditation, {Name: NemesisSkillName.Meditation, Value: 0}],
                [NemesisSkillName.Persuasion, {Name: NemesisSkillName.Persuasion, Value: 0}],
                [NemesisSkillName.Resist, {Name: NemesisSkillName.Resist, Value: 0}],
            ]);
            super(empathySkills, NemesisStaticticName.Empathy);
    }
}