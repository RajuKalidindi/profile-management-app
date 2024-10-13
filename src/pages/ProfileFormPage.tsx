import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import ProfileForm from "../components/ProfileForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProfileContext } from "../context/ProfileContext"; // Import the ProfileContext
import { Profile } from "../types/types";
import NavBar from "../components/NavBar";

const ProfileFormPage = () => {
	const API_URL = import.meta.env.VITE_API_URL;
	const navigate = useNavigate();
	const context = useContext(ProfileContext);

	if (!context) {
		throw new Error(
			"ProfileFormPage must be used within a ProfileProvider"
		);
	}

	const { setProfile, setLoading, setError } = context;

	const handleSubmit = async (data: Profile) => {
		setLoading(true);
		try {
			const getResponse = await fetch(`${API_URL}/profiles`);
			const existingProfiles = await getResponse.json();

			if (existingProfiles.length === 0) {
				const postResponse = await fetch(`${API_URL}/profiles`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data),
				});

				if (postResponse.ok) {
					const result = await postResponse.json();
					toast.success("Profile created successfully!", {
						position: "top-center",
						autoClose: 3000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						theme: "dark",
					});
					setProfile(result);
					navigate("/profile");
				} else {
					const errorData = await postResponse.json();
					setError("Failed to create profile: " + errorData.message);
					toast.error("Failed to create profile.", {
						position: "top-center",
						autoClose: 3000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						theme: "dark",
					});
				}
			} else {
				const existingProfileId = existingProfiles[0].id;
				const putResponse = await fetch(
					`${API_URL}/profiles/${existingProfileId}`,
					{
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(data),
					}
				);

				if (putResponse.ok) {
					const result = await putResponse.json();
					toast.success("Profile updated successfully!", {
						position: "top-center",
						autoClose: 3000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						theme: "dark",
					});
					setProfile(result);
					navigate("/profile");
				} else {
					const errorData = await putResponse.json();
					setError("Failed to update profile: " + errorData.message);
					toast.error("Failed to update profile.", {
						position: "top-center",
						autoClose: 3000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						theme: "dark",
					});
				}
			}
		} catch (err) {
			setError("An error occurred while submitting the form." + err);
			toast.error("An error occurred while submitting the form." + err, {
				position: "top-center",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				theme: "dark",
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<NavBar />
			<div className="max-h-screen bg-gray-100 flex rounded-[10px] p-24">
				<div className="hidden lg:block shadow-lg rounded-lg lg:w-1/2">
					<img
						src="src/assets/form_image.jpg"
						alt="Desk image"
						className="object-cover w-full h-full rounded-l-[10px]"
					/>
				</div>

				<div className="w-full lg:w-1/2 bg-white shadow-rg rounded-rg rounded-r-[10px] flex items-center justify-center p-12">
					<div className="max-w-md w-full space-y-8">
						<h2 className="mt-3 text-center text-4xl font-extrabold text-gray-900">
							Profile Information
						</h2>
						<ProfileForm onSubmit={handleSubmit} />
					</div>
				</div>

				<ToastContainer />
			</div>
		</>
	);
};

export default ProfileFormPage;
