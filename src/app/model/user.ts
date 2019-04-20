import { Group } from "./group";
import { Role } from "./role";

export class User {
    id: number;
    username: string;
    email: string;
    password: string;
    id_card: string ;
    picture:   string;
    createdAt: string; 
    updatedAt: string; 
    group: number;
    groups: Group[];
    roles: Role[];
    state: number ; 
    token: string;
}