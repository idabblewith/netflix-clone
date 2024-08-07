import axios from "axios";
import React, { useCallback, useMemo } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavourites from "@/hooks/useFavourites";
import { FaCheck, FaPlus } from "react-icons/fa";

const FavoriteButton = ({ movieId }: { movieId: string }) => {
	const { mutate: mutateFavorites } = useFavourites();

	const { data: currentUser, mutate } = useCurrentUser();

	const isFavourite = useMemo(() => {
		const list = currentUser?.favoriteIds || [];

		return list.includes(movieId);
	}, [currentUser, movieId]);

	const toggleFavorites = useCallback(async () => {
		let response;

		if (isFavourite) {
			response = await axios.delete("/api/favourite", {
				data: { movieId },
			});
		} else {
			response = await axios.post("/api/favourite", { movieId });
		}

		const updatedFavoriteIds = response?.data?.favoriteIds;

		mutate({
			...currentUser,
			favoriteIds: updatedFavoriteIds,
		});
		mutateFavorites();
	}, [movieId, isFavourite, currentUser, mutate, mutateFavorites]);

	const Icon = isFavourite ? FaCheck : FaPlus;

	return (
		<div
			onClick={toggleFavorites}
			className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
		>
			<Icon className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
		</div>
	);
};

export default FavoriteButton;
