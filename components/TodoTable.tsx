/** @format */
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {ITodo} from "@/interfaces";
import {Badge} from "./ui/badge";
import TodoTableActions from "./TodoTableActions";

interface IProps {
	todos: ITodo[];
}

const ToDosTable = ({todos}: IProps) => {
	return (
		<Table className='max-w-[80%] m-auto'>
			<TableCaption>A list of your recent todos .</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className='w-[400px]'>Tile</TableHead>
					<TableHead className='w-[100px]'>Completed</TableHead>
					<TableHead className='w-[100px]'>Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{todos &&
					todos.map((todo) => (
						<TableRow key={todo.id}>
							<TableCell className='font-medium'>{todo.title}</TableCell>
							<TableCell>
								{todo.completed ? (
									<Badge variant={"default"}>Completed</Badge>
								) : (
									<Badge variant={"destructive"}>UnCompleted</Badge>
								)}
							</TableCell>
							<TableCell className='flex items-center space-x-2'>
								<TodoTableActions todo={todo} />
							</TableCell>
						</TableRow>
					))}
			</TableBody>
			<TableFooter>
				<TableRow>
					<TableCell colSpan={2}>Total</TableCell>
					<TableCell className='text-right'>
						{todos ? todos.length : " You Don't Have Any Todo Yet!"}
					</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	);
};

export default ToDosTable;
