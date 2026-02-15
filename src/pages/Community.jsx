

// import { useEffect, useState } from "react";
// import API from "../api/api";

// export default function Community({ user }) {
//   const [posts, setPosts] = useState([]);
//   const [caption, setCaption] = useState("");
//   const [image, setImage] = useState(null);
//   const [commentText, setCommentText] = useState({});
//   const [showComments, setShowComments] = useState({});
//   const [editingPost, setEditingPost] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // 🔹 Fetch all posts
//   const fetchPosts = async () => {
//     try {
//       const res = await API.get("/posts/all", {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       setPosts(res.data);
//       setLoading(false);
//       console.log(res.data);
//     } catch (err) {
//       console.error("Error fetching posts:", err);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   // 📸 Create Post
//   const handleCreatePost = async (e) => {
//     e.preventDefault();
//     if (!image) return alert("Please select an image!");

//     const formData = new FormData();
//     formData.append("caption", caption);
//     formData.append("image", image);

//     try {
//       await API.post("/posts/create", formData, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       alert("Post created successfully!");
//       setCaption("");
//       setImage(null);
//       fetchPosts();
//     } catch (err) {
//       console.error("Error creating post:", err);
//       alert("Failed to create post");
//     }
//   };

//   // ✏️ Start Edit Mode
//   const startEdit = (post) => {
//     setEditingPost(post);
//     setCaption(post.caption);
//     setImage(null);
//   };

//   // 🆙 Update Post
//   const handleUpdate = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("caption", caption);
//     if (image) formData.append("image", image);

//     try {
//       await API.put(`/posts/update/${editingPost._id}`, formData, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       alert("Post updated successfully!");
//       setEditingPost(null);
//       setCaption("");
//       fetchPosts();
//     } catch (err) {
//       console.error("Error updating post:", err);
//       alert("Failed to update post");
//     }
//   };

//   const getPostImageUrl = (img) =>
//   `${import.meta.env.VITE_API_URL.replace("/api", "")}/uploads/${img}`;


//   // 🗑️ Delete Post
//   const deletePost = async (id) => {
//     try {
//       await API.delete(`/posts/delete/${id}`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       alert("Post deleted successfully!");
//       fetchPosts();
//     } catch (err) {
//       console.error("Error deleting post:", err);
//       alert("Failed to delete post");
//     }
//   };

//   // ❤️ Like / Unlike Post
//   const handleLike = async (id) => {
//     try {
//       const res = await API.put(`/posts/like/${id}`, {}, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       const updatedPosts = posts.map(p =>
//         p._id === id
//           ? { ...p, likes: res.data.liked
//             ? [...p.likes, { _id: user.id }]
//             : p.likes.filter(like => like._id !== user.id)
//           }
//           : p
//       );
//       setPosts(updatedPosts);
//     } catch (err) {
//       console.error("Error liking post:", err);
//     }
//   };

//   // 💬 Add Comment
//   const handleComment = async (id) => {
//     const text = commentText[id];
//     if (!text) return alert("Please enter a comment");

//     try {
//       await API.post(`/posts/comment/${id}`, { text }, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       setCommentText({ ...commentText, [id]: "" });
//       fetchPosts();
//     } catch (err) {
//       console.error("Error commenting:", err);
//     }
//   };

//   // 💬 Show/Hide Comment Box
//   const toggleCommentBox = (id) => {
    
//     setShowComments({ ...showComments, [id]: !showComments[id] });
//   };

//   if (loading) return <p className="text-center mt-10">Loading posts...</p>;

//   return (  

//     <div className="max-w-2xl mx-auto mt-10">
//       {/* 🟩 Create / Edit Post Form */}
//       <div className="border rounded-lg p-4 shadow-md bg-white mb-6">
//         <h2 className="text-xl font-semibold mb-2">
//           {editingPost ? "Edit Post" : "Create a Post"}
//         </h2>
//         <form onSubmit={editingPost ? handleUpdate : handleCreatePost}>
//           <input
//             type="text"
//             placeholder="Write a caption..."
//             value={caption}
//             onChange={(e) => setCaption(e.target.value)}
//             className="border p-2 w-full mb-2 rounded"
//           />
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setImage(e.target.files[0])}
//             className="mb-2"
//           />
//           <button
//             type="submit"
//             className="bg-blue-500 text-white px-4 py-2 rounded"
//           >
//             {editingPost ? "Update" : "Post"}
//           </button>

//           {editingPost && (
//             <button
//               type="button"
//               onClick={() => {
//                 setEditingPost(null);
//                 setCaption("");
//               }}
//               className="ml-2 bg-gray-400 text-white px-4 py-2 rounded"
//             >
//               Cancel
//             </button>
//           )}
//         </form>
//       </div>

