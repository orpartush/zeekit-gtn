import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { UtilService } from '../../services/UtilService';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { StorageService } from '../../services/StorageService';

export default function Quiz({ tvShows, setIsPopupOn }) {
    const [currentTvShowIndex, setCurrentTvShowIndex] = useState(0);
    const [currentTvShow, setCurrentTvShow] = useState(null);
    const [lifePoints, setLifePoints] = useState(3);
    const [hintsNumber, setHintsNumber] = useState(3);
    const [isGameOver, setIsGameOver] = useState(false);
    const [hiddenName, setHiddenName] = useState('');
    const [userGuess, setUserGuess] = useState('');
    const [hint, setHint] = useState('');

    useEffect(() => {
        if (tvShows) {
            setCurrentTvShow(tvShows[currentTvShowIndex]);
        }
    }, [tvShows, currentTvShowIndex]);

    const handleRestartClick = () => {
        try {
            setUserGuess('');
            setCurrentTvShowIndex(0);
            setLifePoints(3);
            setHintsNumber(3);
            setIsGameOver(false);
        } catch (err) {
            console.error('Error from handleRestartClick', err);
        }
    };

    const handleWin = () => {
        try {
            Swal.fire({
                icon: 'success',
                title: 'You Win!',
                text: 'Good job 😁',
                showConfirmButton: false,
                timer: 1500,
            });

            setIsGameOver(true);
        } catch (err) {
            console.error('Error from handleWin', err);
        }
    };

    const handleLose = () => {
        try {
            Swal.fire({
                icon: 'error',
                title: 'You Lose!',
                text: 'Keep trying! 😵',
                showConfirmButton: false,
                timer: 1500,
            });

            setIsGameOver(true);
        } catch (err) {
            console.error('Error from handleLose', err);
        }
    };

    const handleCorrectGuess = () => {
        try {
            StorageService.store('correctAnswers', StorageService.load('correctAnswers') + 1);

            const isLastQuestion = tvShows.length - 1 === currentTvShowIndex;
            if (isLastQuestion) {
                handleWin();
                return;
            }

            setCurrentTvShowIndex(currentTvShowIndex + 1);
        } catch (err) {
            console.error('Error from handleCorrectGuess', err);
        }
    };

    const handleIncorrectGuess = () => {
        try {
            StorageService.store('wrongAnswers', StorageService.load('wrongAnswers') + 1);

            setLifePoints(lifePoints - 1);

            if (lifePoints === 1) {
                handleLose();
                return;
            }

            Swal.fire({
                icon: 'error',
                title: 'You are wrong',
                text: `Try again!`,
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (err) {
            console.error('Error from handleCorrectGuess', err);
        }
    };

    const handleUserGuess = userGuess => {
        try {
            if (!userGuess || userGuess === '') {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid Guess!',
                    text: `Can't submit empty guess`,
                    showConfirmButton: false,
                    timer: 1500,
                });
                return;
            }

            if (isGameOver) {
                Swal.fire({
                    icon: 'error',
                    title: 'The Game is Over!',
                    text: 'Click on restart to play again',
                    showConfirmButton: false,
                    timer: 1500,
                });
                return;
            }

            const isCorrectGuess = currentTvShow.name.toLowerCase() === userGuess.toLowerCase();

            if (isCorrectGuess) handleCorrectGuess();
            else handleIncorrectGuess();
        } catch (err) {
            console.error('Error from handleUserGuess', err);
        }
    };

    useEffect(() => {
        const initQuiz = () => {
            try {
                setUserGuess('');
                setHiddenName(UtilService.getHiddenString(currentTvShow.name));
                setHint(currentTvShow.overview);
            } catch (err) {
                console.error('Error while initialize quiz', err);
            }
        };

        if (currentTvShow) initQuiz();
    }, [currentTvShow]);

    const handleSubmit = e => {
        try {
            e.preventDefault();
            handleUserGuess(userGuess);
        } catch (err) {
            console.error('Error from handleSubmit', err);
        }
    };

    const handleHintClick = () => {
        try {
            if (hintsNumber === 0) return;

            Swal.fire({
                icon: 'info',
                title: 'Here is your hint:',
                text: hint,
                showConfirmButton: true,
            });

            setHintsNumber(hintsNumber - 1);
            StorageService.store('usedHints', StorageService.load('usedHints') + 1);
        } catch (err) {
            console.error('Error from handleHintClick');
        }
    };

    return !currentTvShow ? (
        <p>Loading...</p>
    ) : (
        <div className="quiz">
            <section className="status-bar flex align-center space-evenly">
                <p className="life-points">Life Points: {lifePoints}</p>
                <p className="hints">Hints Left: {hintsNumber}</p>
            </section>
            <section className="hidden-name">{hiddenName}</section>
            <form onSubmit={e => handleSubmit(e)} className="flex flex-column">
                <input
                    type="text"
                    placeholder="Enter your guess here"
                    value={userGuess}
                    onChange={e => setUserGuess(e.target.value)}
                />
                <section className="top-btns">
                    <button type="submit" className="submit-btn">
                        Check the guess
                    </button>
                    <button className="hint-btn" type="button" onClick={handleHintClick}>
                        Hint
                    </button>
                </section>
                <section className="bottom-btns flex justify-center">
                    <button type="button" className="restart-btn" onClick={handleRestartClick}>
                        Restart
                    </button>
                    <button type="button" className="statistic-btn" onClick={() => setIsPopupOn(true)}>
                        Statistic
                    </button>
                </section>
            </form>
        </div>
    );
}

Quiz.propTypes = {
    tvShow: PropTypes.object,
    handleUserGuess: PropTypes.func,
};
