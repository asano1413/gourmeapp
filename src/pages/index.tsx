import React, { useState, useEffect } from "react";
import { GoogleMap, Marker } from '@react-google-maps/api';
import { useRouter } from 'next/router';
import AppLayout from '@/components/AppLayout';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import Link from 'next/link';

const center = {
  lat: 36.3708866,
  lng: 140.4764271,
};

interface Comment {
  content: string;
  reviewer: string;
  likes: number;
  replies: { content: string; reviewer: string }[];
}

interface Restaurant {
  lat: number;
  lng: number;
  name: string;
  address: string;
  category: string;
  openingHours: string;
  rating: number;
  image: string;
  comments: Comment[];
}

const renderStars = (averageRating: number) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (averageRating >= i) {
      stars.push(<FaStar key={i} className="text-yellow-400 text-2xl" />);
    } else if (averageRating >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-400 text-2xl" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-gray-300 text-2xl" />);
    }
  }
  return stars;
};

export default function MapComponent() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const router = useRouter();

  useEffect(() => {
    const storedRestaurants = JSON.parse(localStorage.getItem('restaurants') || '[]');
    setRestaurants(storedRestaurants);
  }, []);

  const handleDataInputRedirect = () => router.push('/dataInput');
  const handleMarkerClick = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  const handleLike = (commentIndex: number) => {
    if (!selectedRestaurant) return;

    const updatedComments = [...selectedRestaurant.comments];
    updatedComments[commentIndex].likes += 1;

    setSelectedRestaurant({
      ...selectedRestaurant,
      comments: updatedComments,
    });
  };

  const handleReply = (commentIndex: number, replyContent: string, replyReviewer: string) => {
    if (!selectedRestaurant) return;

    const updatedComments = [...selectedRestaurant.comments];
    updatedComments[commentIndex].replies.push({ content: replyContent, reviewer: replyReviewer });

    setSelectedRestaurant({
      ...selectedRestaurant,
      comments: updatedComments,
    });
  };

  return (
    <AppLayout>
      <div className="relative bg-gray-100 p-4">
        <div className="flex justify-center mt-6 mb-4">
          <Link
            href="/"
            className={`relative overflow-hidden px-5 py-3 rounded-xl rounded-r-none shadow-md transition group border-2 border-blue-700 border-r-0 ${router.pathname === "/" ? 'bg-sky-500 text-white hover:bg-sky-600' : 'bg-white text-sky-500 hover:bg-sky-100'}`}
          >
            <span className={`absolute inset-0 ${router.pathname === "/" ? 'bg-sky-600' : 'bg-sky-100'} scale-0 group-hover:scale-100 transition-transform duration-300 origin-center`}></span>
            <span className="relative z-10">地図を表示</span>
          </Link>
          <Link
            href="/search"
            className={`relative overflow-hidden px-5 py-3 rounded-xl rounded-l-none shadow-md transition group border-2 border-blue-700 border-l-0 ${router.pathname === "/search" ? 'bg-sky-500 text-white hover:bg-sky-600' : 'bg-white text-sky-500 hover:bg-sky-100'}`}
          >
            <span className={`absolute inset-0 ${router.pathname === "/search" ? 'bg-sky-100' : 'bg-sky-600'} scale-0 group-hover:scale-100 transition-transform duration-300 origin-center`}></span>
            <span className="relative z-10">検索結果を表示</span>
          </Link>
        </div>

        <div className="relative w-[80%] h-[500px] mx-auto">
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={center}
            zoom={13}
          >
            {restaurants.map((restaurant, index) => (
              <Marker
                key={index}
                position={{ lat: restaurant.lat, lng: restaurant.lng }}
                onClick={() => handleMarkerClick(restaurant)}
                icon={{
                  url: restaurant === selectedRestaurant
                    ? 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                    : 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
                  scaledSize: new window.google.maps.Size(40, 40),
                }}
              />
            ))}
          </GoogleMap>
          <button
            onClick={handleDataInputRedirect}
            className="fixed bottom-6 right-6 bg-sky-500 text-white px-6 py-4 rounded-xl shadow-lg hover:bg-sky-600"
          >
            データを追加
          </button>
        </div>

        {selectedRestaurant && (
          <div className="mt-6 p-6 bg-white shadow-lg rounded-lg max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-blue-500 text-center">{selectedRestaurant.name}</h2>
            <p><strong>住所:</strong> {selectedRestaurant.address}</p>
            <p><strong>ジャンル:</strong> {selectedRestaurant.category}</p>
            <p><strong>評価:</strong></p>
            <div className="flex items-center mb-4">
              {renderStars(selectedRestaurant.rating)}
              <span className="ml-2 text-gray-700 text-lg">{selectedRestaurant.rating.toFixed(1)}</span>
            </div>
            <p><strong>営業時間:</strong></p>
            <ul className="list-none pl-5 mb-4">
              {selectedRestaurant.openingHours &&
                Object.entries(JSON.parse(selectedRestaurant.openingHours)).map(([day, hours]) => {
                  const hoursData = hours as { open: string; close: string; closed: boolean };
                  return (
                    <li key={day} className="text-gray-700">
                      <strong>{day}:</strong>{' '}
                      {hoursData.closed
                        ? '休業日'
                        : `${hoursData.open} - ${hoursData.close}`}
                    </li>
                  );
                })}
            </ul>
            {selectedRestaurant.image && <img src={selectedRestaurant.image} alt={selectedRestaurant.name} className="w-full h-auto mb-4" />}
            {selectedRestaurant.comments && selectedRestaurant.comments.length > 0 ? (
              <div className="mt-6">
                <h3 className="text-lg font-bold mb-2">コメント</h3>
                <ul className="list-disc pl-5">
                  {selectedRestaurant.comments.map((comment, index) => (
                    <li key={index} className="mb-4">
                      <p className="text-gray-700">
                        <strong>{comment.reviewer}:</strong> {comment.content}
                      </p>
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => handleLike(index)}
                          className="text-blue-500 hover:text-blue-700 mr-4"
                        >
                          👍 いいね ({comment.likes})
                        </button>
                        <button
                          onClick={() => setReplyingTo(index)}
                          className="text-green-500 hover:text-green-700"
                        >
                          💬 返信
                        </button>
                      </div>
                      {replyingTo === index && (
                        <div className="mt-2">
                          <input
                            type="text"
                            placeholder="返信を入力してください"
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mb-2"
                          />
                          <button
                            onClick={() => handleReply(index, replyContent, "あなたの名前")}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                          >
                            返信を送信
                          </button>
                        </div>
                      )}
                      {comment.replies.length > 0 && (
                        <ul className="mt-2 pl-5 border-l border-gray-300">
                          {comment.replies.map((reply, replyIndex) => (
                            <li key={replyIndex} className="mb-2">
                              <p className="text-gray-600">
                                <strong>{reply.reviewer}:</strong> {reply.content}
                              </p>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-gray-500">まだコメントがありません。</p>
            )}
            <button
              onClick={() => setSelectedRestaurant(null)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              閉じる
            </button>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
