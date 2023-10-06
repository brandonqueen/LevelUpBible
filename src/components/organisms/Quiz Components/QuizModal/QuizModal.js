import { useState } from "react";
import { ScrollView } from "react-native";
import QuizSuccess from "../QuizSuccess/QuizSuccess";
import ModalPopup from "../../../molecules/ModalPopup/ModalPopup";
import QuizContent from "../QuizContent/QuizContent";

const QuizModal = ({
	modalOpen,
	modalToggle,
	QuizData,
	numOfVerses,
	testamentIndex,
	bookIndex,
	bookName,
	chapterIndex,
	rewards,
}) => {
	const [quizComplete, setQuizComplete] = useState(false);

	return (
		<ModalPopup
			backgroundColor={"#342a86"}
			modalOpen={modalOpen}
			modalToggle={modalToggle}>
			<ScrollView
				showsVerticalScrollIndicator={false}
				style={{ width: "100%" }}>
				{quizComplete ? (
					<QuizSuccess
						numOfVerses={numOfVerses}
						modalToggle={modalToggle}
						rewards={rewards}
					/>
				) : (
					<QuizContent
						testamentIndex={testamentIndex}
						modalToggle={modalToggle}
						bookName={bookName}
						bookIndex={bookIndex}
						chapterIndex={chapterIndex}
						numOfVerses={numOfVerses}
						QuizData={QuizData}
						setQuizComplete={setQuizComplete}
					/>
				)}
			</ScrollView>
		</ModalPopup>
	);
};

export default QuizModal;
