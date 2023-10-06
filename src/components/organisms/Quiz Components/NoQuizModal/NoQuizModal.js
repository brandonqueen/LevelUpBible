import {
	setChapterCompleted,
	updateProgress,
} from "../../../../features/globalData/globalDataSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import ModalPopup from "../../../molecules/ModalPopup/ModalPopup";
import QuizSuccess from "../QuizSuccess/QuizSuccess";
import NoQuizConfirm from "../NoQuizConfirm/NoQuizConfirm";

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
	//global state
	const dispatch = useDispatch();

	//local state
	const [confirmedRead, setConfirmedRead] = useState(false);

	//Press handler function
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
