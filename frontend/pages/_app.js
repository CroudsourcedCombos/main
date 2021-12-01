import '../styles/globals.css'
import '../styles/login.css'

import {AuthenticatedUserProvider} from '../context/AuthenticatedUserContext'
import {ApolloProvider} from "@apollo/client";
import {client} from "../apolo-client";

// Give app access to the authenticated user
function Application({Component, pageProps}) {
  return <AuthenticatedUserProvider>
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  </AuthenticatedUserProvider>
}

export default Application
