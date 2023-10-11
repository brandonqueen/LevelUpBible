import {
	setChapterCompleted,
	updateProgress,
} from "../../../../features/globalData/globalDataSlice";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import NoQuizConfirm from "../NoQuizConfirm/NoQuizConfirm";
import QuizSuccess from "../QuizSuccess/QuizSuccess";
import ModalPopup from "../../../molecules/ModalPopup/ModalPopup";

const NoQuizModal = ({
	modalOpen,
	modalToggle,
	numOfVerses,
	currentQuizBooks,
	testamentIndex,
	bookIndex,
	bookName,
	chapterIndex,
	rewards,
}) => {
	//GLOBAL STATE
	const dispatch = useDispatch();

	//LOCAL STATE
	const [confirmedRead, setConfirmedRead] = useState(false);

	//PRESS HANDLER
	const handleConfirmPressed = () => {
		dispatch(
			setChapterCompleted({
				testamentIndex: testamentIndex,
				bookIndex: bookIndex,
				chapterIndex: chapterIndex,
			})
		);
		dispatch(
			updateProgress({
				points: numOfVerses,
			})
		);
		setConfirmedRead(true);
	};

	return (
		<ModalPopup modalOpen={modalOpen} modalToggle={modalToggle}>
			{confirmedRead ? (
				<QuizSuccess
					numOfVerses={numOfVerses}
					modalToggle={modalToggle}
					rewards={rewards}
				/>
			) : (
				<NoQuizConfirm
					bookName={bookName}
					currentQuizBooks={currentQuizBooks}
					modalToggle={modalToggle}
					handleConfirmPressed={handleConfirmPressed}
				/>
			)}
		</ModalPopup>
	);
};

export default NoQuizModal;
