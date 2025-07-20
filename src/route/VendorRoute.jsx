import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';
import useUserRole from '../hooks/useUserRole';
import Loading from '../Shared/Loading/Loading';

const AdminRoute = ({children}) => {

    const {user, loading}= useAuth()
    const {role, roleLoading}= useUserRole()
    const location= useLocation()


    if(loading || roleLoading){
        return <Loading></Loading>
    }

    if(!user || role !== 'admin'){
        return <Navigate to="/forbidden" state={{ from: location }} replace />;
    }

    return children
};

export default AdminRoute;