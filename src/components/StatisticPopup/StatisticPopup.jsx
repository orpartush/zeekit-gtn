import { useEffect, useState } from 'react';
import { StorageService } from '../../services/StorageService';

export default function StatisticPopup({ setIsActive }) {
    const [statistics, setStatistics] = useState(null);
    useEffect(() => {
        try {
            setStatistics({
                correctGuesses: StorageService.load('correctAnswers'),
                incorrectGuesses: StorageService.load('wrongAnswers'),
                hints: StorageService.load('usedHints'),
            });
        } catch (err) {
            console.error('Error while setting statistics', err);
        }
    }, []);

    const handleClosePopup = () => {
        try {
            setIsActive(false);
        } catch (err) {
            console.error('Error while handling close popup click', err);
        }
    };

    return (
        <div className="statistic-popup">
            <p className="popup-title">Your Statistics</p>
            {statistics && (
                <section className="info">
                    <p className="correct">Correct Guesses: {statistics.correctGuesses}</p>
                    <p className="incorrect">Incorrect Guesses: {statistics.incorrectGuesses}</p>
                    <p className="hints">Hints: {statistics.hints}</p>
                </section>
            )}
            <button className="close-popup" onClick={handleClosePopup}>
                Close
            </button>
        </div>
    );
}
