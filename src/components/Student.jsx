import React from 'react'

export default function Student({stu: {name, age, gender, address}}) {

  const deleteHandler = () => {
    // fetch('')
  };

  return (
    <tr>
        <td>{name}</td>
        <td>{gender}</td>
        <td>{age}</td>
        <td>{address}</td>
        <td>
          <button onClick={deleteHandler}>删除</button>
        </td>
    </tr>
  )
}