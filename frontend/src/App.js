// import './App.css';
// import { BrowserRouter, Switch, Route, Routes, Redirect } from 'react-router-dom';
// import Home from './pages/Home/Home';
// import Navigation from './components/shared/Navigation/Navigation';
// import Register from './pages/Register/Register';
// import Login from './pages/Login/Login';
// import Authenticate from './pages/Authenticate/Authenticate';
// import Activate from './pages/Activate/Activate';
// import Rooms from './pages/Rooms/Rooms';
// import { useSelector } from 'react-redux';

// function App() {
//   return (
//     <BrowserRouter>
//       <Navigation />
//       {/* <Switch>
//         <Route path="/" exact>
//           <Home />
//         </Route>
//         <Route path="/register">
//           <Register />
//         </Route>
//         <Route path="/login">
//           <Login />
//         </Route>
//       </Switch> */}
//       <Routes>
//         <Route path="/" element={<Home />} />
//         {/* <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Login />} /> */}
//         <Route path="/authenticate" element={<Authenticate/>} />
//       </Routes>
//     </BrowserRouter>
//   );
// }



// const GuestRoute = ({ children, ...rest }) => {
//   const { isAuth } = useSelector((state) => state.auth);
//   return (
//     <Route
//       {...rest}
//       render={({ location }) => {
//         return isAuth ? (
//           <Redirect
//             to={{
//               pathname: '/rooms',
//               state: { from: location },
//             }}
//           />
//         ) : (
//           children
//         );
//       }}
//     ></Route>
//   );
// };

// const SemiProtectedRoute = ({ children, ...rest }) => {
//   const { user, isAuth } = useSelector((state) => state.auth);
//   return (
//     <Route
//       {...rest}
//       render={({ location }) => {
//         return !isAuth ? (
//           <Redirect
//             to={{
//               pathname: '/',
//               state: { from: location },
//             }}
//           />
//         ) : isAuth && !user.activated ? (
//           children
//         ) : (
//           <Redirect
//             to={{
//               pathname: '/rooms',
//               state: { from: location },
//             }}
//           />
//         );
//       }}
//     ></Route>
//   );
// };

// const ProtectedRoute = ({ children, ...rest }) => {
//   const { user, isAuth } = useSelector((state) => state.auth);
//   return (
//     <Route
//       {...rest}
//       render={({ location }) => {
//         return !isAuth ? (
//           <Redirect
//             to={{
//               pathname: '/',
//               state: { from: location },
//             }}
//           />
//         ) : isAuth && !user.activated ? (
//           <Redirect
//             to={{
//               pathname: '/activate',
//               state: { from: location },
//             }}
//           />
//         ) : (
//           children
//         );
//       }}
//     ></Route>
//   );
// };


// export default App;



import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Navigation from './components/shared/Navigation/Navigation';
import Authenticate from './pages/Authenticate/Authenticate';
import Activate from './pages/Activate/Activate';
import Rooms from './pages/Rooms/Rooms';
import { useSelector } from 'react-redux';


// const isAuth=false;
// const user = {
//   activated:false,
// }

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<GuestRoute><Home /></GuestRoute>} />
        <Route path="/authenticate" element={<GuestRoute><Authenticate /></GuestRoute>} />
        <Route path="/activate" element={<SemiProtectedRoute><Activate /></SemiProtectedRoute>} />
        <Route path="/rooms" element={<ProtectedRoute><Rooms /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

const GuestRoute = ({ children }) => {
  const { isAuth } = useSelector((state) => state.auth);
  return isAuth ? <Navigate to="/rooms" replace /> : children;
};

const SemiProtectedRoute = ({ children }) => {
  const { user, isAuth } = useSelector((state) => state.auth);
  if (!isAuth) {
    return <Navigate to="/" replace />;
  } else if (isAuth && !user.activated) {
    return children;
  } else {
    return <Navigate to="/rooms" replace />;
  }
};

const ProtectedRoute = ({ children }) => {
  const { user, isAuth } = useSelector((state) => state.auth);
  if (!isAuth) {
    return <Navigate to="/" replace />;
  } else if (isAuth && !user.activated) {
    return <Navigate to="/activate" replace />;
  } else {
    return children;
  }
};

export default App;
