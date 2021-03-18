import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const AdminRoute = ({ component: Component,  ...rest }) => {

    const { isAuthenticated, user, loading } = useSelector(state => state.auth);
    return (
     <>  
      {!loading && <Route {...rest} render={ props => (!isAuthenticated &&  user?.role !== "admin" ? <Redirect to="/" /> : <Component {...props} />)}  /> }
     </>
    )
}

export default AdminRoute
