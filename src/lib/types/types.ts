type ProductType = {
	id: number;
	title: string;
	price: number;
	content: string;
	image: { url: string };
	createdAt: string;
	updatedAt: string;
	tag: string[];
};

type Purchase = {
	id: string;
	userId: string;
	bookId: string;
	sessionId: string;
	createdAt: string;
};

type User = {
	id: string;
	name: string;
	email: string;
	image: string;
};

export type { ProductType, Purchase, User };
