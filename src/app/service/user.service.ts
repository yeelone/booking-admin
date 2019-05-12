import gql from 'graphql-tag';

export const  queryUsers = gql`
      query getUsers($skip:Int!,$take:Int!,$username:String,$email:String){
        users(pagination:{skip:$skip,take:$take},filter:{username:$username,email:$email}){
          totalCount
          rows{
            id
            username
            email
            picture
          }
        }
      }`

export const  queryUserWithGroup = gql`
      query getUsers($skip:Int!,$take:Int!){
        users(pagination:{skip:$skip,take:$take}){
          totalCount
          rows{
            id
            username
            email
            picture
            groups{
              totalCount
              skip
              take
              rows{
                id
                name
              }
            }
          }
        }
      }`

export const  queryUserWithRole = gql`
      query getUsers($skip:Int!,$take:Int!){
        users(pagination:{skip:$skip,take:$take}){
          totalCount
          rows{
            id
            username
            email
            picture
            roles{
              totalCount
              skip
              take
              rows{
                id
                name
              }
            }
          }
        }
      }`


export const  updateUser = gql`
    mutation updateUser($id:Int!,$username:String,$password:String, $email:String,$picture:String){
      updateUser(input:{id:$id,username:$username,email:$email,picture:$picture,password:$password}){
        id
        username
        picture
        email
        state 
      }
}`

export const  createUser = gql`
    mutation createUser($username: String!,$email: String!,$picture:String,$groupId:Int){
      createUser(input:{username:$username,email:$email,password:"123456",picture:$picture,groupId:$groupId}){
        id
        username
        picture
        email
        state 
      }
}`

export const  createUsers = gql`
    mutation createUsers($file:String!,$groupId:Int!){
      createUsers(input:{uploadFile:$file,groupId:$groupId}){
        errors
      }
}`

export const deleteUsers = gql`
  mutation deleteUser($ids:[Int!]!) {
    deleteUser(input:{ids:$ids})
  }
`

export const loginUser = gql`
  mutation login($username:String!, $password: String!) {
    login(input:{username:$username,password:$password}){
      token
      permissions
      user{
        id
        username
        roles{
          rows{
            id
            name
          }
        }
      }
    }
  }
`


export const logoutUser = gql`
  mutation logout($username:String!) {
    logout(input:{username:$username})
  }
`
export const resetUserPassword = gql`
  mutation resetPassword($ids:[Int!]!){
    resetPassword(input:{ids:$ids})
  }
`
