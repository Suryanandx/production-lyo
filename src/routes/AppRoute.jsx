import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from "../components/context/AuthContext"

const AppRoute = ({component: Component, layout: Layout, ...rest}) => {
  const { currentUser } = useAuth()
    return (
        <Route
        {...rest}
            render= {
                props =>  {
                    return (
                         <Layout>
                            {currentUser? <Component {...props}/> : <Redirect to="/login"/>}
                        
                        </Layout>
                    )
                }}
                    
            >
            
        </Route>
    )
}

export default AppRoute
