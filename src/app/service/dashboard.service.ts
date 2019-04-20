import gql from 'graphql-tag';

export const  queryDashboard = gql`
   query dashboard {
  dashboard{
    systemInfo{
      currentLoginCount
    }
    
    orgInfo{
      name
      userCount
    }

    ticketInfo
  }
}
`