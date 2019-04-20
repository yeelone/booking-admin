import gql from 'graphql-tag';

export const  queryPermissions = gql`
    query getPermission($name:String!){
        permissions(filter:{name:$name}){
            totalCount
            rows{
            module
            name
            resource
            object
            checked
            }
        }
    }`

export const  createRoleAndPermissionRelationship = gql`
    mutation createRoleAndPermissionRelationship($role:String!, $permissions:[String!]!){
        createRoleAndPermissionRelationship(input:{role:$role, permissions:$permissions})
    }
`