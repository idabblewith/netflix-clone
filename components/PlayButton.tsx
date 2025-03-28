import React from "react";
import { useRouter } from "next/router";
import { BsFillPlayFill } from "react-icons/bs";

const PlayButton = ({ movieId }: { movieId: string }) => {
	const router = useRouter();

	return (
		<button
			onClick={() => router.push(`/watch/${movieId}`)}
			className="
          bg-white 
          rounded-md 
          py-1 md:py-2 
          px-2 md:px-4
          w-auto 
          text-xs lg:text-lg 
          font-semibold
          flex
          flex-row
          items-center
          hover:bg-neutral-300
          transition
          "
		>
			<BsFillPlayFill className="w-4 md:w-7 text-black mr-1" />
			Play
		</button>
	);
};
export default PlayButton;
