// import { supabase } from "@supabase/auth-ui-shared";
// import "./App.css";

// import { useEffect, useState } from "react";

// function App() {
//   const [userId, setUserId] = useState("");
//   const [media, setMedia] = useState([]);

//   const getUser = async () => {
//     try {
//       const {
//         data: { user },
//       } = await supabase.auth.getUser();
//       if (user !== null) {
//         setUserId(user.id);
//       } else {
//         setUserId("");
//       }
//     } catch (e) {}
//   };

//   async function uploadImage(e) {
//     let file = e.target.files[0];

//     const { data, error } = await supabase.storage
//       .from("contratacao")
//       .upload(userId + "/" + pedido_id , file);

//     if (data) {
//       getMedia();
//     } else {
//       console.log(error);
//     }
//   }

//   async function getMedia() {
//     const { data, error } = await supabase.storage
//       .from("uploads")
//       .list(userId + "/", {
//         limit: 10,
//         offset: 0,
//         sortBy: {
//           column: "name",
//           order: "asc",
//         },
//       });

//     if (data) {
//       setMedia(data);
//     } else {
//       console.log(71, error);
//     }
//   }

//   useEffect(() => {
//     getUser();
//     getMedia();
//   }, [userId]);

//     <div className="mt-5">

//           <input type="file" onChange={(e) => uploadImage(e)} />
//           <div className="mt-5">My Uploads</div>
//     </div>
