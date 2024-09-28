/** @format */

"use server";

import {ITodo} from "@/interfaces";
import {PrismaClient} from "@prisma/client";
import {revalidatePath} from "next/cache";

const prisma = new PrismaClient();

export const getUserTodoListAction = async ({
	userId,
}: {
	userId: string | null;
}) => {
	return await prisma.todo.findMany({
		where: {
			userId: userId as string,
		},
		orderBy: {
			createdAt: "desc",
		},
	});
};
export const createTodoAction = async ({
	title,
	body,
	completed,
	userId,
}: {
	title: string;
	body: string | undefined;
	completed: boolean | undefined;
	userId: string | null;
}) => {
	await prisma.todo.create({
		data: {
			title,
			body,
			completed,
			userId: userId as string,
		},
	});
	revalidatePath("/");
};
export const deleteTodoAction = async ({id}: {id: string}) => {
	await prisma.todo.delete({
		where: {
			id,
		},
	});
	revalidatePath("/");
};
export const updateTodoAction = async ({id, title, body, completed}: ITodo) => {
	await prisma.todo.update({
		where: {
			id,
		},
		data: {
			title,
			body,
			completed,
		},
	});
	revalidatePath("/");
};
