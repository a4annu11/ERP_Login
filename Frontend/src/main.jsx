import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './context/auth.jsx';
import { TeacherAuthProvider } from './context/teacherAuth.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
 
<AuthProvider>
    <TeacherAuthProvider>

    <BrowserRouter>
          <App />
    </BrowserRouter>
    </TeacherAuthProvider>
</AuthProvider>
  
)
