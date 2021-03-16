import React from 'react'
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCartData } from '../actions/cartActions'

function OrderSuccess() {
const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(clearCartData())
        localStorage.removeItem('cartItems')
    },[])
    
    return (
        <Container align="center" style={{paddingTop: "50px"}}>
            <Avatar src="https://cdn.onlinewebfonts.com/svg/img_237729.png" style={{height:"300px", width:"300px"}}  />
            <Typography variant="h3" component="div" pt={4}>Your order has been successfully completed!</Typography>
            <Link to="/orders">Back to orders</Link>
        </Container>
    )
}

export default OrderSuccess
