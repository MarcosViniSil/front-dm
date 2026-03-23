import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { quizService } from '../../services';
import type { QuizQuestion, QuizOption } from '../../services';
import './Quiz.css';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

interface ParsedQuestion extends Omit<QuizQuestion, 'options'> {
  parsedOptions: QuizOption[];
}

function Quiz() {
  const { id } = useParams<{ id: string }>();
  const [questions, setQuestions] = useState<ParsedQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [hits, setHits] = useState(0);
  const [fails, setFails] = useState(0);
  const [finished, setFinished] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answerResult, setAnswerResult] = useState<'correct' | 'incorrect' | null>(null);
  const [counter,setCounter] = useState<number>(-1);
  const [answerDetails, setAnswerDetails] = useState<string>("");

  useEffect(() => {
    async function loadQuiz() {
      if (!id) return;
      try {
        setLoading(true);
        const data = await quizService.getQuizByAnimalId(Number(id));

        const parsed = data.map((q) => {
          let parsedOptions: QuizOption[] = [];
          try {
            parsedOptions = JSON.parse(q.options);
          } catch (e) {
            console.error('Failed to parse options for question', q.code);
          }
          return { ...q, parsedOptions };
        });

        setQuestions(parsed);
      } catch (err: any) {
        setError(err.message || 'Erro ao carregar o quiz.');
      } finally {
        setLoading(false);
      }
    }
    loadQuiz();
  }, [id]);

  const handleAnswer = async (optionId: number) => {
    if (submitting || answerResult) return;

    setSelectedOption(optionId);
    setSubmitting(true);

    const currentQuestion = questions[currentIndex];
    let n:number = 4000
    try {
      const response = await quizService.submitAnswer({
        questionCode: currentQuestion.code,
        userAnswer: optionId
      });

      const isCorrect = response?.isAnswerRight === true;
      
      if (isCorrect) {
        setHits(h => h + 1);
        setAnswerResult('correct');
      } else {
        setFails(f => f + 1);
        setAnswerResult('incorrect');
        setAnswerDetails(response.answerDetails ? `Detalhes da resposta: ${response.answerDetails}` : "");
        n = 10000
      }
      counterDown(Math.floor(n/1000))
      changeToNextQuestion(n);


    } catch (err: any) {
      console.error('Error submitting answer:', err);
      setFails(f => f + 1);
      setAnswerResult('incorrect');
      counterDown(n)  
      changeToNextQuestion(n);
    }
  };

  const changeToNextQuestion = (n:number) => {
    setTimeout(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(c => c + 1);
      setAnswerResult(null);
      setSelectedOption(null);
    } else {
      setFinished(true);
    }
    setSubmitting(false);
    setAnswerDetails("");
    },n)

  }

const counterDown = (start: number) => {
  setCounter(start);

  const interval = setInterval(() => {
    setCounter((prev) => {
      if (prev <= 1) {
        clearInterval(interval);
        return 0;
      }
      return prev - 1;
    });
  }, 1000);
};

const defineMessageCounter = () => {
  if(currentIndex === questions.length - 1 && counter != -1){
    return `Resultados em ${counter}`
  }else if(counter > 0){
    return `Próxima pergunta em ${counter}`
  }else if(answerDetails){
    return ""
  }
}

  if (loading) {
    return (
      <div className="page quiz-page flex-center">
        <div className="quiz-loading">Carregando quiz...🌿</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page quiz-page flex-center">
        <div className="quiz-error">
          <p>{error}</p>
          <Link to="/" className="quiz-btn">Voltar para Home</Link>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="page quiz-page flex-center">
        <div className="quiz-empty">
          <p>Nenhuma pergunta encontrada.Aguarde novas perguntas.</p>
          <Link to="/" className="quiz-btn">Voltar para Home</Link>
        </div>
      </div>
    );
  }

  if (finished) {
    const total = hits + fails;
    const hitPercentage = total > 0 ? Math.round((hits / total) * 100) : 0;

    return (
      <>
        <div className="page quiz-page flex-center-result">

          <div className="quiz-card result-card">
            <h1 className="quiz-title">Resultado do Quiz</h1>

            <div className="quiz-graphic">
              <div
                className="chart-circle"
                style={{ background: `conic-gradient(var(--color-forest-green) ${hitPercentage}%, var(--color-terracotta-orange) 0)` }}
              >
                <div className="chart-inner">
                  <span>{hitPercentage}%</span>
                </div>
              </div>

              <div className="chart-legend">
                <div className="legend-item">
                  <span className="legend-color hit-color"></span>
                  <span>Acertos: {hits}</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color fail-color"></span>
                  <span>Erros: {fails}</span>
                </div>
              </div>
            </div>

            <p className="quiz-feedback-text">
              {hitPercentage >= 70 ? 'Ótimo trabalho! Você conhece bem nossa fauna!' : 'Continue aprendendo sobre nossos animais!'}
            </p>

            <Link to="/" className="quiz-btn">Voltar para a página inicial</Link>
          </div>
        </div>
      </>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <>
      <h1 className='titleQuizPage'>É hora de praticar!</h1>
      <p className='answerDetails'>{defineMessageCounter()}</p>
      <div className="page quiz-page flex-center">
        <div className="quiz-card">
          <div className="quiz-progress">
            Pergunta {currentIndex + 1} de {questions.length}
          </div>

          <h2 className="quiz-statement">{currentQuestion.statement}</h2>

          <div className="quiz-options">
            {currentQuestion.parsedOptions.map((option) => {
              const isSelected = selectedOption === option.id;

              let btnClass = 'quiz-option-btn';
              if (isSelected) {
                if (answerResult === 'correct') btnClass += ' correct';
                if (answerResult === 'incorrect') btnClass += ' incorrect';
                if (submitting && !answerResult) btnClass += ' selected';
              }

              return (
                <button
                  key={option.id}
                  className={btnClass}
                  onClick={() => handleAnswer(option.id)}
                  disabled={submitting || answerResult !== null}
                >
                  {option.value}
                  {isSelected && answerResult === 'correct' && <FaCheckCircle className="result-icon" />}
                  {isSelected && answerResult === 'incorrect' && <FaTimesCircle className="result-icon" />}
                </button>
              );
            })}
          </div>
        </div>

      </div>
      <p className='answerDetails'>{answerDetails}</p>
    </>
  );
}

export default Quiz;
