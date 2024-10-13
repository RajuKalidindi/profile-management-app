import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import NavBar from "../components/NavBar";

const NotFound = () => {
	const navigate = useNavigate();
	return (
		<>
			<NavBar />
			<div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-700">
				<h1 className="text-3xl font-bold mb-4">
					404 - Page Not Found
				</h1>
				<p className="text-lg mb-6">
					Kindly please head to the profile page.
				</p>
				<Button
					onClick={() => navigate("/profile")}
					className="py-2 px-4 rounded"
					variant="outlined"
					children="Go to Profile"
				/>
			</div>
		</>
	);
};

export default NotFound;
