import "./Loader.scss";

export const Loader: React.FC = () => {
    return (
        <div className="loader-wrapper">
            <div className="loader">
                <div className="loader__segment" />
                <div className="loader__segment" />
                <div className="loader__segment" />
            </div>
        </div>
    );
};

