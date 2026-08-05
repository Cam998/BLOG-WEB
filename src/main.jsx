import { createRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import i18n from "./Services/language.js";
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <I18nextProvider i18n={i18n}>
    <App />
  </I18nextProvider>
);
