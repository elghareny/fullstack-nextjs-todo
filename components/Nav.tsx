/** @format */

import {SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/nextjs";
import React from "react";
import {ModeToggle} from "./ModeToggle";

const Nav = () => {
	return (
		<nav className='flex items-center justify-between container m-auto'>
			<ModeToggle />
			<SignedIn>
				<UserButton />
			</SignedIn>
			<SignedOut>
				<SignInButton />
			</SignedOut>
		</nav>
	);
};

export default Nav;
