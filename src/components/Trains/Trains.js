import {FromAndToForms} from "../FromAndToForms/FromAndToForms";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

import {trainActions} from "../../redux/slices/train.slice";
import {Train} from "../Train/Train";
import css from './Trains.module.css';


const Trains = () => {
    const {trains, loading} = useSelector(state => state.trainReducer);

    const [query] = useSearchParams();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const from_city = query.get('from_city');
    const to_city = query.get('to_city');
    const date = query.get('formattedDate');

    useEffect(() => {
        dispatch(trainActions.getAll({
            from_city,
            to_city,
            date
        }))
    }, [query]);

    return (
        <div className={css.container}>
            <FromAndToForms/>
            {(loading && (from_city || to_city || date)) ?
                <div className={css.loaderBox}>
                    <div className={css.loader}></div>
                </div>
                :
                <div className={css.trains}>
                    {
                        trains.length !== 0 ? trains.map(train => <Train key={train.id} train={train}/>)
                            :
                            <h1>{from_city || to_city || date ? 'Trains not found' : []}</h1>
                    }

                    {(trains.length !== 0 || (from_city || to_city || date)) &&
                        <div className={css.buttonBox}>
                            <button className={css.button} onClick={() => navigate('/')}>Clear</button>
                        </div>
                    }

                </div>
            }
        </div>
    );
};

export {Trains};
