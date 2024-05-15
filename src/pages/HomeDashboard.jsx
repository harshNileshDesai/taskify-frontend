import React from 'react'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { GrTasks } from "react-icons/gr";
import { getFormattedDate } from '@/utils/helper';
import { MdOutlineTaskAlt } from "react-icons/md";
import { MdPriorityHigh } from "react-icons/md";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import ActivityLog from '@/components/home-dashboard/ActivityLog';
import { GrUserAdmin } from "react-icons/gr";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { Link } from 'react-router-dom';

const HomeDashboard = () => {
	return (
		<div className='h-full overflow-y-auto md:overflow-hidden sm:h-full bor der bor der-red-500'>
			{/* Cards */}
			<div className='flex gap-3 flex-col sm:flex-row'>
				<Card className="sm:w-1/4">
					<CardHeader>
						<CardTitle className={"flex gap-3"}>
							<p>Total Task</p>
							<GrTasks />
						</CardTitle>
						<CardDescription>All task stats.</CardDescription>
					</CardHeader>
					<CardContent>
						<p className='text-2xl'>23</p>
					</CardContent>
				</Card>
				<Card className="sm:w-1/4">
					<CardHeader>
						<CardTitle className={"flex gap-3"}>
							<p>Task Created</p>
							<MdOutlineCreateNewFolder />
						</CardTitle>
						<CardDescription>This month, {getFormattedDate(new Date())}</CardDescription>
					</CardHeader>
					<CardContent>
						<p className='text-2xl'>23</p>
					</CardContent>
				</Card>
				<Card className="sm:w-1/4">
					<CardHeader>
						<CardTitle className={"flex gap-3"}>
							<p>High Priority Task</p>
							<MdPriorityHigh />
						</CardTitle>
						<CardDescription>This month, {getFormattedDate(new Date())}</CardDescription>
					</CardHeader>
					<CardContent>
						<p className='text-2xl'>3</p>
					</CardContent>
				</Card>
				<Card className="sm:w-1/4">
					<CardHeader>
						<CardTitle className={"flex gap-3"}>
							<p>Completed</p>
							<MdOutlineTaskAlt />
						</CardTitle>
						<CardDescription>This month, {getFormattedDate(new Date())}</CardDescription>
					</CardHeader>
					<CardContent>
						<p className='text-2xl'>3</p>
					</CardContent>
				</Card>

			</div>
			<div id="row2" className='flex flex-col-reverse sm:flex-row h-full'>
				<ActivityLog />
				<div className='sm:w-1/3 py-4 h-full px-2 '>
					{/* Users
					<h3>Users</h3>
					<div className='flex gap-3'>
						<Card className={'w-1/2'}>
							<CardHeader>
								<CardTitle className={"flex gap-3"}>
									<p>Admin</p>
									<GrUserAdmin />
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className='text-2xl'>3</p>
							</CardContent>
						</Card>
						<Card className={'w-1/2'}>
							<CardHeader>
								<CardTitle className={"flex gap-3"}>
									<p>Supervisor</p>
									<MdOutlineSupervisorAccount />
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className='text-2xl'>3</p>
							</CardContent>
						</Card>

					</div> */}
					<div className='flex justify-center flex-col items-center'>
						<div className='flex justify-center'>
							<img src="/task-create.avif" alt="" />
						</div>
						<Link to={"create-task"} className='text-center border px-4 py-2 rounded-md bg-blue-500 text-white '>Create Task</Link>
					</div>

				</div>
			</div>
		</div>
	)
}

export default HomeDashboard