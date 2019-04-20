export class Dashboard{
    systemInfo: SystemInfo;
    orgInfo: OrgInfo[];
    ticketInfo: string[];
}

export class SystemInfo{
currentLoginCount: number; 
}

export class OrgInfo {
name:string;
userCount: number; 
}