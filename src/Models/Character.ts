import { CharacterStats, NemesisStatictic } from "./Statictics";
import { BodySkills, NemesisSkill } from "./Skills";

export class NemesisCharacter {
    private Statistics: CharacterStats;
    private BodySkills: BodySkills;

    constructor() {
        this.Statistics = new CharacterStats();
        this.BodySkills = new BodySkills();
    }

    public GetStats(){
        return this.Statistics;
    }

    

    public UpdateStat(updatedStat: NemesisStatictic){
        this.Statistics.UpdateStats(updatedStat);
    }

    public GetBodySkills(){
        return this.BodySkills;
    }

    public UpdateBodySkills(updateBodySkills: NemesisSkill){
        this.UpdateBodySkills(updateBodySkills);
    }
}



