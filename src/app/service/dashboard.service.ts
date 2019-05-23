import gql from 'graphql-tag';

export const  queryDashboard = gql`
   query dashboard {
  dashboard{
    systemInfo{
      currentLoginCount
      cpu
      disk
      ram
    }
    
    orgInfo{
      name
      userCount
    }

    ticketInfo
  }
}
`