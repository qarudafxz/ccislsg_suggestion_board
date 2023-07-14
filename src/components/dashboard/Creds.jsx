import React, { useState, useEffect } from "react";

import { getUsernameAndEmail } from "../../helpers/getDataFromLocal.js";

import { getToken } from "../../helpers/getToken.js";
function Creds() {
	const TOKEN = getToken();
	const [username, setUsername] = useState(null);
	const [email, setEmail] = useState(null);

	const data = {
		myUsername: username ?? null,
		myEmail: email ?? null,
	};

	useEffect(() => {
		if (TOKEN) {
			const { username, email } = getUsernameAndEmail();
			setUsername(username);
			setEmail(email);
		}
	}, [TOKEN]);

	return (
		<div>
			<div className='flex flex-col bg-zinc-200 rounded-md px-4 py-2 md:absolute top-24 right-6'>
				<h1>{data.myUsername}</h1>
				<h1 className='font-bold'>{data.myEmail}</h1>
			</div>
		</div>
	);
}

export default Creds;
