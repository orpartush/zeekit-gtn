import PropTypes from 'prop-types';

export default function DarkScreen({ setIsActive }) {
    const handleDarkScreenClick = () => {
        try {
            setIsActive(false);
        } catch (err) {
            console.error('Error while handling dark screen click', err);
        }
    };

    return <div className="dark-screen" onClick={handleDarkScreenClick}></div>;
}
DarkScreen.propTypes = {
    setIsActive: PropTypes.func,
};
