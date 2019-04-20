import gql from 'graphql-tag';

export const  queryRoles = gql`
    query queryRoles($skip:Int!,$take:Int!,$name:String){
        roles(pagination:{skip:$skip,take:$take},filter:{name:$name}){
          totalCount
          skip
          take
          rows{
            id
            name
          }
        }
      }`

export const  queryRoleWithUsers = gql`
    query queryRoles($skip:Int!,$take:Int!,$rid:Int!, $username:String){
        roles(filter:{id:$rid}){
          totalCount
          skip
          take
          rows{
            id
            name
            users(pagination:{skip:$skip,take:$take},filter:{username:$username}){
                totalCount
                skip
                take
                rows{
                    id
                    username
                    email
                }
            }
          }
        }
      }`


export const addUserToRole = gql`
  mutation addUserToRole($userIds:[Int!]!, $roleId:Int!){
    createUserAndRoleRelationship(input:{userIds:$userIds,roleId:$roleId})
  }
`

export const remUserToRole = gql`
  mutation remUserToRole($userIds:[Int!]!, $roleId:Int!){
    removeUserAndRoleRelationship(input:{userIds:$userIds,roleId:$roleId})
  }
`


export const checkUserNotInRole = gql`
  query checkUserNotInRole($roleId:Int!,$userIds:[Int!]! ){
    checkUserNotInRole(filter:{roleId:$roleId, userIds:$userIds})
  }
`