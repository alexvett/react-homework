import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPostsApi } from '../assets/data.js';

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async () => {
        const response = await fetchPostsApi();
        return response;
    }
);

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        updatePost: (state, action) => {
            const { postId, updatedFields } = action.payload;
            const existingPost = state.items.find(post => post.id === postId);
            if (existingPost) {
                Object.assign(existingPost, updatedFields);
            }
        },
        
        updateComment: (state, action) => {
            const { postId, commentId, updatedFields } = action.payload;
            const post = state.items.find(p => p.id === postId);

            if (post) {
                const comment = post.comments.find(c => c.id === commentId);
                if (comment) {
                    Object.assign(comment, updatedFields);
                }
            }
        },
        
        sortPosts: (state, action) => {
            const criteria = action.payload;
            
            let sortedPosts = [...state.items];

            if (criteria === 'newest') {
                sortedPosts.sort((a, b) => b.createdAt - a.createdAt);
            } else if (criteria === 'oldest') {
                sortedPosts.sort((a, b) => a.createdAt - b.createdAt);
            } else if (criteria === 'likes') {
                sortedPosts.sort((a, b) => b.currentLikes - a.currentLikes);
            }

            state.items = sortedPosts;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { updatePost, updateComment, sortPosts } = postsSlice.actions;

export default postsSlice.reducer;