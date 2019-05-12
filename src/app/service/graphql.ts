import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import { queryUsers,queryUserWithGroup, queryUserWithRole, resetUserPassword, logoutUser, createUsers } from './user.service';
import { createUser,updateUser,deleteUsers,loginUser } from './user.service';
import { queryGroups,queryGroupsWithCanteens,queryGroupsWithUsers,updateGroup,createGroup,addUserToGroup,removeUserToGroup,deleteGroups } from './group.service';
import { queryTickets,queryTicketCount, sellTicket, recyclingTicket, ticketSellRecord  } from './ticket.service';
import { queryCanteens,createCanteen,updateCanteen,delCanteens,genQrcode,queryCanteenCount } from "./canteen.service";
import { queryRoles, queryRoleWithUsers, addUserToRole, remUserToRole, checkUserNotInRole } from './role.service';
import { createRoleAndPermissionRelationship, queryPermissions } from './permission.service';
import { queryDashboard } from './dashboard.service';
import { queryConfig, updateConfig } from './config.service';

export interface Response {
}

@Injectable({
    providedIn: 'root',
  }) 
export class ServiceGQl extends Query<Response> {
    public static userGQL = queryUsers;
    public static userWithGroupGQL = queryUserWithGroup;
    public static userWithRoleGQL = queryUserWithRole;
    public static updateUserGQL = updateUser;
    public static createUserGQL = createUser;
    public static createUsersGQL = createUsers;
    public static deleteUserGQL = deleteUsers ;
    public static loginGQL = loginUser ;
    public static logoutGQL = logoutUser ;

    public static groupGQL = queryGroups;
    public static groupWithCanteensGQL = queryGroupsWithCanteens;
    public static groupWithUsersGQL = queryGroupsWithUsers;
    public static updateGroupGQL = updateGroup;
    public static createGroupGQL = createGroup;
    public static deleteGroupsGQL = deleteGroups;
    public static addUserToGroupGQL = addUserToGroup;
    public static removeUserToGroupGQL = removeUserToGroup;

    public static ticketsGQL = queryTickets ;
    public static sellTicketGQL = sellTicket ; 
    public static recyclingTicketGQL = recyclingTicket ; 
    public static ticketCountGQL = queryTicketCount ;

    public static ticketRecordsGQL = ticketSellRecord ; 

    public static canteensGQL = queryCanteens; 
    public static canteenCountGQL = queryCanteenCount ; 
    public static createCanteenGQL = createCanteen; 
    public static updateCanteenGQL = updateCanteen; 
    public static delCanteensGQL = delCanteens; 
    public static genQrcodeGQL = genQrcode ; 

    public static queryRolesGQL = queryRoles; 
    public static queryRoleWithUsersGQL = queryRoleWithUsers; 
    public static addUserToRoleGQL = addUserToRole; 
    public static remUserToRoleGQL = remUserToRole; 
    public static checkUserNotInRoleGQL = checkUserNotInRole ; 

    public static queryPermissionsGQL = queryPermissions ; 
    public static createRoleAndPermissionRelationshipGQL = createRoleAndPermissionRelationship ; 

    public static resetUserPasswordGQL = resetUserPassword ; 

    public static queryDashboardGQL = queryDashboard ; 

    public static queryConfigGQL = queryConfig;
    public static updateConfigGQL = updateConfig;
}