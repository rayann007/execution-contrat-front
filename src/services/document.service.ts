import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private readonly baseUrl = 'http://localhost:8081/api/documents';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') ?? '';
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getDocumentsByContrat(contratId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/by-contrat/${contratId}`, {
      headers: this.getAuthHeaders()
    });
  }

  deleteDocument(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

renameDocument(id: number, newName: string): Observable<string> {
  const params = new HttpParams().set('newName', newName);
  return this.http.put(`${this.baseUrl}/${id}/rename`, null, {
    headers: this.getAuthHeaders(),
    params,
    responseType: 'text'  // ✅ indique qu'on attend du texte
  });
}


  downloadZip(contratId: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/zip-by-contrat/${contratId}`, {
      headers: this.getAuthHeaders(),
      responseType: 'blob'
    });
  }

  uploadDocument(contratId: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
if (!contratId) {
  console.error('❌ contratId est undefined');
  throw new Error('contratId est requis pour uploadDocument');
}
console.log("📤 Upload", file.name, "pour contrat ID :", contratId);

formData.append('contratId', contratId.toString());
    // ⚠️ Pas besoin de passer manuellement les headers ici pour `multipart/form-data`
    return this.http.post(`${this.baseUrl}/upload`, formData, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`
        // Ne pas définir Content-Type => Angular le gère automatiquement avec FormData
      })
    });
  }
}
