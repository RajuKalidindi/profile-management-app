import {
	createContext,
	useState,
	ReactNode,
	Dispatch,
	SetStateAction,
} from "react";
import { Profile } from "../types/types";

interface ProfileContextType {
	profile: Profile | null;
	setProfile: Dispatch<SetStateAction<Profile | null>>;
	loading: boolean;
	setLoading: Dispatch<SetStateAction<boolean>>;
	error: string | null;
	setError: Dispatch<SetStateAction<string | null>>;
}

export const ProfileContext = createContext<ProfileContextType | undefined>(
	undefined
);

interface ProfileProviderProps {
	children: ReactNode;
}

export const ProfileProvider = ({ children }: ProfileProviderProps) => {
	const [profile, setProfile] = useState<Profile | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	return (
		<ProfileContext.Provider
			value={{
				profile,
				setProfile,
				loading,
				setLoading,
				error,
				setError,
			}}
		>
			{children}
		</ProfileContext.Provider>
	);
};
