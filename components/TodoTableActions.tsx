/** @format */
"use client";
import {useState} from "react";
import Spinner from "./Spinner";
import {Button} from "./ui/button";
import {Trash} from "lucide-react";
import {deleteTodoAction} from "@/actions/todo.actions";
import EditTodoForm from "./EditTodoForm";
import {ITodo} from "@/interfaces";

interface IProps {
	// isLoading:boolean
	todo: ITodo;
}
const TodoTableActions = ({todo}: IProps) => {
	const [loading, setLoading] = useState<boolean>(false);

	return (
		<>
			<EditTodoForm todo={todo} />
			<Button
				size={"icon"}
				variant={"destructive"}
				disabled={loading}
				onClick={async () => {
					setLoading(true);
					await deleteTodoAction({id: todo.id});
					setLoading(false);
				}}>
				{loading ? <Spinner /> : <Trash size={16} />}
			</Button>
		</>
	);
};

export default TodoTableActions;
