import "./conteudostyle.css";
import Sidebar from "../Componentes/Sidebar"
import AdminLayout from "../Componentes/AdminLayout";

const videos = [
  {
    title: "(Série BTS) Os Populares e os Nerds EP 6",
    date: "30/06/2021",
    views: "3.641",
    comments: 43,
    likes: "98,4%",
    likeCount: 499,
    thumbnail: "thumb1.jpg",
  },
  {
    title: "(Série Taegi) Meu Híbrido EP 5",
    date: "10/10/2020",
    views: "3.995",
    comments: 73,
    likes: "99,4%",
    likeCount: 530,
    thumbnail: "thumb2.jpg",
  },
  {
    title: "(Série BTS) Os Populares e os Nerds EP 5",
    date: "29/07/2020",
    views: "10.479",
    comments: 106,
    likes: "99,0%",
    likeCount: 1377,
    thumbnail: "thumb3.jpg",
  },
];

const VideoList = () => {
  return (
    <AdminLayout>
    <div className="video-list-container">
      <h2>Conteúdo do canal</h2>
      <table className="video-table">
        <thead>
          <tr>
            <th>Vídeo</th>
            <th>Data</th>
            <th>Visualizações</th>
            <th>Comentários</th>
            <th>% de gostos</th>
          </tr>
        </thead>
        <tbody>
          {videos.map((video, index) => (
            <tr key={index}>
              <td className="video-info">
                <img src={video.thumbnail} alt={video.title} className="thumbnail" />
                <span>{video.title}</span>
              </td>
              <td>{video.date}</td>
              <td>{video.views}</td>
              <td>{video.comments}</td>
              <td>{video.likes} ({video.likeCount} gostos)</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Sidebar></Sidebar>

    </div>
    </AdminLayout>
  );
};

export default VideoList;
