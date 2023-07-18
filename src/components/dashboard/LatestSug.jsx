import React, { useState, useEffect, useRef } from "react";
import { buildUrl } from "../../utils/buildUrl";
import { getUserID } from "../../helpers/getDataFromLocal";
import { getToken } from "../../helpers/getToken";
import Timer from "../../components/dashboard/Timer";

function LatestSug() {
	const TOKEN = getToken();
	const userID = getUserID();
	const [sugDate, setSugDate] = useState(new Date());
	const current = useRef(new Date());
	const [dateTomorrow, setDateTomorrow] = useState(new Date());

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

	useEffect(() => {
		let currentDate = new Date(sugDate);
		currentDate.setDate(currentDate.getDate() + 1);
		current.current.value = currentDate;

		setDateTomorrow(currentDate);
	}, [sugDate]);

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
				}`}
			</h1>
			<div className='bg-red-500'>
				<h1>
					New Suggestion input will be on{" "}
					{new Date(dateTomorrow).toLocaleDateString("en-US", {
						hour: "numeric",
						minute: "numeric",
						second: "numeric",
						month: "long",
						day: "numeric",
						year: "numeric",
					})}
				</h1>
				<div className='flex gap-2'>
					<h1>
						Date & Time Now:{" "}
						{new Date().toLocaleDateString("en-US", {
							month: "long",
							day: "numeric",
							year: "numeric",
						})}
					</h1>
					<Timer />
				</div>
			</div>
		</div>
	);
}

export default LatestSug;
