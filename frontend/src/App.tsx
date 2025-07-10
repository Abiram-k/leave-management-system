import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AppRoutes } from "./routes/app.routes";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Toaster
        duration={2500}
        position="bottom-right"
        richColors
        toastOptions={{
          className: "custom-toast",
          style: {
            maxWidth: "300px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
            fontSize: "15px",
            paddingTop: "12px",
            paddingBottom: "12px",
          },
        }}
      />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
