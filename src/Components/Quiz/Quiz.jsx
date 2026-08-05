import { useTranslation } from 'react-i18next';
import './quiz.css';

export default function Quiz() {
    const { t } = useTranslation();
    return (
        <div className="quiz-container">
            <h1>{t("quizTitle")}</h1>
            <h3>{t("quizDesc")}</h3>
            <h3>{t("quizDesc2")}</h3>
            <div className="btn-quiz">
                {t("quizBtn")}
            </div>
        </div>
    )
}