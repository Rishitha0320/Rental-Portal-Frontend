

// // import { useEffect, useState } from 'react';
// // import API from '../api/api';

// // export default function Community() {
// //   const [posts, setPosts] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [newContent, setNewContent] = useState('');
// //   const [newImage, setNewImage] = useState(null);
// //   const [commentTexts, setCommentTexts] = useState({}); // object to hold comment per post

// //   const userId = localStorage.getItem('userId');

// //   // Fetch posts
// //   const fetchPosts = async () => {
// //     try {
// //       const res = await API.get('/posts');
// //       setPosts(res.data);
// //     } catch (err) {
// //       console.error(err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchPosts();
// //   }, []);

// //   // Create post
// //   const handleCreatePost = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const formData = new FormData();
// //       formData.append('content', newContent);
// //       if (newImage) formData.append('image', newImage);

// //       await API.post('/posts', formData, {
// //         headers: { 'Content-Type': 'multipart/form-data' },
// //       });

// //       setNewContent('');
// //       setNewImage(null);
// //       fetchPosts();
// //     } catch (err) {
// //       console.error('Create Post Error:', err.response?.data || err.message);
// //       alert(err.response?.data?.message || 'Error creating post');
// //     }
// //   };

// //   // Like a post
// //   const handleLike = async (postId) => {
// //     try {
// //       await API.put(`/posts/like/${postId}`);
// //       fetchPosts();
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   // Unlike a post
// //   const handleUnlike = async (postId) => {
// //     try {
// //       await API.put(`/posts/unlike/${postId}`); // make sure your backend has an unlike route
// //       fetchPosts();
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   // Add comment
// //   const handleComment = async (postId) => {
// //     try {
// //       if (!commentTexts[postId]) return;
// //       await API.post(`/posts/comment/${postId}`, { text: commentTexts[postId] });
// //       setCommentTexts({ ...commentTexts, [postId]: '' }); // reset this post's comment
// //       fetchPosts();
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   // Delete post
// //   const handleDelete = async (postId) => {
// //     try {
// //       await API.delete(`/posts/${postId}`);
// //       fetchPosts();
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   if (loading) return <p style={{ textAlign: 'center', marginTop: 50 }}>Loading posts...</p>;

// //   return (
// //     <div style={{ padding: '20px' }}>
// //       <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>🌐 Community Posts</h2>

// //       {/* Create Post Form */}
// //       <form
// //         onSubmit={handleCreatePost}
// //         style={{
// //           display: 'flex',
// //           flexDirection: 'column',
// //           gap: '10px',
// //           marginBottom: '30px',
// //           border: '1px solid #ddd',
// //           padding: '15px',
// //           borderRadius: '12px',
// //           backgroundColor: '#fefefe',
// //           boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
// //         }}
// //       >
// //         <textarea
// //           placeholder="What's on your mind?"
// //           value={newContent}
// //           onChange={(e) => setNewContent(e.target.value)}
// //           rows={3}
// //           style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
// //         />
// //         <input type="file" accept="image/*" onChange={(e) => setNewImage(e.target.files[0])} />
// //         <button
// //           type="submit"
// //           style={{
// //             backgroundColor: '#4CAF50',
// //             color: '#fff',
// //             padding: '10px',
// //             borderRadius: '8px',
// //             border: 'none',
// //             cursor: 'pointer',
// //           }}
// //         >
// //           Post
// //         </button>
// //       </form>

// //       {/* Posts Grid */}
// //       <div
// //         style={{
// //           display: 'grid',
// //           gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
// //           gap: '20px',
// //         }}
// //       >
// //         {posts.length > 0 ? (
// //           posts.map((post) => (
// //             <div
// //               key={post._id}
// //               style={{
// //                 border: '1px solid #ddd',
// //                 borderRadius: '12px',
// //                 padding: '15px',
// //                 backgroundColor: '#f9f9f9',
// //                 boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
// //                 display: 'flex',
// //                 flexDirection: 'column',
// //                 gap: '10px',
// //               }}
// //             >
// //               <p style={{ fontWeight: 'bold', color: '#333' }}>{post.author?.name || 'Unknown'}</p>
// //               <p>{post.content}</p>
// //               {post.image && (
// //                 <img
// //                   src={`http://localhost:8000/uploads/${post.image}`}
// //                   alt="post"
// //                   style={{ width: '100%', borderRadius: '10px', objectFit: 'cover' }}
// //                 />
// //               )}

// //               {/* Like / Unlike Buttons */}
// //               <div style={{ display: 'flex', gap: '10px' }}>
// //                 <button
// //                   onClick={() => handleLike(post._id)}
// //                   style={{
// //                     backgroundColor: '#008CBA',
// //                     color: '#fff',
// //                     padding: '5px 10px',
// //                     border: 'none',
// //                     borderRadius: '6px',
// //                     cursor: 'pointer',
// //                   }}
// //                 >
// //                   👍 Like ({post.likes.length})
// //                 </button>
// //                 <button
// //                   onClick={() => handleUnlike(post._id)}
// //                   style={{
// //                     backgroundColor: '#f39c12',
// //                     color: '#fff',
// //                     padding: '5px 10px',
// //                     border: 'none',
// //                     borderRadius: '6px',
// //                     cursor: 'pointer',
// //                   }}
// //                 >
// //                   👎 Unlike
// //                 </button>
// //               </div>

