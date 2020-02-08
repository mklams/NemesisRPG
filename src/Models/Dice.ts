export class Dice{
    private numberOfSides: number
    
    constructor(sides:number){
        this.numberOfSides = sides;
    }

    public RollDice(){
        return Math.floor(Math.random() * Math.floor(this.numberOfSides)) + 1;
    }
}

export class DicePool{
    private numberOfDice: number;
    private dice: Dice; // Future: For now only one dice is needed since all dice in the pool are the same. In the future may need to store multiple types of dice

    constructor(numberOfDice:number, numberOfSides:number){
        this.numberOfDice = numberOfDice;
        this.dice = new Dice(numberOfSides);
    }

    public RollDicePool(){
        let results = [];
        for(let i = 0; i < this.numberOfDice; i++){
            results.push(this.dice.RollDice());
        }

        return results;
    }
}