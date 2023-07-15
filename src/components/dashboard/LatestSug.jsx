import React, { useState, useEffect } from "react";

import { buildUrl } from "../../utils/buildUrl.js";
import { getUserID } from "../../helpers/getDataFromLocal.js";
function LatestSug() {
	const userID = getUserID();
	const [sugDate, setSugDate] = useState(new Date());

	const getLatestSug = async () => {
		const url = buildUrl(`/sug/get-latest-sug/?userID=${userID}`);
		console.log(url);
		const response = await fetch(url);
		const data = await response.json();
		console.log(data);
		setSugDate(data?.latestSug?.createdAt);
	};

	useEffect(() => {
		getLatestSug();
	}, []);
	return (
		<div>
			<h1>
				{`Last Suggestion Created at: ${new Date(sugDate).toLocaleDateString(
					"en-US",
					{
						hour: "numeric",
						minute: "numeric",
						second: "numeric",
						month: "long",
						day: "numeric",
						year: "numeric",
					}
				)}`}{" "}
			</h1>
		</div>
	);
}

export default LatestSug;
