import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const URL = "/api/auth"

export const signUp = createAsyncThunk('signUp', async({email, password, confirmP}, {rejectWithValue})=>{
    const obj = {
        "email" : email,
        "password" : password,
        "confirm" : confirmP
    }

    try {
        const user = await fetch(`${URL}/signup`, {
            method : "POST",
            headers : {
                    "Content-Type" : "application/json"
            },
            body : JSON.stringify(obj)
        })
        const userData = await user.json();
        if(user.status === 501){
            throw Error(String(userData.err));
        }

        return userData;
    } catch (error) {
        return rejectWithValue(error.message);
    }
})

export const signIn = createAsyncThunk("Signin", async({email, password}, {rejectWithValue})=>{
    const obj = {email, password};
    try {
        const user = await fetch(`${URL}/login`, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json" 
            },
            body : JSON.stringify(obj)
        })
        const userData = await user.json();
        if(user.status === 501){
            throw Error(String(userData.err));
        }
        return userData;
    } catch (error) {
        return rejectWithValue(error.message)
    }
})


const authSlice = createSlice({
    name : "authSlice",
    initialState : {
        user : null,
        isLoading : false,
        error : null
    },
    extraReducers : (builder)=>{
        builder.addCase(signUp.pending, (state)=>{
            state.isLoading = true;
            state.error = null;
            state.user = null;
        })
        .addCase(signUp.fulfilled, (state, action)=>{
            state.user = action.payload;
            state.isLoading = false;
            state.error = null;
        })
        .addCase(signUp.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.payload;    
            state.user = null;             
        })
        .addCase(signIn.pending, (state)=>{
            state.isLoading = true;
            state.error = null;
            state.user = null;
        })
        .addCase(signIn.fulfilled, (state, action)=>{
            state.user = action.payload;
            state.isLoading = false;
            state.error = null;
        })
        .addCase(signIn.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.payload;    
            state.user = null;             
        })
    },

    reducers : {
        addWithToken : (state, action)=>{
            state.user = JSON.parse(action.payload);
            state.error = null;
            state.isLoading = false;
        },
        removeUser : (state)=>{
            state.user = null;
            state.error = null;
            state.isLoading = false;
        }
    }
})

export const {addWithToken, removeUser} = authSlice.actions
export default authSlice.reducer;