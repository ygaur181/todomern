import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const URL = "http://localhost:4000/api/v1/todo";

export const fetchedData = createAsyncThunk('fetchdata', async(token)=>{
    const data = (await fetch(URL, {
        headers : {
            "authorization" : `Bearer ${token}`
        }
    })).json();
    return data;
})

export const postData = createAsyncThunk('postData', async(postData)=>{
    const {entry, token} = postData;
    const data = await fetch(URL, {
        method : "POST",
        headers : {
                "Content-Type" : "application/json",
                "authorization" : `Bearer ${token}`
        },
        body : JSON.stringify({
                "taskName" : entry
        })
    }).json();
    return data;
})

export const deleteData = createAsyncThunk('deleteData', async(deleteObj)=>{
    const {id, tok} = deleteObj;
    const data = await fetch(`${URL}/${id}`, {
        method : "DELETE",
        headers : {
            "authorization" : `Bearer ${tok}`
        }
    })
    return data;
})


export const updateNewData = createAsyncThunk('updateData', async({newdata, token})=>{
    const data = await fetch(`${URL}update/${newdata.id}`, {
        method : "PUT",
        headers : {
                "Content-Type" : "application/json",
                "authorization" : `Bearer ${token}`
        },
        body : JSON.stringify({
                "taskName" : newdata.updateData
        })
    }).json();
    return data;
})



const todoSlice = createSlice({
    name : 'todo',
    initialState : {
        isLoading : false,
        isError : false,
        isUpdating : false,
        data : null
    },
    extraReducers : (builder)=>{
        builder.addCase(fetchedData.pending, (state, action)=>{
            state.isLoading = true
        })
        .addCase(fetchedData.fulfilled, (state, action)=>{
            state.isLoading = false
            state.data = action.payload
        })
        .addCase(fetchedData.rejected, (state, action)=>{
            state.isLoading = false
            state.data = null
            state.isError = true
        })
        .addCase(postData.pending, (state, action)=>{
            state.isUpdating = true
        })
        .addCase(postData.fulfilled, (state, action)=>{
            state.isUpdating = false
        })
        .addCase(postData.rejected, (state, action)=>{
            state.isUpdating = false
            state.isError = true
        })
        .addCase(deleteData.pending, (state, action)=>{
            state.isUpdating = true
        })
        .addCase(deleteData.fulfilled, (state, action)=>{
            state.isUpdating = false
        })
        .addCase(deleteData.rejected, (state, action)=>{
            state.isUpdating = false
            state.isError = true
        })
        .addCase(updateNewData.pending, (state, action)=>{
            state.isUpdating = true
        })
        .addCase(updateNewData.fulfilled, (state, action)=>{
            state.isUpdating = false
        })
        .addCase(updateNewData.rejected, (state, action)=>{
            state.isUpdating = false
            state.isError = true
        })
    }
})

export default todoSlice.reducer;