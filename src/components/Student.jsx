import React from 'react'
import { useContext } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import StuContext from '../store/StuContext';
import StudentForm from './StudentForm';
import useFetch from '../hooks/useFetch';

export default function Student(props) {

  const {stu: {id, name, age, gender, address}} = props;

  const ctx = useContext(StuContext);

  const { loading, error, fetchData: deleteStu } = useFetch({
    url: `students/${id}`,
    method: 'delete',
  }, ctx.fetchData);

  const [isEdit, setIsEidt] = useState(false);

  const deleteHandler = () => {
    deleteStu();
  };

  const cancelHandler = () => {
    setIsEidt(false);
  };

  return (
    <>
      {!isEdit && 
        <tr>
          <td>{name}</td>
          <td>{gender}</td>
          <td>{age}</td>
          <td>{address}</td>
          <td>
            <button onClick={deleteHandler}>删除</button>
            <button onClick={() => setIsEidt(true)}>编辑</button>
          </td>
        </tr>
      } 
      {isEdit && <StudentForm stu={props.stu} onCancel={cancelHandler}/>}
      {loading && <tr><td colSpan={5}>数据正在删除</td></tr>}
      {error && <tr><td colSpan={5}>数据删除失败</td></tr>}
    </>
  )
}