import { User } from "./user";

export class Group {
    id:string;
    name: string;
    users: User[];
    parent:number;
    levels: string;
    adminInfo : User;
}
