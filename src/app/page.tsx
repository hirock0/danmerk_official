"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const Home = () => {
  const [users, setUsers] = useState([]);

  const allUsers = async () => {
    const res = await axios.get("/pages/api/users");
    const users = res?.data?.users;
    setUsers(users);
  };
  useEffect(() => {
    allUsers();
  }, []);
  return (
    <div>
      <Link href={"/dashboard"}>Dashboard</Link>

      <h1 className=" mt-20">Users here</h1>

      <div className="">
        {users?.map((user: any, index) => {
          return (
            <div key={index} className="border-2 border-black m-2 p-2">
              <h1>{user?.name}</h1>
              <p>{user?.email}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
