import React from 'react';
import Table from '@/components/parts/table';
import Layout from '@/components/layout';
import { useEffect, useState } from 'react';


const Shift = () => {

  const [shifts, setShifts] = useState('')
  console.log(shifts);

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/shifts`); 
      const data = await response.json();
      setShifts(data);
    }
    fetchUsers();
  }, []);

    //データの内容を変える
      const data = [
        { id: 1, title: 'Event 1', date: '2023-08-01' },
        { id: 2, title: 'Event 2', date: '2023-08-10' },
        // 他のイベントもここに追加
      ];
      
  return (
    <Layout>
    <div>
    <Table data={data} />
    </div>
    </Layout>
  );
};

export default Shift;
