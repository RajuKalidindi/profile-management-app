import ContentRoute from "./routes/ContentRoute";
import "./App.css";
import { ProfileProvider } from "./context/ProfileContext";

function App() {
	return (
		<ProfileProvider>
			<ContentRoute />
		</ProfileProvider>
	);
}

export default App;
