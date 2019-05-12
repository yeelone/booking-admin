import gql from 'graphql-tag';

export const queryConfig = gql`
    query config {
        config{
            wxAppID
            wxSecret
            prompt
        }
    }
`

export const updateConfig = gql`
    mutation updateConfig($prompt:String,$wxAppID:String,$wxSecret:String ) {
        config(input:{prompt: $prompt,wxAppID:$wxAppID,wxSecret:$wxSecret}){
            prompt
            wxAppID
            wxSecret
        }
    }
`