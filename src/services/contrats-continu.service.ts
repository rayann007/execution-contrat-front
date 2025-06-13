import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contrat } from '../app/models/contrat.model';

export interface ContratContinue {
  id?: number;
  typeService: 'gardiennage' | 'nettoyage' | 'restauration';
  contrat: Contrat;
}

@Injectable({
  providedIn: 'root'
})
export class ContratsContinuService {

private apiUrl = 'http://localhost:8081/api/contrats-continue';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ContratContinue[]> {
    return this.http.get<ContratContinue[]>(this.apiUrl);
  }

  getById(id: number): Observable<ContratContinue> {
    return this.http.get<ContratContinue>(`${this.apiUrl}/${id}`);
  }

  create(contrat: ContratContinue): Observable<ContratContinue> {
    return this.http.post<ContratContinue>(this.apiUrl, contrat);
  }

  update(id: number, contrat: ContratContinue): Observable<ContratContinue> {
    return this.http.put<ContratContinue>(`${this.apiUrl}/${id}`, contrat);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getByType(type: 'gardiennage' | 'nettoyage' | 'restauration'): Observable<ContratContinue[]> {
    return this.http.get<ContratContinue[]>(`${this.apiUrl}/type/${type}`);
  }
getContratsContinusEcheanceMois(): Observable<any[]> {
  return this.http.get<any[]>('http://localhost:8081/api/contrats/echeances-mois-continus');
}

resilierContrat(id: number): Observable<any> {
  return this.http.put(`http://localhost:8081/api/contrats-continue/${id}/resilier`, null);
}


}
