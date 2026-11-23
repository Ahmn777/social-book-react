import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addPost,
  editPost,
  deletePost,
  toggleComments,
  addComment,
  deleteComment,
} from "./store/postsSlice";

function App() {
  const posts = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();
  const [newPost, setNewPost] = useState("");
  const [editingPost, setEditingPost] = useState(null);
  const [editText, setEditText] = useState("");

  const submitPost = (event) => {
    event.preventDefault();
    const text = newPost.trim();
    if (!text) return;
    dispatch(addPost(text));
    setNewPost("");
  };

  const saveEdit = (event) => {
    event.preventDefault();
    const text = editText.trim();
    if (!text || !editingPost) return;
    dispatch(editPost({ id: editingPost, text }));
    setEditingPost(null);
    setEditText("");
  };

  return (
    <main className="page">
      <div className="content">
        <form className="new-post panel" onSubmit={submitPost}>
          <input
            value={newPost}
            onChange={(event) => setNewPost(event.target.value)}
            placeholder="Новый пост ..."
            aria-label="Текст нового поста"
          />
          <button className="button primary add-post-button" type="submit">Добавить</button>
        </form>

        <section className="posts" aria-label="Публикации">
          {posts.map((post) => (
            <article className="post panel" key={post.id}>
              <p className="post-text">{post.text}</p>
              <div className="post-actions">
                <button className="button primary" onClick={() => dispatch(toggleComments(post.id))}>
                  {post.commentsOpen ? "Скрыть комментарии" : "Комментарии"}
                </button>
                <span className="comment-count">Количество комментарий - {post.comments.length}</span>
                <div className="post-action-buttons">
                  <button
                    className="button primary"
                    onClick={() => { setEditingPost(post.id); setEditText(post.text); }}
                  >Изменить</button>
                  <button className="button danger" onClick={() => dispatch(deletePost(post.id))}>Удалить</button>
                </div>
              </div>

              {post.commentsOpen && (
                <div className="comments">
                  <CommentForm postId={post.id} />
                  <div className="comment-list">
                    {post.comments.map((comment) => (
                      <div className="comment-row" key={comment.id}>
                        <p className="comment-card">{comment.text}</p>
                        <button
                          className="button danger comment-delete"
                          onClick={() => dispatch(deleteComment({ postId: post.id, commentId: comment.id }))}
                        >Удалить</button>
                      </div>
                    ))}
                    {post.comments.length === 0 && <p className="empty-comments">Пока нет комментариев. Будьте первым!</p>}
                  </div>
                </div>
              )}
            </article>
          ))}
          {posts.length === 0 && <div className="empty-state panel">Постов пока нет. Создайте первую публикацию!</div>}
        </section>
      </div>

      {editingPost && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setEditingPost(null);
        }}>
          <form className="edit-modal panel" onSubmit={saveEdit} role="dialog" aria-modal="true" aria-label="Изменение поста">
            <textarea
              value={editText}
              onChange={(event) => setEditText(event.target.value)}
              aria-label="Изменить текст поста"
              autoFocus
            />
            <div className="modal-actions">
              <button className="button primary" type="submit">Подтвердить</button>
              <button className="button danger" type="button" onClick={() => setEditingPost(null)}>Закрыть</button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}

function CommentForm({ postId }) {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const submitComment = (event) => {
    event.preventDefault();
    const value = text.trim();
    if (!value) return;
    dispatch(addComment({ postId, text: value }));
    setText("");
  };

  return (
    <form className="comment-form" onSubmit={submitComment}>
      <input
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Новый комментарий ..."
        aria-label="Новый комментарий"
      />
      <button className="button primary" type="submit">Добавить</button>
    </form>
  );
}

export default App;
