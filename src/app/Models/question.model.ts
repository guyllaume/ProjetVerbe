import { stringify } from "querystring";
import { Verb } from "./verb.model";

export class Question{
    verb: Verb;
    difficulty: string;
    question: string;
    possibleAnswers : string[];
    answer: string;

    constructor(questionNumber: number, verb: Verb){
        this.verb = verb;
        this.question = "";
        this.possibleAnswers = [];
        this.answer = "";
        this.difficulty = "";
        let Split1;
        let Split2;
        let Split3;
        let Split4;
        switch(questionNumber){
            case 1:
                this.question = `Quel auxiliaire accompagne le verbe ${verb.verb}?`;
                this.difficulty = "facile";
                this.possibleAnswers = ["avoir", "être"];
                verb.wordConjugateWithWhichVerb.endsWith("AVOIR") ?
                    this.answer = this.possibleAnswers[0] :
                    this.answer = this.possibleAnswers[1];
                break;
            case 2:
                this.question = 'A quel groupe appartient le verbe ' + verb.verb + '?';
                this.difficulty = "facile";
                this.possibleAnswers = ["1er groupe", "2eme groupe", "3eme groupe"];
                verb.wordVerbGroup.includes("1") ? this.answer = this.possibleAnswers[0] :
                (verb.wordVerbGroup.includes("2") ? this.answer = this.possibleAnswers[1] :
                 this.answer = this.possibleAnswers[2]);
                break;
            case 3:
                this.question = "Comment conjugez-vous le verbe à la première personne du singulier à l'indicatif imparfait?";
                this.difficulty = "facile";
                Split1 = this.verb.indicatif.present.I.split(/[\s']+/);
                Split2 = this.verb.indicatif.imparfait.I.split(/[\s']+/);
                Split3 = this.verb.indicatif.passeSimple.I.split(/[\s']+/);
                Split4 = this.verb.indicatif.futurSimple.I.split(/[\s']+/);
                this.possibleAnswers = [
                    Split1[Split1.length-1],
                    Split2[Split2.length-1],
                    Split3[Split3.length-1],
                    Split4[Split4.length-1],
                ];
                this.answer = this.possibleAnswers[1];
                break;
            case 4:
                this.question = "Comment conjugez-vous le verbe à la troisième personne du pluriel à l'indicatif présent?";
                this.difficulty = "facile";
                Split1 = this.verb.subjonctif.imparfait.They.split(/[\s']+/);
                Split2 = this.verb.conditionnel.passe1reForme.They.split(/[\s']+/);
                Split3 = this.verb.indicatif.present.They.split(/[\s']+/);
                Split4 = this.verb.indicatif.futurSimple.They.split(/[\s']+/);
                this.possibleAnswers = [
                    Split1[Split1.length-1],
                    Split2[Split2.length-1],
                    Split3[Split3.length-1],
                    Split4[Split4.length-1],
                ];
                this.answer = this.possibleAnswers[2];
                break;
            case 5:
                this.question = "Comment conjugez-vous le verbe à la deuxieme personne du singulier au conditionnel présent?";
                this.difficulty = "intermédiaire";
                Split1 = this.verb.conditionnel.present.You.split(/[\s']+/);
                Split2 = this.verb.conditionnel.passe1reForme.You.split(/[\s']+/);
                Split3 = this.verb.indicatif.imparfait.You.split(/[\s']+/);
                Split4 = this.verb.indicatif.futurSimple.You.split(/[\s']+/);
                this.possibleAnswers = [
                    Split1[Split1.length-1],
                    Split2[Split2.length-1],
                    Split3[Split3.length-1],
                    Split4[Split4.length-1],
                ];
                this.answer = this.possibleAnswers[0];
                break;
            case 6:
                this.question = "Comment conjugez-vous le verbe à la troisieme personne du singulier au passé composé?";
                this.difficulty = "intermédiaire";
                Split1 = this.verb.indicatif.passeAnterieur.You.split(/[\s']+/);
                Split2 = this.verb.conditionnel.passe1reForme.You.split(/[\s']+/);
                Split3 = this.verb.indicatif.plusQueParfait.You.split(/[\s']+/);
                Split4 = this.verb.indicatif.passeCompose.You.split(/[\s']+/);
                this.possibleAnswers = [
                    Split1[Split1.length-2] + " " + Split1[Split1.length-1],
                    Split2[Split2.length-2] + " " + Split2[Split2.length-1],
                    Split3[Split3.length-2] + " " + Split3[Split3.length-1],
                    Split4[Split4.length-2] + " " + Split4[Split4.length-1],
                ];
                this.answer = this.possibleAnswers[3];
                break;
            case 7:
                this.question = "Comment conjugez-vous le verbe à la première personne du pluriel au futur simple?";
                this.difficulty = "intermédiaire";
                Split1 = this.verb.indicatif.present.We.split(/[\s']+/);
                Split2 = this.verb.conditionnel.present.We.split(/[\s']+/);
                Split3 = this.verb.indicatif.futurSimple.We.split(/[\s']+/);
                Split4 = this.verb.indicatif.present.HeSheIt.split(/[\s']+/);
                this.possibleAnswers = [
                    Split1[Split1.length-1],
                    Split2[Split2.length-1],
                    Split3[Split3.length-1],
                    Split4[Split4.length-1],
                ];
                this.answer = this.possibleAnswers[2];
                break;
            case 8:
                this.question = "Comment conjugez-vous le verbe à la première forme de l'impératif passé?";
                this.difficulty = "difficile";
                Split1 = this.verb.imperatif.passe.Second.split(/[\s']+/);
                Split2 = this.verb.indicatif.futurAnterieur.I.split(/[\s']+/);
                Split3 = this.verb.imperatif.passe.First.split(/[\s']+/);
                Split4 = this.verb.imperatif.passe.Third.split(/[\s']+/);
                this.possibleAnswers = [
                    Split1[Split1.length-2] + " " + Split1[Split1.length-1],
                    Split2[Split2.length-2] + " " + Split2[Split2.length-1],
                    Split3[Split3.length-2] + " " + Split3[Split3.length-1],
                    Split4[Split4.length-2] + " " + Split4[Split4.length-1],
                ];
                this.answer = this.possibleAnswers[0];
                break;
            case 9:
                this.question = "Comment conjugez-vous le verbe à la deuxième forme du pluriel de l'indicatif passé simple?";
                this.difficulty = "difficile";
                Split1 = this.verb.indicatif.present.YouAll.split(/[\s']+/);
                Split2 = this.verb.indicatif.futurSimple.YouAll.split(/[\s']+/);
                Split3 = this.verb.indicatif.imparfait.YouAll.split(/[\s']+/);
                Split4 = this.verb.indicatif.passeSimple.YouAll.split(/[\s']+/);
                this.possibleAnswers = [
                    Split1[Split1.length-1],
                    Split2[Split2.length-1],
                    Split3[Split3.length-1],
                    Split4[Split4.length-1],
                ];
                this.answer = this.possibleAnswers[3];
                break;
            case 10:
                this.question = "Comment conjugez-vous le verbe à la troisième forme du pluriel du subjonctif plus-que-parfait?";
                this.difficulty = "difficile";
                Split1 = this.verb.indicatif.passeAnterieur.They.split(/[\s']+/);
                Split2 = this.verb.subjonctif.plusQueParfait.YouAll.split(/[\s']+/);
                Split3 = this.verb.indicatif.passeCompose.YouAll.split(/[\s']+/);
                Split4 = this.verb.subjonctif.passe.YouAll.split(/[\s']+/);
                this.possibleAnswers = [
                    Split1[Split1.length-2] + " " + Split1[Split1.length-1],
                    Split2[Split2.length-2] + " " + Split2[Split2.length-1],
                    Split3[Split3.length-2] + " " + Split3[Split3.length-1],
                    Split4[Split4.length-2] + " " + Split4[Split4.length-1],
                ];
                this.answer = this.possibleAnswers[1];
                break;
        }
    }
    checkAnswer(answer: string): boolean{
       return this.answer == answer;
    }

}