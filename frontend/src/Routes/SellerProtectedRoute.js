import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const SellerProtectedRoute = ({ children, isAdmin }) => {

    const { loading, isAuthenticated, seller } = useSelector(state => state.seller);

    return ( 
        <>
            {loading === false && (
                isAuthenticated === false ? <Navigate to="/seller/login" /> : isAdmin ? seller.role !== "seller" ? <Navigate to="/seller/login" /> : children : children
            )}
        </>
    );
};

export default SellerProtectedRoute;
