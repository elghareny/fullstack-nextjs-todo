/** @format */

import {getUserTodoListAction} from "@/actions/todo.actions";
import AddTodoForm from "@/components/AddTodoForm";
import ToDosTable from "@/components/TodoTable";
import {auth} from "@clerk/nextjs/server";

const Home = async () => {
	const {userId} = auth();
	const todos = await getUserTodoListAction({userId});

	return (
		<div className='flex flex-col justify-center items-center content-center container m-auto space-y-3'>
			<AddTodoForm userId={userId} />
			<ToDosTable todos={todos} />
		</div>
	);
};

export default Home;
