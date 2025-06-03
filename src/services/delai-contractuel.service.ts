import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface DelaiContractuel {
  id?: number;
  date: string;
  joursRetard: number;
  montantPenaliteJournalier: number;
  commentaire: string;
  respecteDelai: boolean;
  penalitePayee: boolean;
  contrat_id: number;
}

@Injectable({
  providedIn: 'root'
})
export class DelaiContractuelService {
  private apiUrl = 'http://localhost:8081/api/delais'; // adapte au besoin

  constructor(private http: HttpClient) {}

  ajouterDelai(delai: DelaiContractuel): Observable<DelaiContractuel> {
    return this.http.post<DelaiContractuel>(`${this.apiUrl}`, delai);
  }

  getDelaisByContrat(contratId: number): Observable<DelaiContractuel[]> {
    return this.http.get<DelaiContractuel[]>(`${this.apiUrl}/contrat/${contratId}`);
  }
}
