import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// モーダルコンポーネント
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-md w-3/4 max-w-lg">
        <button onClick={onClose} className="text-right text-red-500">閉じる</button>
        {children}
      </div>
    </div>
  );
};

export default function Threads() {
  interface Post {
    id: number;
    title: string;
    content: string;
    createdAt: string;
  }

  const [posts, setPosts] = useState<Post[]>([]);
  interface Tag {
    id: number;
    name: string;
  }

  const [tags, setTags] = useState<Tag[]>([]);
  const [searchResults, setSearchResults] = useState<Post[]>([]);
  const [isTagsModalOpen, setIsTagsModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  // 投稿を取得する関数
  const fetchPosts = async () => {
    const res = await fetch('/api/posts');
    if (res.ok) {
      const data = await res.json();
      setPosts(data);
    } else {
      alert('投稿の取得に失敗しました');
    }
  };

  // タグを取得する関数
  const fetchTags = async () => {
    const res = await fetch('/api/tags');
    if (res.ok) {
      const data = await res.json();
      setTags(data);
    } else {
      alert('タグの取得に失敗しました');
    }
  };

  // 検索結果を取得する関数
  const fetchSearchResults = async () => {
    const res = await fetch(`/api/search?query=${searchQuery}`);
    if (res.ok) {
      const data = await res.json();
      setSearchResults(data);
    } else {
      alert('検索に失敗しました');
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded p-8 text-gray-700 w-full max-w-2xl mt-12 mx-auto">
        <h2 className="text-2xl my-4 font-bold text-gray-800 text-center">スレッド</h2>
        <button onClick={() => setIsTagsModalOpen(true)} className="bg-blue-500 text-white my-4 px-4 py-2 rounded">タグを表示</button>
        <button onClick={() => setIsSearchModalOpen(true)} className="bg-blue-500 text-white my-4 px-4 py-2 rounded">検索</button>
        <ul>
          {posts.map((post) => (
            <li key={post.id} className="mb-4 p-2 border border-gray-300 rounded">
              <p><strong>タイトル:</strong> {post.title}</p>
              <p><strong>内容:</strong> {post.content}</p>
              <p><strong>作成日時:</strong> {new Date(post.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* タグモーダル */}
      <Modal isOpen={isTagsModalOpen} onClose={() => setIsTagsModalOpen(false)}>
        <h2 className="text-xl my-4 font-bold text-gray-800 text-center">タグ一覧</h2>
        <ul>
          {tags.map((tag) => (
            <li key={tag.id} className="mb-4 p-2 border border-gray-300 rounded">
              <p><strong>タグ名:</strong> {tag.name}</p>
            </li>
          ))}
        </ul>
      </Modal>

      {/* 検索モーダル */}
      <Modal isOpen={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)}>
        <h2 className="text-xl my-4 font-bold text-gray-800 text-center">検索</h2>
        <form onSubmit={(e) => { e.preventDefault(); fetchSearchResults(); }}>
          <input
            type="text"
            placeholder="検索キーワード"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-4 p-2 border border-gray-300 rounded w-full"
          />
          <button type="submit" className="bg-blue-500 text-white my-4 px-4 py-2 rounded w-full">検索</button>
        </form>
        <ul>
          {searchResults.map((result) => (
            <li key={result.id} className="mb-4 p-2 border border-gray-300 rounded">
              <p><strong>タイトル:</strong> {result.title}</p>
              <p><strong>内容:</strong> {result.content}</p>
              <p><strong>作成日時:</strong> {new Date(result.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </Modal>
    </div>
  );
}