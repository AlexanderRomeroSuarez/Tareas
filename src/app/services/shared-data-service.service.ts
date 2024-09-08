import { Injectable, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataServiceService {


  setUser(value: string): string{

    return value;
  }

  hasActiveBooleam(): boolean{
    return true;
    }

}
