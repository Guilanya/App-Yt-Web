import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Importa useNavigate
import { db } from '../firebase'; // Asegúrate de importar la instancia de Firebase
import { doc, getDoc } from 'firebase/firestore';
import './Video.css'; // Importa el archivo de estilos CSS

function Video() {
  const { id } = useParams(); // Obtiene el id del video desde la URL
  const [video, setVideo] = useState(null);
  const navigate = useNavigate(); // Hook de React Router para navegación

  useEffect(() => {
    const fetchVideo = async () => {
      const videoDoc = doc(db, 'videos', id); // Obtiene el documento del video por el id
      const videoSnapshot = await getDoc(videoDoc);
      if (videoSnapshot.exists()) {
        setVideo(videoSnapshot.data()); // Establece los datos del video en el estado
      } else {
        console.log("Video no encontrado");
      }
    };

    fetchVideo();
  }, [id]);

  // Verifica si el ID del video es válido antes de mostrar el iframe
  const getYouTubeUrl = (videoUrl) => {
    // Si video.url es una URL completa de YouTube
    if (videoUrl.includes('youtube.com')) {
      // Extrae el ID del video
      const videoId = videoUrl.split('v=')[1].split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    // Si ya es solo el ID del video
    return `https://www.youtube.com/embed/${videoUrl}`;
  };

  return (
    <div>
      {/* Botón estilizado de "Volver al inicio" */}
      <div className="add-video-container">
       {/* Flecha para volver al Home */}
      <div className="back-arrow" onClick={() => navigate('/home')}>
        ←
      </div>

        {video ? (
          <div>
            <h2>{video.title}</h2>
            <iframe
              width="560"
              height="315"
              src={getYouTubeUrl(video.url)} // Usa la función para obtener la URL del iframe
              title={video.title}
              frameBorder="0"
              allowFullScreen
            />
          </div>
        ) : (
          <p>Cargando video...</p>
        )}
      </div>
    </div>
  );
}

export default Video;
