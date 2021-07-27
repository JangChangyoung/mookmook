import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const UserPage = () => {
  const router = useRouter();
  const { userId } = router.query;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // data request
    setLoading(false);
  }, []);

  return (
    <div>{`user: ${userId}`}</div>
  );
};

export default UserPage;
