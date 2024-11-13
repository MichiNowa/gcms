<style>
	/* .group:hover .group-hover\:block {
		display: block;
	} */
</style>
<?php
$dateNow = new DateTime();
$dateNow->setTimezone(new DateTimeZone("+08:00"));
?>
<div>
	<!--
	Admin Account:
		School ID: 20
		password: fr20
	-->

	<h1 class="tw-text-2xl tw-font-bold tw-py-4 tw-border-b-2 tw-border-gray-600">Admin Dashboard</h1>
	<div class="tw-min-h-[400px] tw-flex tw-justify-end tw-gap-5">
		<div class="tw-flex tw-flex-col tw-items-center tw-w-[40%] tw-max-w-screen-md tw-p-6 tw-pb-6 tw-tw-bg-white tw-rounded-lg tw-shadow-xl tw-:p-8">
			<h2 class="tw-text-sm ">Junior High School</h2>
			<span class="tw-text-lg tw-font-semibold tw-text-gray-500 dashboard-school-year"></span>
			<div class="tw-flex tw-items-end tw-flex-grow tw-w-[50%] tw-mt-2 tw-space-x-1 sm:tw-space-x-3" id="junior-bar-chart">
				<div class="tw-text-center tw-w-full">
					<div role="tw-status">
						<svg aria-hidden="true" class="tw-inline tw-w-8 tw-h-8 tw-text-gray-200 tw-animate-spin dark:tw-text-gray-600 tw-fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
							<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
						</svg>
						<span class="tw-sr-only">Loading...</span>
					</div>
				</div>
			</div>
			<div class="tw-flex tw-w-full mt-3" id="junior-legends">
			</div>
		</div>
		<div class="tw-flex tw-flex-col tw-items-center tw-w-[40%] tw-max-w-screen-md tw-p-6 tw-pb-6 tw-tw-bg-white tw-rounded-lg tw-shadow-xl tw-:p-8">
			<h2 class="tw-text-sm ">Senior High School</h2>
			<span class="tw-text-lg tw-font-semibold tw-text-gray-500 dashboard-school-year"></span>
			<div class="tw-flex tw-items-end tw-flex-grow tw-w-[50%] tw-mt-2 tw-space-x-1 sm:tw-space-x-3" id="senior-bar-chart">
				<div class="tw-text-center tw-w-full">
					<div role="tw-status">
						<svg aria-hidden="true" class="tw-inline tw-w-8 tw-h-8 tw-text-gray-200 tw-animate-spin dark:tw-text-gray-600 tw-fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
							<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
						</svg>
						<span class="tw-sr-only">Loading...</span>
					</div>
				</div>
			</div>
			<div class="tw-flex tw-w-full mt-3" id="senior-legends">
			</div>
		</div>

		<div class="tw-flex tw-flex-col tw-items-center tw-w-[40%] tw-max-w-screen-md tw-p-6 tw-pb-6 tw-tw-bg-white tw-rounded-lg tw-shadow-xl tw-:p-8">
			<h2 class="tw-text-sm ">College</h2>
			<span class="tw-text-lg tw-font-semibold tw-text-gray-500 dashboard-school-year"></span>
			<div class="tw-flex tw-items-end tw-flex-grow tw-w-[50%] tw-mt-2 tw-space-x-1 sm:tw-space-x-3" id="college-bar-chart">
				<div class="tw-text-center tw-w-full">
					<div role="tw-status">
						<svg aria-hidden="true" class="tw-inline tw-w-8 tw-h-8 tw-text-gray-200 tw-animate-spin dark:tw-text-gray-600 tw-fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
							<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
						</svg>
						<span class="tw-sr-only">Loading...</span>
					</div>
				</div>
			</div>
			<div class="tw-flex tw-w-full mt-3" id="college-legends">
			</div>
		</div>

	</div>

	<div class="tw-flex tw-items-start tw-justify-between tw-p-4 tw-h-screen">
		<div class="tw-w-1/2 tw-p-4 tw-bg-white tw-rounded-lg tw-shadow-xl">
			<div class="tw-col-md-6 tw-col-xxl-3 tw-d-flex tw-order-2 tw-order-xxl-3">
				<div class="tw-w-100">
					<div>
						<h4 class="tw-mb-4">Schedule</h4>
					</div>
					<div>
						<div class="tw-align-self-center tw-w-100">
							<table class="table tw-mb-0" id="schedule-card">
								<thead>
									<tr>
										<th class="tw-p-2">
											<h6 class="tw-mt-3 tw-mb-4" id="schedule-card-date"><?= $dateNow->format("F j, Y") ?></h6>
											Student Name
										</th>
										<th class="tw-text-end tw-p-2">
											Time
										</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td colspan="2"><div class="tw-text-center tw-italic tw-text-gray-400">No Appointments</div></td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="tw-w-1/2 tw-p-4">
			<div class="tw-bg-white tw-shadow-lg tw-rounded-lg tw-overflow-hidden">
				<div class="tw-flex tw-items-center tw-justify-between tw-px-6 tw-py-3 tw-bg-gray-700">
					<button id="prevMonth" class="tw-text-white">Previous</button>
					<div id="currentMonth" class="tw-text-white"></div>
					<button id="nextMonth" class="tw-text-white">Next</button>
				</div>
				<div class="tw-grid tw-grid-cols-7 tw-gap-2 tw-p-4" id="calendar">
				</div>
			</div>
		</div>
	</div>

</div>