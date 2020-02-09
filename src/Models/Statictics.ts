export enum NemesisStaticticName {
    Body = "Body",
    Coordination = "Coordination",
    Sense = "Sense", 
    Mind = "Mind", 
    Command = "Command", 
    Empathy = "Empathy"
}

export type NemesisStatictic = {
    Name: NemesisStaticticName,
    Value: number
}

export class CharacterStats{
    private stats: Map<NemesisStaticticName,number>

    constructor(previoustStats?: Map<NemesisStaticticName,number>){
        this.stats = previoustStats ? previoustStats:
        new Map(
        [
            [NemesisStaticticName.Body, 0],
            [NemesisStaticticName.Coordination, 0],
            [NemesisStaticticName.Sense, 0],
            [NemesisStaticticName.Mind, 0],
            [NemesisStaticticName.Command, 0],
            [NemesisStaticticName.Empathy, 0],
        ]);
    }

    GetStats(){
        return this.stats;
    }

    GetStatValue(statName: NemesisStaticticName){
        return this.stats.get(statName) || 0;
    }

    // TODO: Since this is a state change, it returns a new object. Maybe use an immutability library or framework like immbl or Redux
    UpdateStats(gameStat: NemesisStatictic): CharacterStats{
        this.stats.set(gameStat.Name, gameStat.Value);
        return new CharacterStats(this.stats);
    }
}