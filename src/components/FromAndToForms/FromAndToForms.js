import {joiResolver} from "@hookform/resolvers/joi";
import 'react-datepicker/dist/react-datepicker.css';
import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import DatePicker from 'react-datepicker';
import {useForm} from "react-hook-form";


import {FromAndToFormsValidator} from "../../validators";
import css from './FromAndToForms.module.css';
import moment from "moment";


const FromAndToForms = () => {
    const {register, handleSubmit, setValue, formState: {errors, isValid}} = useForm({
        defaultValues: {"from_city": null, "to_city": null},
        resolver: joiResolver(FromAndToFormsValidator),
        mode: 'onChange'
    });

    const [query, setQuery] = useSearchParams();

    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        if(query.get('from_city')){
            setValue('from_city', query.get('from_city'));
        }
        if(query.get('to_city')){
            setValue('to_city', query.get('to_city'));
        }
    }, [query]);

    const handleDateChange = (date) => {
        if (date) {
            setSelectedDate(date);
            setValue('date', date.toISOString().substring(0, 10));
        }
    };

    const submit = async (obj) => {
        try {
            const {from_city, to_city, date} = obj;

            let formattedDate = null;

            if (date) {
                formattedDate = moment(obj.date).format('YYYY-MM-DD');
            }
            console.log(from_city, to_city, formattedDate);

            let findObj = {};

            if (from_city) {
                findObj = {...findObj, from_city}
            }

            if (to_city) {
                findObj = {...findObj, to_city}
            }

            if (date) {
                findObj = {...findObj}
            }

            if (formattedDate) {
                findObj = {...findObj, formattedDate}
            }

            setQuery(findObj);
        } catch (e) {
            console.log(e.message);
        }
    };

    return (
        <form className={css.form} onSubmit={handleSubmit(submit)}>

            {errors.from_city && <span className={css.from_cityErr}>{errors.from_city.message}</span>}
            <input type='text' placeholder={'from city'} {...register('from_city')}/>

            {errors.to_city && <span className={css.to_cityErr}>{errors.to_city.message}</span>}
            <input type='text' placeholder={'to city'} {...register('to_city')}/>

            <div>
                <DatePicker
                    placeholder={'date'}
                    selected={selectedDate}
                    onChange={handleDateChange}
                    minDate={new Date()}
                    maxDate={new Date(new Date().setMonth(new Date().getMonth() + 1))}
                    dateFormat="yyyy-MM-dd"
                    placeholderText={query.get('formattedDate') || "select a date"}
                />
            {errors.date && <span className={css.dateErr}>{errors.date.message}</span>}

            </div>
            <button className={!isValid ? css.noValidButton : css.validButton} disabled={!isValid}>
                Submit
            </button>

        </form>
    );
};

export {FromAndToForms};
