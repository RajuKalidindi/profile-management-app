import { useContext, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { ProfileContext } from "../context/ProfileContext";

const NavBar = () => {
	const [currentUser, setCurrentUser] = useState<string | null>(null);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const profile = useContext(ProfileContext);

	const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	useEffect(() => {
		const updateUserFromLocalStorage = () => {
			const userData = localStorage.getItem("profileData");
			if (userData) {
				const parsedData = JSON.parse(userData);
				setCurrentUser(parsedData.name || null);
			} else {
				setCurrentUser(null);
			}
		};
		updateUserFromLocalStorage();
	}, [profile]);

	return (
		<AppBar position="static">
			<Toolbar>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					Profile Management
				</Typography>

				<IconButton
					edge="end"
					color="inherit"
					aria-label="menu"
					onClick={handleMenuOpen}
					sx={{ display: { xs: "block", md: "none" } }}
				>
					<MenuIcon />
				</IconButton>

				<Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
					<Button component={Link} to="/profile-form" color="inherit">
						Profile Form
					</Button>
					<Button component={Link} to="/profile" color="inherit">
						Profile
					</Button>
					<Typography
						variant="body1"
						sx={{ marginLeft: 2, alignContent: "center" }}
					>
						{currentUser
							? `Current User: ${currentUser}`
							: "No current user"}
					</Typography>
				</Box>
			</Toolbar>
			<Menu
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleMenuClose}
			>
				<MenuItem
					onClick={handleMenuClose}
					component={Link}
					to="/profile-form"
				>
					Profile Form
				</MenuItem>
				<MenuItem
					onClick={handleMenuClose}
					component={Link}
					to="/profile"
				>
					Profile
				</MenuItem>
				<MenuItem
					onClick={handleMenuClose}
					component={Link}
					to="/profile"
				>
					{currentUser
						? `Current User: ${currentUser}`
						: "No current user"}
				</MenuItem>
			</Menu>
		</AppBar>
	);
};

export default NavBar;
