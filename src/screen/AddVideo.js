import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import './AddVideo.css';

function AddVideo() {
  const [videoUrl, setVideoUrl] = useState('');
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  const extractThumbnail = (url) => {
    const videoId = url.split('v=')[1];
    if (videoId) {
      return `https://img.youtube.com/vi/${videoId}/0.jpg`;
    }
    return '';
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const thumbnailUrl = extractThumbnail(videoUrl);
    if (!thumbnailUrl) return alert('URL de video no válida');

    // Guardar el video en Firebase
    await addDoc(collection(db, 'videos'), {
      title: title,
      url: videoUrl,
      thumbnail: thumbnailUrl,
    });

    // Redirigir al home
    navigate('/home');
  };

  return (
    <div className="add-video-container">
      {/* Flecha para volver al Home */}
      <div className="back-arrow" onClick={() => navigate('/home')}>
        ←
      </div>

      <h2>Añadir Video</h2>
      <form onSubmit={handleSave}>
        <input
          type="text"
          placeholder="Título del Video"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="url"
          placeholder="URL del Video de YouTube"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          required
        />
        <button type="submit">Guardar Video</button>
      </form>
    </div>
  );
}

export default AddVideo;
