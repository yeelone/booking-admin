import gql from 'graphql-tag';

export const queryGroups = gql`
  query getGroups($skip:Int!,$take:Int!,$id:Int,$name:String) {
  groups(orderBy:name_ASC,pagination:{skip:$skip,take:$take},filter:{id:$id, name:$name}) {
    totalCount
    skip
    take
    rows{
      id
      name
      picture
      adminInfo{
        id
        username
      }
    }
  }
}
`

export const queryGroupsWithCanteens = gql`
  query getGroups($skip:Int!,$take:Int!,$name:String!) {
  groups(orderBy:name_ASC,pagination:{skip:$skip,take:$take},filter:{name:$name}) {
    totalCount
    skip
    take
    rows{
      id
      name
      picture
      canteens{
        totalCount
        rows{
          id
          name
          breakfastTime
          lunchTime
          dinnerTime
        }
      }
    }
  }
} 
`

export const queryGroupsWithUsers = gql`
  query getGroups($skip:Int!,$take:Int!,$id:Int!, $name:String,$username:String, $email:String) {
  groups(orderBy:name_ASC,pagination:{skip:$skip,take:$take},filter:{id:$id, name:$name}) {
    totalCount
    skip
    take
    rows{
      id
      name
      picture
      users(filter:{username:$username,email:$email}){
        totalCount
        rows{
          id
          username
          email
        }
      }
    }
  }
} 
`

export const  updateGroup = gql`
    mutation updateGroup($id:Int!,$admin:Int,$name:String,$picture:String) {
      updateGroup(input:{id:$id, name:$name,admin:$admin,picture:$picture}){
        id
      }  
    }`

export const  createGroup = gql`
  mutation createGroups($name: String!,$admin:Int!, $parent: Int!,$picture:String!){
    createGroup(input:{name:$name,parent:$parent,admin:$admin,picture:$picture}){
      id
    }
}`

export const deleteGroups = gql`
  mutation deleteGroup($ids:[Int!]!) {
    deleteGroup(input:{ids:$ids})
  }
`

export const addUserToGroup = gql`
  mutation addRelations($userIds:[Int!]!, $groupId:Int!){
	  createUserAndGroupRelationship(input:{userIds:$userIds,groupId:$groupId})
  }
`

export const removeUserToGroup = gql`
  mutation remRelations($userIds:[Int!]!, $groupId:Int!){
	  removeUserAndGroupRelationship(input:{userIds:$userIds,groupId:$groupId})
  }
`
