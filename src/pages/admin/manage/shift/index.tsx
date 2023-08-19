import React from 'react';
import Table from '@/components/parts/table';
import Layout from '@/components/layout';


const Shift = () => {

    //データの内容を変える
    const data = [
        { id: 1, name: 'Alice', age: 25 },
        { id: 2, name: 'Bob', age: 30 },
        { id: 3, name: 'Charlie', age: 22 },
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
