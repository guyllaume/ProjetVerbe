import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Verb } from '../Models/verb.model';

@Injectable({
  providedIn: 'root'
})
export class VerbService {

  private verbSelected: Verb = {} as Verb;
  private apiUrl = "https://seal-app-v5cj7.ondigitalocean.app/v0/verbs/";
  constructor(private http: HttpClient) { }
  
  public getRandomVerbs(quantity: number, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'x-access-token': token
    });
    return this.http.post(`${this.apiUrl}random`, {quantity: quantity} , {headers});
  }
  public getVerb(verb: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'x-access-token': token
    });
    return this.http.post(`${this.apiUrl}`, {verb: verb} , {headers})
    .pipe(
      map(apiResponse => mapApiResponseToVerb(apiResponse))
    );
  }
  public addFavorite(verb: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'x-access-token': token
    });
    return this.http.post(`${this.apiUrl}favorites`, {verb: verb} , {headers});
  }
  public getFavorite(id: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'x-access-token': token
    });
    return this.http.get(`${this.apiUrl}favorites/${id}`, {headers})
    .pipe(
      map(apiResponse => mapApiResponseToVerb(apiResponse))
    );
  }
  public getAllFavorite(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'x-access-token': token
    });
    return this.http.get(`${this.apiUrl}favorites/all`, {headers});
  }
  public deleteFavorite(id: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'x-access-token': token
    });
    return this.http.delete(`${this.apiUrl}favorites/${id}`, {headers});
  }

  public setVerbSelected(verb: Verb){
    this.verbSelected = verb;
  }
  public getVerbSelected(){
    return this.verbSelected;
  }
}
function mapApiResponseToVerb(apiResponse: any): Verb {
  return {
      conditionnel: {
          passe1reForme: {
              HeSheIt: apiResponse.verb.conditionnel.passe1reForme?.conditionnelPasse1reFormeHeSheIt,
              I: apiResponse.verb.conditionnel.passe1reForme?.conditionnelPasse1reFormeI,
              They: apiResponse.verb.conditionnel.passe1reForme?.conditionnelPasse1reFormeThey,
              We: apiResponse.verb.conditionnel.passe1reForme?.conditionnelPasse1reFormeWe,
              You: apiResponse.verb.conditionnel.passe1reForme?.conditionnelPasse1reFormeYou,
              YouAll: apiResponse.verb.conditionnel.passe1reForme?.conditionnelPasse1reFormeYouAll,
          },
          passe2reForme: {
              HeSheIt: apiResponse.verb.conditionnel.passe2eForme?.conditionnelPasse2eFormeHeSheIt,
              I: apiResponse.verb.conditionnel.passe2eForme?.conditionnelPasse2eFormeI,
              They: apiResponse.verb.conditionnel.passe2eForme?.conditionnelPasse2eFormeThey,
              We: apiResponse.verb.conditionnel.passe2eForme?.conditionnelPasse2eFormeWe,
              You: apiResponse.verb.conditionnel.passe2eForme?.conditionnelPasse2eFormeYou,
              YouAll: apiResponse.verb.conditionnel.passe2eForme?.conditionnelPasse2eFormeYouAll,
          },
          present: {
              HeSheIt: apiResponse.verb.conditionnel.present?.conditionnelPresentHeSheIt,
              I: apiResponse.verb.conditionnel.present?.conditionnelPresentI,
              They: apiResponse.verb.conditionnel.present?.conditionnelPresentThey,
              We: apiResponse.verb.conditionnel.present?.conditionnelPresentWe,
              You: apiResponse.verb.conditionnel.present?.conditionnelPresentYou,
              YouAll: apiResponse.verb.conditionnel.present?.conditionnelPresentYouAll,
          }
      },
      imperatif: {
          passe: {
              First: apiResponse.verb.imperatif.passe?.imperatifPasseFirst,
              Second: apiResponse.verb.imperatif.passe?.imperatifPasseSecond,
              Third: apiResponse.verb.imperatif.passe?.imperatifPasseThird,
          },
          present: {
              First: apiResponse.verb.imperatif.present?.imperatifPresentFirst,
              Second: apiResponse.verb.imperatif.present?.imperatifPresentSecond,
              Third: apiResponse.verb.imperatif.present?.imperatifPresentThird,
          }
      },
      indicatif: {
          futurAnterieur: {
              HeSheIt: apiResponse.verb.indicatif.futurAnterieur?.indicatifFuturAnterieurHeSheIt,
              I: apiResponse.verb.indicatif.futurAnterieur?.indicatifFuturAnterieurI,
              They: apiResponse.verb.indicatif.futurAnterieur?.indicatifFuturAnterieurThey,
              We: apiResponse.verb.indicatif.futurAnterieur?.indicatifFuturAnterieurWe,
              You: apiResponse.verb.indicatif.futurAnterieur?.indicatifFuturAnterieurYou,
              YouAll: apiResponse.verb.indicatif.futurAnterieur?.indicatifFuturAnterieurYouAll,
          },
          futurSimple: {
              HeSheIt: apiResponse.verb.indicatif.futurSimple?.indicatifFuturSimpleHeSheIt,
              I: apiResponse.verb.indicatif.futurSimple?.indicatifFuturSimpleI,
              They: apiResponse.verb.indicatif.futurSimple?.indicatifFuturSimpleThey,
              We: apiResponse.verb.indicatif.futurSimple?.indicatifFuturSimpleWe,
              You: apiResponse.verb.indicatif.futurSimple?.indicatifFuturSimpleYou,
              YouAll: apiResponse.verb.indicatif.futurSimple?.indicatifFuturSimpleYouAll,
          },
          imparfait: {
              HeSheIt: apiResponse.verb.indicatif.imparfait?.indicatifImparfaitHeSheIt,
              I: apiResponse.verb.indicatif.imparfait?.indicatifImparfaitI,
              They: apiResponse.verb.indicatif.imparfait?.indicatifImparfaitThey,
              We: apiResponse.verb.indicatif.imparfait?.indicatifImparfaitWe,
              You: apiResponse.verb.indicatif.imparfait?.indicatifImparfaitYou,
              YouAll: apiResponse.verb.indicatif.imparfait?.indicatifImparfaitYouAll,
          },
          passeAnterieur: {
              HeSheIt: apiResponse.verb.indicatif.passeAnterieur?.indicatifPasseAnterieurHeSheIt,
              I: apiResponse.verb.indicatif.passeAnterieur?.indicatifPasseAnterieurI,
              They: apiResponse.verb.indicatif.passeAnterieur?.indicatifPasseAnterieurThey,
              We: apiResponse.verb.indicatif.passeAnterieur?.indicatifPasseAnterieurWe,
              You: apiResponse.verb.indicatif.passeAnterieur?.indicatifPasseAnterieurYou,
              YouAll: apiResponse.verb.indicatif.passeAnterieur?.indicatifPasseAnterieurYouAll,
          },
          passeCompose: {
              HeSheIt: apiResponse.verb.indicatif.passeCompose?.indicatifPasseComposeHeSheIt,
              I: apiResponse.verb.indicatif.passeCompose?.indicatifPasseComposeI,
              They: apiResponse.verb.indicatif.passeCompose?.indicatifPasseComposeThey,
              We: apiResponse.verb.indicatif.passeCompose?.indicatifPasseComposeWe,
              You: apiResponse.verb.indicatif.passeCompose?.indicatifPasseComposeYou,
              YouAll: apiResponse.verb.indicatif.passeCompose?.indicatifPasseComposeYouAll,
          },
          passeSimple: {
              HeSheIt: apiResponse.verb.indicatif.passeSimple?.indicatifPasseSimpleHeSheIt,
              I: apiResponse.verb.indicatif.passeSimple?.indicatifPasseSimpleI,
              They: apiResponse.verb.indicatif.passeSimple?.indicatifPasseSimpleThey,
              We: apiResponse.verb.indicatif.passeSimple?.indicatifPasseSimpleWe,
              You: apiResponse.verb.indicatif.passeSimple?.indicatifPasseSimpleYou,
              YouAll: apiResponse.verb.indicatif.passeSimple?.indicatifPasseSimpleYouAll,
          },
          plusQueParfait: {
              HeSheIt: apiResponse.verb.indicatif.plusQueParfait?.indicatifPlusQueParfaitHeSheIt,
              I: apiResponse.verb.indicatif.plusQueParfait?.indicatifPlusQueParfaitI,
              They: apiResponse.verb.indicatif.plusQueParfait?.indicatifPlusQueParfaitThey,
              We: apiResponse.verb.indicatif.plusQueParfait?.indicatifPlusQueParfaitWe,
              You: apiResponse.verb.indicatif.plusQueParfait?.indicatifPlusQueParfaitYou,
              YouAll: apiResponse.verb.indicatif.plusQueParfait?.indicatifPlusQueParfaitYouAll,
          },
          present: {
              HeSheIt: apiResponse.verb.indicatif.present?.indicatifPresentHeSheIt,
              I: apiResponse.verb.indicatif.present?.indicatifPresentI,
              They: apiResponse.verb.indicatif.present?.indicatifPresentThey,
              We: apiResponse.verb.indicatif.present?.indicatifPresentWe,
              You: apiResponse.verb.indicatif.present?.indicatifPresentYou,
              YouAll: apiResponse.verb.indicatif.present?.indicatifPresentYouAll,
          }
      },
      infinitive: {
          passe: apiResponse.verb.infinitive?.passe,
          present: apiResponse.verb.infinitive?.present
      },
      participe: {
          passe: apiResponse.verb.participe?.passe,
          present: apiResponse.verb.participe?.present
      },
      subjonctif: {
          passe: {
              HeSheIt: apiResponse.verb.subjonctif.passe?.subjonctifPasseHeSheIt,
              I: apiResponse.verb.subjonctif.passe?.subjonctifPasseI,
              They: apiResponse.verb.subjonctif.passe?.subjonctifPasseThey,
              We: apiResponse.verb.subjonctif.passe?.subjonctifPasseWe,
              You: apiResponse.verb.subjonctif.passe?.subjonctifPasseYou,
              YouAll: apiResponse.verb.subjonctif.passe?.subjonctifPasseYouAll,
          },
          imparfait: {
              HeSheIt: apiResponse.verb.subjonctif.imparfait?.subjonctifImparfaitHeSheIt,
              I: apiResponse.verb.subjonctif.imparfait?.subjonctifImparfaitI,
              They: apiResponse.verb.subjonctif.imparfait?.subjonctifImparfaitThey,
              We: apiResponse.verb.subjonctif.imparfait?.subjonctifImparfaitWe,
              You: apiResponse.verb.subjonctif.imparfait?.subjonctifImparfaitYou,
              YouAll: apiResponse.verb.subjonctif.imparfait?.subjonctifImparfaitYouAll,
          },
          plusQueParfait: {
              HeSheIt: apiResponse.verb.subjonctif.plusQueParfait?.subjonctifPlusQueParfaitHeSheIt,
              I: apiResponse.verb.subjonctif.plusQueParfait?.subjonctifPlusQueParfaitI,
              They: apiResponse.verb.subjonctif.plusQueParfait?.subjonctifPlusQueParfaitThey,
              We: apiResponse.verb.subjonctif.plusQueParfait?.subjonctifPlusQueParfaitWe,
              You: apiResponse.verb.subjonctif.plusQueParfait?.subjonctifPlusQueParfaitYou,
              YouAll: apiResponse.verb.subjonctif.plusQueParfait?.subjonctifPlusQueParfaitYouAll,
          },
          present: {
              HeSheIt: apiResponse.verb.subjonctif.present?.subjonctifPresentHeSheIt,
              I: apiResponse.verb.subjonctif.present?.subjonctifPresentI,
              They: apiResponse.verb.subjonctif.present?.subjonctifPresentThey,
              We: apiResponse.verb.subjonctif.present?.subjonctifPresentWe,
              You: apiResponse.verb.subjonctif.present?.subjonctifPresentYou,
              YouAll: apiResponse.verb.subjonctif.present?.subjonctifPresentYouAll,
          }
      },
      verb: apiResponse.verb.verb,
      word: apiResponse.verb.word,
      wordConjugateRule:  apiResponse.verb.wordConjugateRule,
      wordConjugateWhichVerbModel: apiResponse.verb.wordConjugateWhichVerbModel,
      wordConjugateWithWhichVerb: apiResponse.verb.wordConjugateWithWhichVerb,
      wordVerbGroup: apiResponse.verb.wordVerbGroup,
      wordVerbType: apiResponse.verb.wordVerbType,
      fullDescription: apiResponse.verb.fullDescription,
      id: apiResponse.verb.id,
  };
}
