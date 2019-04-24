import gql from 'graphql-tag';

export const  queryCanteens = gql`
    query canteens($name:String,$groupId:Int) {
        canteens(filter:{name:$name,groupID:$groupId}){
            skip
            take
            totalCount
            rows{
                id
                groupID
                breakfastTime
                lunchTime
                dinnerTime
                name
                breakfastPicture
                lunchPicture
                dinnerPicture
                bookingLunchDeadline
                bookingDinnerDeadline
                bookingBreakfastDeadline
                cancelTime
                qrcode
                count{
                    date
                    breakfast
                    dinner
                    lunch
                }
                admin{
                    id
                    username
                }
                }
            }
        }
`

export const  queryCanteenCount = gql`
    query canteens($id:Int) {
        canteens(filter:{id:$id}){
            rows{
                id
                count{
                    date
                    breakfast
                    dinner
                    lunch
                }
            }
        }
    }
`



export const createCanteen = gql`
    mutation createCanteen($name:String!,$groupID:Int!,$adminId:Int!,$breakfastTime:String!,$lunchTime:String!,$dinnerTime:String!,$bookingBreakfastDeadline:String!,$bookingLunchDeadline:String!,$bookingDinnerDeadline:String!,$cancelTime:Int!) {
        createCanteens(input:{
            name:$name, 
            groupID:$groupID,
            adminId:$adminId, 
            breakfastTime:$breakfastTime, 
            lunchTime: $lunchTime, 
            dinnerTime: $dinnerTime,
            bookingBreakfastDeadline:$bookingBreakfastDeadline, 
            bookingLunchDeadline:$bookingLunchDeadline,
            bookingDinnerDeadline:$bookingDinnerDeadline, 
            cancelTime:$cancelTime,
        }){
            id
        }
        }
`


export const updateCanteen = gql`
    mutation updateCanteens($id:Int!, $name:String,$groupID:Int,$adminId:Int, $breakfastTime:String,$lunchTime:String,$dinnerTime:String,$bookingBreakfastDeadline:String,$bookingLunchDeadline:String,$bookingDinnerDeadline:String,$cancelTime:Int) {
        updateCanteens(input:{
            id:$id, 
            name:$name, 
            groupID:$groupID,
            adminId:$adminId, 
            breakfastTime:$breakfastTime, 
            lunchTime: $lunchTime, 
            dinnerTime: $dinnerTime,
            bookingBreakfastDeadline:$bookingBreakfastDeadline, 
            bookingLunchDeadline:$bookingLunchDeadline,
            bookingDinnerDeadline:$bookingDinnerDeadline, 
            cancelTime:$cancelTime,
        }){
            id
        }
        }
`


export const delCanteens = gql`
    mutation delCanteen($ids:[Int!]!) {
        deleteCanteens(input:{ids:$ids})
    }
`

export const genQrcode=gql`
    mutation genQrcode($id:Int!) {
        createQrcode(input:{id:$id})
    }
`