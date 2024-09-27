import { useEffect, useState } from 'react'
import './App.css'
import StudentList from './components/StudentList'
import { useCallback } from 'react';
import StuContext from './store/StuContext';

function App() {
  const [stuData, setStuData] = useState([]);
  const [loading, setLoading] = useState(false);
  // 记录错误信息
  const [error, setError] = useState(null); 

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('http://localhost:1337/api/students');
      if(res.ok) {
        const data = await res.json();
        console.log(data.data);
        setStuData(data.data);
      }else {
        throw new Error('数据加载失败');
      }
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadDataHandler = () => {
    fetchData();
  };

  // 组件初始化的时候调用一次
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <StuContext.Provider value={{fetchData}}>
      <>
        <button onClick={loadDataHandler}>加载数据</button>
        {(!loading && !error) && <StudentList stus={stuData}/>}
        {loading && <p>数据加载中...</p>}
        {error && <p>{ error.message }</p>}
      </>
    </StuContext.Provider>
  )
}

export default App
