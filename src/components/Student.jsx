import React from 'react'
import { useContext } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import StuContext from '../store/StuContext';

export default function Student({stu: {id, name, age, gender, address}}) {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const ctx = useContext(StuContext);

  const deleteStu = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`http://localhost:1337/api/students/${id}`, {
        method: 'delete'
      });
      if(!res.ok){
        throw new Error('删除失败');
      }
      // 刷新
      ctx.fetchData();
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteHandler = () => {
    deleteStu();
  };

  return (
    <>
      <tr>
        <td>{name}</td>
        <td>{gender}</td>
        <td>{age}</td>
        <td>{address}</td>
        <td>
          <button onClick={deleteHandler}>删除</button>
        </td>
      </tr>
      {loading && <tr><td colSpan={5}>数据正在删除</td></tr>}
      {error && <tr><td colSpan={5}>数据删除失败</td></tr>}
    </>
  )
}