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
		console.log(dateTomorrow);
	}, [sugDate]);

	return (
		<div className='pt-10'>
			<h1>
				<span className='font-bold'>
					{sugDate
						? `Last Suggestion Created at: ${new Date(sugDate).toLocaleDateString(
								"en-US",
								{
									hour: "numeric",
									minute: "numeric",
									second: "numeric",
									month: "long",
									day: "numeric",
									year: "numeric",
								}
						  )}`
						: "Have not suggested yet"}
				</span>
			</h1>
			<div>
				<h1>
					<span className='font-bold'>
						{dateTomorrow != "Invalid Date"
							? `New Suggestion input will be on ${new Date(
									dateTomorrow
							  ).toLocaleDateString("en-US", {
									hour: "numeric",
									minute: "numeric",
									second: "numeric",
									month: "long",
									day: "numeric",
									year: "numeric",
							  })}`
							: null}
					</span>
				</h1>
				<div className='xxxxs:flex flex-col sm:flex-row gap-2'>
					<h1>
						Date & Time Now:{" "}
						<span className='font-bold'>
							{new Date().toLocaleDateString("en-US", {
								month: "long",
								day: "numeric",
								year: "numeric",
							})}
						</span>
					</h1>
					<Timer />
				</div>
			</div>
		</div>
	);
}

export default LatestSug;
