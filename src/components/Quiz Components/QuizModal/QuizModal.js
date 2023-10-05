import { useState } from "react";
import { ScrollView } from "react-native";
import QuizSuccess from "../QuizSuccess/QuizSuccess";
import ModalPopup from "../../ModalPopup/ModalPopup";
import QuizContent from "../QuizContent/QuizContent";
import QuizChoices from "../QuizChoices/QuizChoices";

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
			backgroundColor={"#352b8c"}
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
