import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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

}