// //               {/* Delete Button */}
// //               {post.author?._id === userId && (
// //                 <button
// //                   onClick={() => handleDelete(post._id)}
// //                   style={{
// //                     backgroundColor: '#f44336',
// //                     color: '#fff',
// //                     padding: '5px 10px',
// //                     border: 'none',
// //                     borderRadius: '6px',
// //                     cursor: 'pointer',
// //                   }}
// //                 >
// //                   Delete
// //                 </button>
// //               )}

// //               {/* Comments */}
// //               <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
// //                 {post.comments.map((c, idx) => (
// //                   <p key={idx}>
// //                     <strong>{c.author?.name || 'Unknown'}:</strong> {c.text}
// //                   </p>
// //                 ))}

// //                 <div style={{ display: 'flex', gap: '5px' }}>
// //                   <input
// //                     type="text"
// //                     placeholder="Add a comment..."
// //                     value={commentTexts[post._id] || ''}
// //                     onChange={(e) =>
// //                       setCommentTexts({ ...commentTexts, [post._id]: e.target.value })
// //                     }
// //                     style={{ flex: 1, padding: '5px', borderRadius: '6px', border: '1px solid #ccc' }}
// //                   />
// //                   <button
// //                     onClick={() => handleComment(post._id)}
// //                     style={{
// //                       backgroundColor: '#4CAF50',
// //                       color: '#fff',
// //                       border: 'none',
// //                       padding: '5px 10px',
// //                       borderRadius: '6px',
// //                       cursor: 'pointer',
// //                     }}
// //                   >
// //                     Comment
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           ))
// //         ) : (
// //           <p style={{ textAlign: 'center', color: '#888' }}>No posts yet.</p>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// import { useEffect, useState } from "react";
// import API from "../api/api";

// export default function CommunityPage() {
//   const [posts, setPosts] = useState([]);
//   const [caption, setCaption] = useState("");
//   const [image, setImage] = useState(null);
//   const [commentText, setCommentText] = useState("");

//   const fetchPosts = async () => {
//     const res = await API.get("/posts/all");
//     setPosts(res.data);
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   // 🧩 Create Post
//   const handlePost = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("caption", caption);
//     formData.append("image", image);

//     await API.post("/posts/create", formData, {
//       headers: { "Content-Type": "multipart/form-data" }
//     });
//     setCaption("");
//     setImage(null);
//     fetchPosts();
//   };

//   // ❤️ Like/Unlike Post
//   const toggleLike = async (id) => {
//     await API.put(`/posts/${id}/like`);
//     fetchPosts();
//   };

//   // 💬 Comment
//   const addComment = async (id) => {
//     if (!commentText.trim()) return;
//     await API.post(`/posts/${id}/comment`, { text: commentText });
//     setCommentText("");
//     fetchPosts();
//   };

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Community Posts</h1>

//       {/* Create Post */}
//       <form onSubmit={handlePost} className="border p-4 mb-6 rounded-lg">
//         <input
//           type="text"
//           value={caption}
//           onChange={(e) => setCaption(e.target.value)}
//           placeholder="Write a caption..."
//           className="w-full border p-2 mb-2 rounded"
//         />
//         <input type="file" onChange={(e) => setImage(e.target.files[0])} />
//         <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
//           Post
//         </button>
//       </form>

//       {/* Posts Feed */}
//       {posts.map((post) => (
//         <div key={post._id} className="border p-4 mb-4 rounded-lg">
//           <img
//             src={`http://localhost:8000/uploads/${post.image}`}
//             alt="Post"
//             className="w-full rounded mb-2"
//           />
//           <p className="font-semibold">{post.userId?.name}</p>
//           <p className="mb-2">{post.caption}</p>

//           <button
//             onClick={() => toggleLike(post._id)}
//             className="text-blue-600 font-semibold"
//           >
//             ❤️ {post.likes.length} Like
//           </button>

//           {/* Comments */}
//           <div className="mt-3">
//             <input
//               type="text"
//               value={commentText}
//               onChange={(e) => setCommentText(e.target.value)}
//               placeholder="Add a comment..."
//               className="border p-1 w-2/3 rounded"
//             />
//             <button
//               onClick={() => addComment(post._id)}
//               className="ml-2 bg-gray-200 px-2 py-1 rounded"
//             >
//               Comment
//             </button>
//           </div>

//           {post.comments.map((c, idx) => (
//             <p key={idx} className="text-sm mt-1 ml-4">
//               <strong>{c.userId?.name}:</strong> {c.text}
//             </p>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import API from "../api/api";

