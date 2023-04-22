import css from './Train.module.css';


const Train = ({train}) => {

    return (
        <div className={css.train}>
            <div className={css.field}>
                {train.name}
            </div>
            <div className={css.field}>
                from: {train.from_city}
            </div>
            <div className={css.field}>
                to: {train.to_city}
            </div>
            <div className={css.field}>
                {train.date}
            </div>
        </div>
    );
};

export {Train};
