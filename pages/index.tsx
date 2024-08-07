import Billboard from "@/components/Billboard";
import InfoModal from "@/components/InfoModal";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";
import useFavourites from "@/hooks/useFavourites";
import useInfoModal from "@/hooks/useInfoModal";
import useMovieList from "@/hooks/useMovieList";
import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";

export async function getServerSideProps(context: NextPageContext) {
	const session = await getSession(context);

	if (!session) {
		return {
			redirect: {
				destination: "/auth",
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
}

export default function Home() {
	const { data: movies = [] } = useMovieList();
	const { data: favourites = [] } = useFavourites();
	const { isOpen, closeModal } = useInfoModal();

	return (
		<>
			{/* Navbar */}
			<InfoModal visible={isOpen} onClose={closeModal} />
			<Navbar />
			<Billboard />
			<div className="pb-40">
				<MovieList title="Trending Now" data={movies} />
				<MovieList title="My List" data={favourites} />
			</div>
		</>
	);
}
