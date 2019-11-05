import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class HelperService {
    static baseURL: string = 'http://localhost:4009';
}