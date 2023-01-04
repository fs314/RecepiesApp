import React from "react";
import { AuthProvider } from "./context/useAuth";
import LoginAndRegistrationPage from "./pages/LoginAndRegistrationPage";

function App() {
  return (
    <div className="App">
      <div className="text-3xl font-bold underline">HEADER</div>
      <AuthProvider>
        <LoginAndRegistrationPage />
      </AuthProvider>
    </div>
  );
}

export default App;
