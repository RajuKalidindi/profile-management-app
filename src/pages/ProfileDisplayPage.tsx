import { useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfileDisplay from "../components/ProfileDisplay";
import { ProfileContext } from "../context/ProfileContext";
import { Profile } from "../types/types";
import Button from "@mui/material/Button";
import NavBar from "../components/NavBar";

const ProfileDisplayPage = () => {
	const API_URL = import.meta.env.VITE_API_URL;
	const navigate = useNavigate();
	const context = useContext(ProfileContext);

	if (!context) {
		throw new Error(
			"ProfileFormPage must be used within a ProfileProvider"
		);
	}

	const { profile, setProfile, loading, setLoading, error, setError } =
		context;

	useEffect(() => {
		const fetchProfileData = async () => {
			setLoading(true);
			try {
				const storedProfile = localStorage.getItem("profileData");
				if (storedProfile) {
					setProfile(JSON.parse(storedProfile));
				} else {
					const response = await fetch(`${API_URL}/profiles`);
					if (!response.ok)
						throw new Error("Network response was not ok");
					const data = await response.json();
					if (data.length > 0) {
						const fetchedProfile: Profile = data[0];
						setProfile(fetchedProfile);
						localStorage.setItem(
							"profileData",
							JSON.stringify(fetchedProfile)
						);
					}
				}
			} catch (err: unknown) {
				if (err instanceof Error) {
					setError("Failed to fetch profile data: " + err.message);
				} else {
					setError("An unknown error occurred");
				}
			} finally {
				setLoading(false);
			}
		};

		fetchProfileData();
	}, [API_URL, setLoading, setProfile, setError]);

	const handleDeleteProfile = async () => {
		if (!profile) return;

		const confirmDelete = window.confirm(
			"Are you sure you want to delete your profile?"
		);
		if (!confirmDelete) return;

		try {
			const response = await fetch(`${API_URL}/profiles/${profile.id}`, {
				method: "DELETE",
			});

			if (response.ok) {
				localStorage.removeItem("profileData");
				setProfile(null);
				toast.success("Profile deleted successfully!", {
					position: "top-center",
					autoClose: 3000,
					theme: "dark",
				});
				navigate("/");
			} else {
				throw new Error("Failed to delete profile.");
			}
		} catch (err: unknown) {
			if (err instanceof Error) {
				toast.error(
					"An error occurred while deleting the profile: " +
						err.message
				);
			} else {
				toast.error(
					"An unknown error occurred while deleting the profile."
				);
			}
		}
	};

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;

	if (!profile)
		return (
			<>
				<NavBar />
				<div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-700">
					<h1 className="text-3xl font-bold mb-4">
						No Profile Data Available
					</h1>
					<p className="text-lg mb-6">
						Kindly please submit the form to create a profile.
					</p>
					<Button
						component={Link}
						to="/profile-form"
						className="py-2 px-4 rounded"
						variant="outlined"
						children="Go to Form"
					/>
				</div>
			</>
		);

	return (
		<>
			<NavBar />
			<div className="flex">
				<div className="w-1/3 p-8 flex flex-col items-center">
					<img
						src="src/assets/portrait_man.jpg"
						alt="Profile Avatar"
						className="rounded-full h-64 w-64 object-scale-down mb-4"
					/>
					<Button
						onClick={handleDeleteProfile}
						className="mt-4 py-2 px-4 rounded"
						variant="contained"
						color="error"
						children="Delete Profile"
					/>
				</div>

				<div className="w-2/3 p-8">
					<ProfileDisplay />
				</div>

				<ToastContainer />
			</div>
		</>
	);
};

export default ProfileDisplayPage;
