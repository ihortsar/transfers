import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  users = [];
  customerInfo = false

  constructor(private http: HttpClient) { }


  async loadData(endpoint: string): Promise<any[]> {
    const url = `http://localhost/${endpoint}.php`;
    const response = await lastValueFrom(this.http.get<any>(url));
    return response.data || [];
  }


  setDataInLocalStorage(key: string, value: any) {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      console.error('localStorage is not available');
    }
  }


  deleteDataInLocalStorage(key: string) {
    localStorage.removeItem(key)
  }


  getDataInLocalStorage(value: any) {
    if (typeof localStorage !== 'undefined') {
      const storedData = localStorage.getItem(value);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        return parsedData
      } else {
        return false
      }
    }
    return false;
  }


  async checkUsersTransfers(): Promise<any> {
    try {
      const user: any = this.getDataInLocalStorage('currentUser');
      const url = `http://localhost/get_users_transfers.php`;
      const response = await lastValueFrom(this.http.post(url, { user_id: user.id }));
      return response;
    } catch (error) {
      console.error('Error fetching user transfers:', error);
      return [];

    }
  }
}
