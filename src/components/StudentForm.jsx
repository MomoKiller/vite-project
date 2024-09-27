
import React from 'react'
import './StudentForm.css';
import { useState } from 'react';
import { useCallback } from 'react';
import { useContext } from 'react';
import StuContext from '../store/StuContext';

export default function StudentForm() {

  const ctx = useContext(StuContext);

  const [inputData, setInputData] = useState({
    name: '',
    gender: '男',
    age: '',
    address: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const nameChangeHandler = (e) => {
    setInputData(preState => ({...preState, name: e.target.value}));
  };
  const genderChangeHandler = (e) => {
    setInputData(preState => ({...preState, gender: e.target.value}));
  };
  const ageChangeHandler = (e) => {
    setInputData(preState => ({...preState, age: +e.target.value}));
  };
  const addressChangeHandler = (e) => {
    setInputData(preState => ({...preState, address: e.target.value}));
  };

  const addStudent = useCallback(async (newStu) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('http://localhost:1337/api/students', {
        method: 'post',
        body: JSON.stringify({data: newStu}),
        headers: {
          "Content-Type": "application/json"
        }
      });
      if(!res.ok) {
        throw new Error('数据添加失败');
      }
      // 刷新
      ctx.fetchData();
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);

  const submitHandler = () => {
    console.log(inputData);

    addStudent(inputData);
  };

  return (
    <>
      <tr className="student-form">
          <td>
            <input type="text" value={inputData.name} onChange={nameChangeHandler}/>
          </td>
          <td>
            <select onChange={genderChangeHandler} value={inputData.gender}>
              <option value="男">男</option>
              <option value="女">女</option>
            </select>
          </td>
          <td>
            <input type="number" onChange={ageChangeHandler} value={inputData.age}/>
          </td>
          <td>
            <input type="text" onChange={addressChangeHandler} value={inputData.address}/>
          </td>
          <td>
            <button onClick={submitHandler}>添加</button>
          </td>
      </tr>
      {loading && <tr><td colSpan={5}>正在添加</td></tr>}
      {error && <tr><td colSpan={5}>{error.message}</td></tr>}
    </>
  )
}