//       {/* 🧾 Posts Feed */}
//       {posts.length === 0 ? (
//         <p className="text-center text-gray-600">No posts yet.</p>
//       ) : (
//         posts.map((post) => (
//           <div
//             key={post._id}
//             className="border p-4 rounded-lg shadow-md mb-6 bg-white"
//           >
          
//              <div className="w-full h-64 overflow-hidden rounded-lg mb-2">

//             <img
//               // src={`http://localhost:8000/uploads/${post.image}`}
//               // src={`${import.meta.env.VITE_API_URL}/uploads/${post.image}`}
//             src={getPostImageUrl(post.image) }
//               alt="post"
//               className="w-full h-64 object-cover rounded-lg mb-2"
//             />
//              </div>
  

//             <p className="text-gray-700 mb-2">{post.caption}</p>

//             <div className="flex gap-4 items-center">
//               <button onClick={() => handleLike(post._id)} className="text-blue-500">
//                 👍 {post.likes.length}
//               </button>
//               <button onClick={() => toggleCommentBox(post._id)} className="text-gray-500">
//                 💬 {post.comments.length}
//               </button>

//               {/* ✅ Only show Edit/Delete if logged-in user is post owner */}
//               {user && post.userId && post.userId._id === user.id && (
//                 <>
//                   <button
//                     onClick={() => startEdit(post)}
//                     className="text-green-600"
//                   >
//                     ✏️ Edit
//                   </button>
//                   <button
//                     onClick={() => deletePost(post._id)}
//                     className="text-red-600"
//                   >
//                     🗑️ Delete
//                   </button>
//                 </>
//               )}
//             </div>

//             {/* 💬 Comment Section */}
//             {showComments[post._id] && (
//               <div className="mt-3 border-t pt-2">
//                 {post.comments.map((c) => (
//                   <p key={c._id} className="text-sm text-gray-700">
//                     <strong>{c.userId?.name || "User"}:</strong> {c.text}
//                   </p>
//                 ))}

//                 <div className="flex gap-2 mt-2">
//                   <input
//                     type="text"
//                     placeholder="Add a comment..."
//                     value={commentText[post._id] || ""}
//                     onChange={(e) =>
//                       setCommentText({ ...commentText, [post._id]: e.target.value })
//                     }
//                     className="border p-1 w-full rounded"
//                   />
//                   <button
//                     onClick={() => handleComment(post._id)}
//                     className="bg-blue-500 text-white px-2 py-1 rounded"
//                   >
//                     Post
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         ))
//       )}
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
      setCaption("");
      setImage(null);
      fetchPosts();
    } catch (err) {
      console.error("Error creating post:", err);
      alert("Failed to create post");
    }
  };

  const startEdit = (post) => {
    setEditingPost(post);
    setCaption(post.caption);
    setImage(null);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("caption", caption);
    if (image) formData.append("image", image);

    try {
      await API.put(`/posts/update/${editingPost._id}`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setEditingPost(null);
      setCaption("");
      fetchPosts();
    } catch (err) {
      console.error("Error updating post:", err);
      alert("Failed to update post");
    }
  };

  const deletePost = async (id) => {
    try {
      await API.delete(`/posts/delete/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchPosts();
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

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

  const toggleCommentBox = (id) => {
    setShowComments({ ...showComments, [id]: !showComments[id] });
  };

  const getPostImageUrl = (img) =>
    `${import.meta.env.VITE_API_URL.replace("/api", "")}/uploads/${img}`;

  if (loading) return <p className="text-center mt-10">Loading posts...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10">
      {/* Create / Edit Form */}
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
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            {editingPost ? "Update" : "Post"}
          </button>
          {editingPost && (
            <button
              type="button"
              onClick={() => { setEditingPost(null); setCaption(""); }}
              className="ml-2 bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      {/* Posts Feed */}
      {posts.length === 0 ? (
        <p className="text-center text-gray-600">No posts yet.</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="border p-4 rounded-lg shadow-md mb-6 bg-white">
            
            {/* Image Container for uniform size */}
            <div className="w-full h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg mb-2">
              <img
                src={getPostImageUrl(post.image)}
                alt="post"
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-gray-700 mb-2">{post.caption}</p>

            <div className="flex gap-4 items-center">
              <button onClick={() => handleLike(post._id)} className="text-blue-500">
                👍 {post.likes.length}
              </button>
              <button onClick={() => toggleCommentBox(post._id)} className="text-gray-500">
                💬 {post.comments.length}
              </button>

              {user && post.userId && post.userId._id === user.id && (
                <>
                  <button onClick={() => startEdit(post)} className="text-green-600">✏️ Edit</button>
                  <button onClick={() => deletePost(post._id)} className="text-red-600">🗑️ Delete</button>
                </>
              )}
            </div>

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
