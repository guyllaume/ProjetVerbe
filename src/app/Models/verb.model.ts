export interface Verb {
    conditionnel: {
        passe1reForme: ConjugationForms;
        passe2reForme: ConjugationForms;
        present: ConjugationForms;
    };
    imperatif: {
        passe: ImperativeForms;
        present: ImperativeForms;
    };
    indicatif: {
        futurAnterieur: ConjugationForms;
        futurSimple: ConjugationForms;
        imparfait: ConjugationForms;
        passeAnterieur: ConjugationForms;
        passeCompose: ConjugationForms;
        passeSimple: ConjugationForms;
        plusQueParfait: ConjugationForms;
        present: ConjugationForms;
    };
    infinitive: {
        passe: string;
        present: string;
    };
    participe: {
        passe: string;
        present: string;
    };
    subjonctif: {
        imparfait: ConjugationForms;
        passe: ConjugationForms;
        plusQueParfait: ConjugationForms;
        present: ConjugationForms;
    };
    verb: string;
    word: string;
    wordConjugateRule: string;
    wordConjugateWhichVerbModel: string;
    wordConjugateWithWhichVerb: string;
    wordVerbGroup: string;
    wordVerbType: string;
    fullDescription: string;
    id: string;
}
export interface ConjugationForms {
    HeSheIt: string;
    I: string;
    They: string;
    We: string;
    You: string;
    YouAll: string;
}

export interface ImperativeForms {
    First: string;
    Second: string;
    Third: string;
}