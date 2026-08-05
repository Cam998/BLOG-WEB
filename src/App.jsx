import { BrowserRouter, Routes, Route } from "react-router";
import HomeScreen from './Screens/HomeScreen/HomeScreen';
import SandroScreen from './Screens/SandroScreen/SandroScreen';
import QuizScreen from "./Screens/QuizScreen/QuizScreen";
import ChargeScreen from "./Screens/ChargeScreen/ChargeScreen";
import ModeracionScreen from "./Screens/ModeracionScreen/ModeracionScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChargeScreen />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/sandro" element={<SandroScreen />} />
        <Route path="/quiz" element={<QuizScreen />} />
        <Route path="/moderacion" element={<ModeracionScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
