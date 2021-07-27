import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const PostPage = () => {
  const router = useRouter();
  const { postId } = router.query;

  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    // data request
    setLoading(false);
  }, []);

  return (
    <div>{`Post: ${postId}`}</div>
  );
};

export default PostPage;
