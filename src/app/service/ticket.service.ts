import gql from 'graphql-tag';

export const  queryTickets = gql`
      query getTickets($userId:Int!){
        tickets(filter:{userId:2}){
            totalCount
            rows{
                UUID
                price
                userId
                type
            }
        }
      }`

export const  queryTicketCount = gql`
    query getTickets($userId:Int!){
        tickets(filter:{userId:$userId,count:true}){
            totalCount
            count{
                breakfast
                lunch
                dinner
            }
        }
    }`

export const sellTicket = gql`
    mutation genTickets($number:Int!, $userId:Int!,$type:Int! ){
        generateTickets(input:{number:$number,userId:$userId,type:$type,price:0}){
            totalCount
        }
    }
`

export const recyclingTicket = gql`
    mutation recyclingTickets($number:Int!, $userId:Int!,$type:Int!){
        recyclingTickets(input:{userId:$userId, number:$number,type:$type})
    }
`

export const ticketSellRecord = gql`
    query  ticketReocrd($owner:Int!) {
        ticketRecords(filter:{owner:$owner}){
            totalCount
            rows{
                id
                number
                operator
                owner
                action
                description
                createdAt
            }
        }
    }
`