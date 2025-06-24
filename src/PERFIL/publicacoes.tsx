import "./publicacoesStyle.css";

interface Post {
  id: string;
  titulo: string;
  urlsMidia?: string[];
  criadoEm: string;
}

interface PublicacoesProps {
  posts: Post[];
  canDelete?: boolean;
  onDelete?: (id: string) => void;
}

export default function PublicacoesTab({
  posts,
  canDelete,
  onDelete,
}: PublicacoesProps) {
  return (
    <div className="publicacoes-tab">
      {posts.map((post) => (
        <div key={post.id} className="publicacao">
          {post.urlsMidia && (
            <img src={post.urlsMidia[0]} className="imagem" alt="Publicação" />
          )}
          <h3 className="titulo">{post.titulo}</h3>
          <p className="data">{post.criadoEm}</p>
          {canDelete && (
            <button onClick={() => onDelete?.(post.id)}>🗑 Apagar</button>
          )}
        </div>
      ))}
    </div>
  );
}
