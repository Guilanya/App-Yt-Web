import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { db } from '../firebase'; // Asegúrate de importar la instancia de Firebase.
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'; // Importamos deleteDoc

function Home() {
  const [videos, setVideos] = useState([]);
  const [activeMenu, setActiveMenu] = useState(null); // Estado para el menú activo

  useEffect(() => {
    const fetchVideos = async () => {
      const videoCollection = collection(db, 'videos');
      const videoSnapshot = await getDocs(videoCollection);

      const videoList = videoSnapshot.docs.map(doc => ({
        id: doc.id,  // Agregamos el ID del documento
        ...doc.data()  // Mantenemos los demás datos del video
      }));

      setVideos(videoList);
    };

    fetchVideos();
  }, []);

  // Función para eliminar video
  const handleDelete = async (videoId) => {
    try {
      const videoRef = doc(db, 'videos', videoId);
      await deleteDoc(videoRef);
      setVideos(videos.filter(video => video.id !== videoId)); // Actualiza la lista de videos
      alert("Video eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar el video: ", error);
    }
  };

  // Controlar el menú activo (aparecerá solo cuando se haga clic en los tres puntos)
  const toggleMenu = (id) => {
    if (activeMenu === id) {
      setActiveMenu(null); // Si ya está abierto, lo cerramos
    } else {
      setActiveMenu(id); // Abrimos el menú para el video seleccionado
    }
  };

  return (
    <div className="home-container">
      <h2>Lista de Videos</h2>

      <Link to="/add-video" className="add-video-btn">
        Añadir Video
      </Link>

      <div className="video-list">
        {videos.map((video) => (
          <div key={video.id} className="video-card">
            <img src={video.thumbnail} alt={video.title} className="video-thumbnail" />
            <h3>{video.title}</h3>
            <Link to={`/video/${video.id}`} className="video-link">
              Ver Video
            </Link>

            {/* Botón de tres puntos */}
            <div className="menu-container">
              <button className="menu-btn" onClick={() => toggleMenu(video.id)}>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </button>

              {/* Menú de opciones (Eliminar) */}
              {activeMenu === video.id && (
                <div className="menu-options">
                  <button onClick={() => handleDelete(video.id)}>Eliminar</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
