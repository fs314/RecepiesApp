import React from "react";
import { AuthProvider } from "./context/useAuth";
import LoginAndRegistrationForm from "./pages/LoginAndRegistrationForm";

function App() {
  return (
    <div className="App">
      <div className="text-3xl font-bold underline">HEADER</div>
      <AuthProvider>
        <LoginAndRegistrationForm />
      </AuthProvider>
    </div>
  );
}

export default App;
