import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { Layout } from "@/layout";
import { AuthPage } from "@/pages";
import UpdatePassword from "./features/auth/UpdatePassword";
import ForgotPassword from "./features/auth/ForgotPassword";
import DataTableDemo from "./features/DataTableDemo";
import ExampleForm from "./features/ExampleForm";
import ProtectedRoute from "./routes/ProtectedRoute";
import { ClientsList } from "@/features";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50">
        <Routes>

          {/* Public Routes */}
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/update-password" element={<UpdatePassword />} />

          {/* Protected Layout */}
          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<DataTableDemo />} />
            <Route path="/form-example" element={<ExampleForm />} />
            <Route path="/clients" element={<ClientsList />} />
          </Route>

          {/* Default Redirect */}
          <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
