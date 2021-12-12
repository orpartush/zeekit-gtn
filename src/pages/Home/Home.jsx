import { useEffect, useState } from 'react';
import Quiz from '../../components/Quiz/Quiz';
import { StorageService } from '../../services/StorageService';
import { TvShowService } from '../../services/TvShowService';
import StatisticPopup from '../../components/StatisticPopup/StatisticPopup';
import DarkScreen from '../../components/StatisticPopup/DarkScreen/DarkScreen';

export default function Home() {
    const [tvShowList, setTvShowList] = useState([]);
    const [isStatisticPopupActive, setIsStatisticPopupActive] = useState(false);

    useEffect(() => {
        const getTvShowList = async () => {
            try {
                const tvShows = await TvShowService.query();
                setTvShowList(tvShows);

                StorageService.store('correctAnswers', 0);
                StorageService.store('wrongAnswers', 0);
                StorageService.store('usedHints', 0);
            } catch (err) {
                console.error('Error from getTvShowList', err);
            }
        };
        getTvShowList();
    }, []);

    return (
        <div className="home">
            {isStatisticPopupActive && <DarkScreen setIsActive={setIsStatisticPopupActive} />}
            {isStatisticPopupActive && <StatisticPopup setIsActive={setIsStatisticPopupActive} />}
            <header>
                <p className="title">Guess The TV Show</p>
            </header>
            <main className="quiz-container">
                <Quiz tvShows={tvShowList} setIsPopupOn={setIsStatisticPopupActive} />
            </main>
        </div>
    );
}
