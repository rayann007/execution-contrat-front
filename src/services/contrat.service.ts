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
updateContrat(id: number, contrat: Partial<Contrat>): Observable<Contrat> {
  const headers = this.getAuthHeaders();
  return this.http.put<Contrat>(`${this.baseUrl}/${id}`, contrat, { headers });
}


countContratsContinusEnAlerte(): Observable<number> {
  return this.http.get<number>(`${this.baseUrl}/count-continus-alertes`, {
    headers: this.getAuthHeaders()
  });
}


resilierContrat(id: number): Observable<any> {
  return this.http.put(
    `http://localhost:8081/api/contrats/resilier-et-archiver/${id}`,
    null,
    {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`
      }),
      responseType: 'text' // <- car backend renvoie String
    }
  );
}

getContratsContinusEnAlerte(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/alertes-continus`, {
    headers: this.getAuthHeaders()
  });
}

getContratsParCouleur(couleur: string) {
  return this.http.get<any[]>(`http://localhost:8081/api/evaluations/couleur/${couleur}`);
}

}
