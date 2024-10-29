import { useContext, useEffect, useState } from "react";
import { ProfileContext } from "../context/ProfileContext";
import { Profile } from "../types/types";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";

const ProfileDisplay = () => {
	const context = useContext(ProfileContext);
	const API_URL = import.meta.env.VITE_API_URL;

	if (!context) {
		throw new Error("ProfileDisplay must be used within a ProfileProvider");
	}

	const { profile, setProfile } = context;
	const [isEditing, setIsEditing] = useState(false);
	const [originalProfile, setOriginalProfile] = useState<Profile | null>(
		null
	);
	const {
		register,
		handleSubmit,
		setValue,
		reset,
		formState: { errors, isValid },
	} = useForm<Profile>({
		mode: "onChange",
	});

	useEffect(() => {
		if (profile) {
			setValue("id", profile.id);
			setValue("name", profile.name);
			setValue("email", profile.email);
			setValue("age", profile.age || undefined);
			setOriginalProfile(profile);
		}
	}, [profile, setValue]);

	const onSubmit: SubmitHandler<Profile> = async (data) => {
		if (!profile) return;
		setIsEditing(false);
		try {
			const response = await fetch(`${API_URL}/profiles/${profile.id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (!response.ok) throw new Error("Failed to update profile.");

			setProfile(data);
			localStorage.setItem("profileData", JSON.stringify(data));
			toast.success("Profile updated successfully!", {
				position: "top-center",
				autoClose: 3000,
				theme: "dark",
			});
		} catch (err: unknown) {
			if (err instanceof Error) {
				toast.error(
					"An error occurred while updating the profile: " +
						err.message
				);
			} else {
				toast.error(
					"An unknown error occurred while updating the profile."
				);
			}
		}
	};

	const handleCancel = async () => {
		if (originalProfile) {
			reset(originalProfile);
		}
		setIsEditing(false);
	};

	return (
		<div className="w-full">
			<div className="flex justify-between items-center mb-5">
				<h1 className="text-3xl font-bold">My Profile</h1>
				{!isEditing && (
					<Button
						type="button"
						onClick={() => setIsEditing(true)}
						className="py-2 px-4 rounded text-base"
						variant="outlined"
						children="Edit Profile"
					/>
				)}
			</div>

			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<label>
						Name <span className="text-red-500">*</span>
					</label>
					<input
						id="name"
						aria-label="name"
						type="text"
						{...register("name", {
							required: "Name is required",
							minLength: {
								value: 3,
								message:
									"Name must be at least 3 characters long",
							},
						})}
						className="w-full p-2 mb-2 border rounded"
						disabled={!isEditing}
					/>
					{errors.name && (
						<p className="text-red-500">{errors.name.message}</p>
					)}
				</div>

				<div>
					<label>
						Email <span className="text-red-500">*</span>
					</label>
					<input
						id="email"
						aria-label="email"
						type="email"
						{...register("email", {
							required: "Email is required",
							pattern: {
								value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
								message: "Invalid email address",
							},
						})}
						className="w-full p-2 mb-2 border rounded"
						disabled={!isEditing}
					/>
					{errors.email && (
						<p className="text-red-500">{errors.email.message}</p>
					)}
				</div>

				<div>
					<label>Age</label>
					<input
						id="age"
						aria-label="age"
						type="number"
						{...register("age", {
							min: {
								value: 0,
								message: "Age must be a positive number",
							},
							validate: (value) =>
								!value ||
								value > 0 ||
								"Age must be a positive number",
						})}
						className="w-full p-2 mb-2 border rounded"
						disabled={!isEditing}
					/>
					{errors.age && (
						<p className="text-red-500">{errors.age.message}</p>
					)}
				</div>

				{isEditing && (
					<div className="flex justify-end mt-4 space-x-4">
						<Button
							type="button"
							onClick={handleCancel}
							className="py-2 px-4 rounded"
							variant="outlined"
							color="inherit"
							children="Cancel"
						/>
						<Button
							type="submit"
							disabled={!isValid}
							className={`py-2 px-4 rounded ${
								!isValid ? "opacity-50 cursor-not-allowed" : ""
							}`}
							variant="contained"
							color="success"
							children="Submit"
						/>
					</div>
				)}
			</form>
		</div>
	);
};

export default ProfileDisplay;
