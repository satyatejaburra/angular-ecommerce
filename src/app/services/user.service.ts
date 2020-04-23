import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../common/user';
import {environment} from '../../environments/environment';


@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private httpClient: HttpClient) { }

    getAll() {
        return this.httpClient.get<User[]>(`/users`);
    }

    register(user: User) {
console.log("user service register called " + user);
        return this.httpClient.post(environment.basePostUrl, user);
    }

    delete(id: number) {
        return this.httpClient.delete(`/users/${id}`);
    }
}
