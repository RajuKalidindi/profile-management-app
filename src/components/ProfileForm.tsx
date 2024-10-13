import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@mui/material";
import { Profile } from "../types/types";

interface ProfileFormProps {
	onSubmit: (data: Profile) => void;
}

const ProfileForm = ({ onSubmit }: ProfileFormProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<Profile>();
	const onSubmitForm: SubmitHandler<Profile> = (data) => {
		console.log(data);
		onSubmit(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmitForm)}>
			<div>
				<label>
					Name <span className="text-red-500">*</span>
				</label>
				<input
					id="name"
					type="text"
					{...register("name", {
						required: "Name is required",
						minLength: {
							value: 3,
							message: "Name must be at least 3 characters long",
						},
					})}
					className="w-full p-2 mb-2 border rounded"
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
					type="email"
					{...register("email", {
						required: "Email is required",
						pattern: {
							value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
							message: "Email is not valid",
						},
					})}
					className="w-full p-2 mb-2 border rounded"
				/>
				{errors.email && (
					<p className="text-red-500">{errors.email.message}</p>
				)}
			</div>

			<div>
				<label>Age</label>
				<input
					id="age"
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
				/>
				{errors.age && (
					<p className="text-red-500">{errors.age.message}</p>
				)}
			</div>

			<div
				style={{
					marginTop: "15px",
					display: "flex",
					justifyContent: "center",
				}}
			>
				<Button
					type="submit"
					disabled={!isValid}
					className={` py-2 px-4 rounded ${
						!isValid ? "opacity-50 cursor-not-allowed" : ""
					}`}
					variant="contained"
					color="success"
					children="Submit"
				/>
			</div>
		</form>
	);
};

export default ProfileForm;
