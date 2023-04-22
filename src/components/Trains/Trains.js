import {FromAndToForms} from "../FromAndToForms/FromAndToForms";
import {useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

import {trainActions} from "../../redux/slices/train.slice";
import css from './Trains.module.css';


const Trains = () => {
    const {trains} = useSelector(state => state.trainReducer);

    console.log(trains);

    const [query] = useSearchParams();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(trainActions.getAll({
            from_city: query.get('from_city') || null,
            to_city: query.get('to_city') || null,
            date: query.get('formattedDate') || null
        }))
    }, [query]);

    return (
        <div className={css.container}>
           <FromAndToForms/>
            <div>

            </div>
        </div>
    );
};

export {Trains};
