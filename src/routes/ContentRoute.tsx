import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";
import ProfileFormPage from "../pages/ProfileFormPage";
import ProfileDisplayPage from "../pages/ProfileDisplayPage";
import NotFound from "../pages/NotFound";

const ContentRoute = () => {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<Navigate to="/profile-form" />} />
					<Route path="/profile-form" Component={ProfileFormPage} />
					<Route path="/profile" Component={ProfileDisplayPage} />
					<Route path="/404" Component={NotFound} />
					<Route path="*" element={<Navigate to="/404" />} />
				</Routes>
			</Router>
		</>
	);
};

export default ContentRoute;
