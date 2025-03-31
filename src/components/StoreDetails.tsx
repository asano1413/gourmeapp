import { Review, ReviewReply, Store } from '@prisma/client';
import React from 'react';

interface Props {
  store: Store;
  reviews: Review[];
}

const StoreDetails: React.FC<Props> = ({ store, reviews }) => {
  return (
    <div key={store.id} className="mb-6 p-4 border rounded shadow-md w-full max-w-2xl bg-white">
      <h2 className="text-xl font-bold mb-2">{store.name}</h2>
      <p className="text-gray-700 mb-1"><strong>ジャンル:</strong> {store.category}</p>
      {/* <p className="text-gray-700 mb-1"><strong>星の数:</strong> {store.rating}</p> */}
      <p className="text-gray-700 mb-1"><strong>営業時間:</strong> {store.openingHours}</p>
      {reviews?.map((review) => (
        <StoreReview key={review.id} review={review} />
      ))}
    </div>
  );
};

const StoreReview = ({ review }: { review: Review & { replies?: ReviewReply[] } }) => {
  const handleLike = async () => {
    const response = await fetch(`/api/review/like?id=${review.id}`, {
      method: 'POST',
    });

    if (response.ok) {
      console.log('Liked!');
    } else {
      window.alert('いいねに失敗しました');
      return;
    }

  }

  return (
    <div className="mt-2 p-2 bg-gray-100 rounded">
      {review.image && <img src={review.image} alt={review.content} className="mb-2 w-full h-auto" />}
      <h3 className="text-lg font-semibold mb-1">レビュー</h3>
      <p className="text-gray-700">{review.content}</p>
      <p className="text-gray-500 text-sm">評価数: {review.rating}</p>

      {review.replies?.map((reply) => (
        <StoreReviewReply key={reply.id} reply={reply} />
      ))}

      <div className="mt-2 flex items-center gap-2">
        <button onClick={handleLike} className="text-sm text-blue-500 rounded bg-black/5 hover:bg-black/10 px-2 py-1">
          👍 いいね
        </button>
        <button className="text-sm text-green-500 rounded bg-black/5 hover:bg-black/10 px-2 py-1">
          💬 返信
        </button>
      </div>

    </div>
  );
}

const StoreReviewReply = ({ reply }: { reply: ReviewReply }) => {
  return (
    <div className="mt-2 pl-5 border-l border-gray-300">
      <p className="text-gray-600">
        <strong>{reply.content}:</strong> {reply.content}
      </p>
    </div>
  );
}

export default StoreDetails;
