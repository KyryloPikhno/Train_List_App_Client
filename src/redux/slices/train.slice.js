import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {trainService} from "../../services";


const initialState = {
    trains: [],
    loading: false,
    error: null,
};

const getAll = createAsyncThunk(
    'trainSlice/getAll',
    async ({from_city, to_city, date}, {rejectWithValue}) => {
        try {
            const {data} = await trainService.getAll(from_city, to_city, date);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

const create = createAsyncThunk(
    'trainSlice/create',
    async ({train}, {rejectWithValue}) => {
        try {
            const {data} = await trainService.create(train);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

const update = createAsyncThunk(
    'trainSlice/update',
    async ({trainId, train}, {rejectWithValue}) => {
        try {
            const {data} = await trainService.update(trainId,train);
            return data;
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

const deleteById = createAsyncThunk(
    'trainSlice/deleteById',
    async ({trainId}, {rejectWithValue}) => {
        try {
            await trainService.delete(trainId);
            return trainId;
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

const trainSlice = createSlice({
    name: 'trainSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.trains = action.payload;
                state.error = null;
                state.loading = false;
            })
            .addCase(getAll.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(getAll.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(create.fulfilled, (state, action) => {
                state.trains.push(action.payload);
                state.error = null;
                state.loading = false;
            })
            .addCase(create.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(create.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(update.fulfilled, (state, action) => {
                const find = state.trains.find(train => train._id === action.payload._id);
                Object.assign(find, action.payload);
                state.error = null;
                state.loading = false;
            })
            .addCase(update.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(update.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteById.fulfilled, (state, action) => {
                const index = state.trains.findIndex(train => train._id === action.payload);
                state.trains.splice(index, 1);
                state.error = null;
                state.loading = false;
            })
            .addCase(deleteById.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(deleteById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
});

const {reducer: trainReducer} = trainSlice;

const trainActions = {
    getAll,
    create,
    update,
    deleteById,
};

export {trainReducer, trainActions};
