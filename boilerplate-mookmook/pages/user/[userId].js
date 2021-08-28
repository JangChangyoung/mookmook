import React from "react";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import DisplayPosts from "../../components/displayPosts";

const UserPage = () => {
  const router = useRouter();
  const host = router.query.userId;

  return (
    <div>
      <Layout />
      {`${host}`}님의 컬렉션입니다
      {host ? <DisplayPosts host={host} /> : null}
    </div>
  );
};

export default UserPage;