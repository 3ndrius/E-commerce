import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
const ProtectedRoute = ({ component: Component, ...rest }) => {
    
    const { loading, isAuthenticated } = useSelector(state => state.auth);

    return (
       <>
       {!loading && <Route {...rest} render={props => (!isAuthenticated ? <Redirect to='/login'/> : <Component {...props}/>) }/>}
       </>
    )
}
export default ProtectedRoute