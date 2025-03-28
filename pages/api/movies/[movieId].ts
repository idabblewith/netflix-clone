import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "GET") {
		return res.status(405).end();
	}

	try {
		await serverAuth(req, res);

		const { movieId } = req.query;

		if (typeof movieId !== "string") {
			throw new Error("Invalid Id");
		}

		if (!movieId) {
			throw new Error("Missing Id");
		}

		const movies = await prismadb.movie.findUnique({
			where: {
				id: movieId,
			},
		});

		return res.status(200).json(movies);
	} catch (error) {
		console.log(error);
		return res.status(500).end();
	}
}
