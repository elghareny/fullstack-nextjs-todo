/** @format */

"use client";
import {Button} from "@/components/ui/button";
import {Pen} from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {Textarea} from "@/components/ui/textarea";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {todoFormSchema, TodoFormValues} from "@/schema";
import {updateTodoAction} from "@/actions/todo.actions";
import {Checkbox} from "./ui/checkbox";
import {useState} from "react";
import Spinner from "./Spinner";
import {ITodo} from "@/interfaces";

interface IProps {
	todo: ITodo;
}
const EditTodoForm = ({todo}: IProps) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [open, setOpen] = useState<boolean>(false);
	const defaultValues: Partial<TodoFormValues> = {
		title: todo.title,
		body: todo.body as string,
		completed: todo.completed,
	};

	const form = useForm<TodoFormValues>({
		resolver: zodResolver(todoFormSchema),
		defaultValues,
		mode: "onChange",
	});

	const onSubmit = async (data: TodoFormValues) => {
		setLoading(true);
		await updateTodoAction({
			id: todo.id,
			title: data.title,
			body: data.body as string,
			completed: data.completed,
		});
		setOpen(false);
		setLoading(false);
	};

	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button size={"icon"}>
					<Pen size={16} />
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Edit This Todo</DialogTitle>
				</DialogHeader>

				<div className='grid gap-4 py-4'>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className='space-y-8'>
							<FormField
								control={form.control}
								name='title'
								render={({field}) => (
									<FormItem>
										<FormLabel>Tile</FormLabel>
										<FormControl>
											<Input
												placeholder='Title of your task'
												{...field}
											/>
										</FormControl>
										<FormDescription>This is your task title.</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='body'
								render={({field}) => (
									<FormItem>
										<FormLabel>Short Description</FormLabel>
										<FormControl>
											<Textarea
												placeholder='Body of your task'
												className='resize-none'
												{...field}
											/>
										</FormControl>
										<FormDescription>
											You can write a short description about your next todo.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='completed'
								render={({field}) => (
									<FormItem className='space-x-2'>
										<FormControl>
											<Checkbox
												checked={field.value}
												onCheckedChange={field.onChange}
												{...field}
											/>
										</FormControl>
										<FormLabel className='text-lg'>Completed</FormLabel>
										<FormDescription>
											Your todo will be uncompleted by default unless you
											checked it.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button
								type='submit'
								disabled={loading}>
								{loading ? <Spinner /> : "Save"}
							</Button>
						</form>
					</Form>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default EditTodoForm;