export default function Community({ user }) {
  const [posts, setPosts] = useState([]);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [commentText, setCommentText] = useState({});
  const [showComments, setShowComments] = useState({});
  const [editingPost, setEditingPost] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch all posts
  const fetchPosts = async () => {
    try {
      const res = await API.get("/posts/all", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setPosts(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // 📸 Create Post
  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please select an image!");

    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("image", image);

    try {
      await API.post("/posts/create", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("Post created successfully!");
      setCaption("");
      setImage(null);
      fetchPosts();
    } catch (err) {
      console.error("Error creating post:", err);
      alert("Failed to create post");
    }
  };

  // ✏️ Start Edit Mode
  const startEdit = (post) => {
    setEditingPost(post);
    setCaption(post.caption);
    setImage(null);
  };

  // 🆙 Update Post
  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("caption", caption);
    if (image) formData.append("image", image);

    try {
      await API.put(`/posts/update/${editingPost._id}`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("Post updated successfully!");
      setEditingPost(null);
      setCaption("");
      fetchPosts();
    } catch (err) {
      console.error("Error updating post:", err);
      alert("Failed to update post");
    }
  };

  // 🗑️ Delete Post
  const deletePost = async (id) => {
    try {
      await API.delete(`/posts/delete/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("Post deleted successfully!");
      fetchPosts();
    } catch (err) {
      console.error("Error deleting post:", err);
      alert("Failed to delete post");
    }
  };

  // ❤️ Like / Unlike Post
  const handleLike = async (id) => {
    try {
      const res = await API.put(`/posts/like/${id}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const updatedPosts = posts.map(p =>
        p._id === id
          ? { ...p, likes: res.data.liked
            ? [...p.likes, { _id: user.id }]
            : p.likes.filter(like => like._id !== user.id)
          }
          : p
      );
      setPosts(updatedPosts);
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  // 💬 Add Comment
  const handleComment = async (id) => {
    const text = commentText[id];
    if (!text) return alert("Please enter a comment");

    try {
      await API.post(`/posts/comment/${id}`, { text }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setCommentText({ ...commentText, [id]: "" });
      fetchPosts();
    } catch (err) {
      console.error("Error commenting:", err);
    }
  };

  // 💬 Show/Hide Comment Box
  const toggleCommentBox = (id) => {
    
    setShowComments({ ...showComments, [id]: !showComments[id] });
  };

  if (loading) return <p className="text-center mt-10">Loading posts...</p>;

  return (  

    <div className="max-w-2xl mx-auto mt-10">
      {/* 🟩 Create / Edit Post Form */}
      <div className="border rounded-lg p-4 shadow-md bg-white mb-6">
        <h2 className="text-xl font-semibold mb-2">
          {editingPost ? "Edit Post" : "Create a Post"}
        </h2>
        <form onSubmit={editingPost ? handleUpdate : handleCreatePost}>
          <input
            type="text"
            placeholder="Write a caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="border p-2 w-full mb-2 rounded"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="mb-2"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {editingPost ? "Update" : "Post"}
          </button>

          {editingPost && (
            <button
              type="button"
              onClick={() => {
                setEditingPost(null);
                setCaption("");
              }}
              className="ml-2 bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      {/* 🧾 Posts Feed */}
      {posts.length === 0 ? (
        <p className="text-center text-gray-600">No posts yet.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post._id}
            className="border p-4 rounded-lg shadow-md mb-6 bg-white"
          >
            <img
              src={`http://localhost:8000/uploads/${post.image}`}
              alt="post"
              className="w-full rounded-lg mb-2"
            />
            <p className="text-gray-700 mb-2">{post.caption}</p>

            <div className="flex gap-4 items-center">
              <button onClick={() => handleLike(post._id)} className="text-blue-500">
                👍 {post.likes.length}
              </button>
              <button onClick={() => toggleCommentBox(post._id)} className="text-gray-500">
                💬 {post.comments.length}
              </button>

              {/* ✅ Only show Edit/Delete if logged-in user is post owner */}
              {user && post.userId && post.userId._id === user.id && (
                <>
                  <button
                    onClick={() => startEdit(post)}
                    className="text-green-600"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => deletePost(post._id)}
                    className="text-red-600"
                  >
                    🗑️ Delete
                  </button>
                </>
              )}
            </div>

            {/* 💬 Comment Section */}
            {showComments[post._id] && (
              <div className="mt-3 border-t pt-2">
                {post.comments.map((c) => (
                  <p key={c._id} className="text-sm text-gray-700">
                    <strong>{c.userId?.name || "User"}:</strong> {c.text}
                  </p>
                ))}

                <div className="flex gap-2 mt-2">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    value={commentText[post._id] || ""}
                    onChange={(e) =>
                      setCommentText({ ...commentText, [post._id]: e.target.value })
                    }
                    className="border p-1 w-full rounded"
                  />
                  <button
                    onClick={() => handleComment(post._id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Post
                  </button>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
