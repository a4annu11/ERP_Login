import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import logo from "../assets/AdminLTELogo.png";
import user from "../assets/user2-160x160.jpg";

const Student = () => {
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // Send a logout request to the backend
            // await axios.get('http://localhost:8080/api/student/logout', { withCredentials: true });
            // setAuth(null);
            // Redirect the user to the login page
            navigate('/logout');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <div>
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                <a href="#" className="brand-link">
                    <img 
                        src={logo} 
                        alt="AdminLTE Logo" 
                        className="brand-image img-circle elevation-3" 
                        style={{ opacity: .8 }}
                    />
                    <span className="brand-text font-weight-light">E-campus</span>
                </a>
                <div className="sidebar">
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="image">
                            <img 
                                src={user} 
                                className="img-circle elevation-2" 
                                alt="User Image"
                                style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                            />
                        </div>
                        <div className="info">
                            <a href="#" className="d-block">{auth?.user?.name}</a>
                        </div>
                    </div>
                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            <li className="nav-item">
                                <button className="nav-link" onClick={handleLogout}>
                                    <p>Logout</p>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        </div>
    )
}

export default Student;
