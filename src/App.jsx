import { useEffect, useState } from 'react'
import './App.css'
import StudentList from './components/StudentList'
import { useCallback } from 'react';

function App() {
  const [stuData, setStuData] = useState([]);
  const [loading, setLoading] = useState(false);
  // 记录错误信息
  const [error, setError] = useState(null); 

  const fecthData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('http://localhost:1337/api/students');
      if(res.ok) {
        const data = await res.json();
        setStuData(data.data);
      }else {
        throw new Error('数据加载失败');
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadDataHandler = () => {
    fecthData();
  };

  // 组件初始化的时候调用一次
  useEffect(() => {
    fecthData();
  }, []);

  return (
    <>
      <button onClick={loadDataHandler}>加载数据</button>
      {(!loading && !error) && <StudentList stus={stuData}/>}
      {loading && <p>数据加载中...</p>}
      {error && <p>{ error.message }</p>}
    </>
  )
}

export default App
