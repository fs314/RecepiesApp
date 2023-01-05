import React from "react";
import { AuthProvider } from "./context/useAuth";
import { Route, Routes } from "react-router-dom";
import LoginAndRegistrationPage from "./pages/LoginAndRegistrationPage";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import Account from "./pages/Account";

function App() {
  return (
    <div className="App">
      <div className="text-3xl font-bold underline">HEADER</div>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/login" element={<LoginAndRegistrationPage />} />
            <Route path="/register" element={<LoginAndRegistrationPage />} />

            <Route element={<RequireAuth />}>
              <Route path="/account" element={<Account />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
