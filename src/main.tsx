
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles' // Import the styles.ts file instead of index.css

createRoot(document.getElementById("root")!).render(<App />);
