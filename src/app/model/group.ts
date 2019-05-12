import { User } from "./user";

export class Group {
    id:string;
    name: string;
    users: User[];
    parent:number;
    picture:string;
    levels: string;
    adminInfo : User;
}
