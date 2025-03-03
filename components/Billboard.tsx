import React, { useCallback } from "react";
import useBillboard from "@/hooks/useBillboard";
import { AiOutlineInfo } from "react-icons/ai";
import PlayButton from "@/components/PlayButton";
import useInfoModal from "@/hooks/useInfoModal";

const Billboard = () => {
	const { data } = useBillboard();
	const { openModal } = useInfoModal();
	const handleOpenModal = useCallback(() => {
		openModal(data?.id);
	}, [openModal, data?.id]);

	return (
		<div className="relative h-[56.25vw]">
			{/* 16.9 aspect ratio ^^ */}
			<video
				poster={data?.thumbnailUrl}
				className="w-full h-[56.25vw] object-cover brightness-[60%] transition duration-500"
				autoPlay
				muted
				loop
				src={data?.videoUrl}
				disablePictureInPicture
				disableRemotePlayback
				controlsList="nodownload noplaybackrate nofullscreen"
				webkit-playsinline
				playsInline
			></video>
			<div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
				<p className="text-white text-1xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
					{data?.title}
				</p>
				<p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
					{data?.description}
				</p>
				<div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
					<PlayButton movieId={data?.id} />
					<button
						onClick={() => {
							handleOpenModal();
						}}
						className="
                            bg-white
                            text-white
                            bg-opacity-30 
                            rounded-md 
                            py-1 md:py-2 
                            px-2 md:px-4
                            w-auto 
                            text-xs lg:text-lg 
                            font-semibold
                            flex
                            flex-row
                            items-center
                            hover:bg-opacity-20
                            transition
                        "
					>
						<AiOutlineInfo className="w-4 md:w-7 mr-1" />
						More Info
					</button>
				</div>
			</div>
		</div>
	);
};
export default Billboard;
