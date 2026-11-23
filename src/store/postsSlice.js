import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  posts: [
    {
      id: "post-1",
      text: "Сегодня было замечательное предложение пойти\nпоужинать этим вечером. Главное, чтобы погода была\nпреимущественно теплой.",
      comments: [
        { id: "comment-1", text: "Первый комментарий о выше сказанном посте ..." },
        { id: "comment-2", text: "Второй комментарий о выше сказанном посте ..." },
      ],
      commentsOpen: false,
    },
    {
      id: "post-2",
      text: "Сегодня было замечательное предложение пойти\nпоужинать этим вечером. Главное, чтобы погода была\nпреимущественно теплой.",
      comments: [],
      commentsOpen: false,
    },
  ],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: {
      reducer(state, action) {
        state.posts.unshift(action.payload);
      },
      prepare(text) {
        return { payload: { id: nanoid(), text, comments: [], commentsOpen: false } };
      },
    },
    editPost(state, action) {
      const post = state.posts.find((item) => item.id === action.payload.id);
      if (post) post.text = action.payload.text;
    },
    deletePost(state, action) {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
    toggleComments(state, action) {
      const post = state.posts.find((item) => item.id === action.payload);
      if (post) post.commentsOpen = !post.commentsOpen;
    },
    addComment(state, action) {
      const { postId, text } = action.payload;
      const post = state.posts.find((item) => item.id === postId);

      if (post) {
        post.comments.push({
          id: nanoid(),
          text,
        });
      }
    },
    deleteComment(state, action) {
      const post = state.posts.find((item) => item.id === action.payload.postId);
      if (post) post.comments = post.comments.filter((comment) => comment.id !== action.payload.commentId);
    },
  },
});

export const {
  addPost,
  editPost,
  deletePost,
  toggleComments,
  addComment,
  deleteComment,
} = postsSlice.actions;

export default postsSlice.reducer;
