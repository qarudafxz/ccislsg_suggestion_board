import React, { useState, useEffect } from "react";

import { buildUrl } from "../../utils/buildUrl.js";
import { getUserID } from "../../helpers/getDataFromLocal.js";

import { getToken } from "../../helpers/getToken.js";
function LatestSug() {
	const TOKEN = getToken();
	const userID = getUserID();
	const [sugDate, setSugDate] = useState(new Date());

	const getLatestSug = async () => {
		const url = buildUrl(`/sug/get-latest-sug/?userID=${userID}`);
		const response = await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${TOKEN}`,
			},
		});
		const data = await response.json();

		setSugDate(data?.latestSug?.createdAt);
	};

	useEffect(() => {
		getLatestSug();
	}, []);
	return (
		<div>
			<h1>
				{`Last Suggestion Created at: ${
					sugDate
						? new Date(sugDate).toLocaleDateString("en-US", {
								hour: "numeric",
								minute: "numeric",
								second: "numeric",
								month: "long",
								day: "numeric",
								year: "numeric",
						  })
						: "Have not suggested yet"
				}`}{" "}
			</h1>
		</div>
	);
}

export default LatestSug;
