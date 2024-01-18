import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import { AppProvider } from "./AppContext";
import { Toaster } from "react-hot-toast";

import { AnimatePresence } from "framer-motion";
import AnimatedRoutes from "./components/AnimatedRoutes";

function App() {
  return (
    (
      <div className="black">
        <Toaster position="bottom-center" reverseOrder={false} />
        <AnimatePresence>
          <BrowserRouter>
            <AppProvider>
              <Navbar />
              <AnimatedRoutes />
            </AppProvider>
          </BrowserRouter>
        </AnimatePresence>
      </div>
    )
  );
}

export default App;
//end of code