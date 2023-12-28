import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const URL = "http://localhost:4001/api/v1/todo";

export const fetchedData = createAsyncThunk('fetchdata', async()=>{
    const data = (await fetch(URL)).json();
    return data;
})

export const postData = createAsyncThunk('postData', async(task)=>{
    const data = await fetch(URL, {
        method : "POST",
        headers : {
                "Content-Type" : "application/json"
        },
        body : JSON.stringify({
                "taskName" : task
        })
    }).json();
    console.log(data)
    return data;
})

export const deleteData = createAsyncThunk('deleteData', async(id)=>{
    const data = await fetch(`${URL}/${id}`, {
        method : "DELETE",
    })
    return data;
})


export const updateNewData = createAsyncThunk('updateData', async(newdata)=>{
    const data = await fetch(`${URL}update/${newdata.id}`, {
        method : "PUT",
        headers : {
                "Content-Type" : "application/json"
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
            state.data = action.payload
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