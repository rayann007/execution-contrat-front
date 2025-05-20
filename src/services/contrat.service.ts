import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contrat } from '../app/models/contrat.model';



@Injectable({
  providedIn: 'root'
})
export class ContratService {
  private readonly baseUrl = 'http://localhost:8081/api/contrats';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') ?? '';
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getNombreContratsActifsAujourdHui(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count-actifs-aujourdhui`, {
      headers: this.getAuthHeaders()
    });
  }

  getNombreContratsEnAlerte(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count-alertes`, {
      headers: this.getAuthHeaders()
    });
  }

getPourcentageParType(): Observable<{ [key: string]: string }> {
  return this.http.get<{ [key: string]: string }>(
    `${this.baseUrl}/pourcentage-par-type`,
    { headers: this.getAuthHeaders() }
  );
}

getEcheancesCeMois(): Observable<any[]> {
  return this.http.get<any[]>(
    `${this.baseUrl}/echeances-mois`,
    { headers: this.getAuthHeaders() }
  );
}
getContratsEnAlerte(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/alertes`, {
    headers: this.getAuthHeaders()
  });
}
createContrat(contrat: any): Observable<any> {
  return this.http.post(`${this.baseUrl}`, contrat);
}

getAllContrats(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`, {
      headers: this.getAuthHeaders()
    });
  }
getContratById(id: number): Observable<Contrat> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });

  return this.http.get<Contrat>(`${this.baseUrl}/${id}`, { headers });
}


}
