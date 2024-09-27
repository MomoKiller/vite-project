import { useEffect } from 'react'
import './App.css'
import StudentList from './components/StudentList'
import StuContext from './store/StuContext';
import useFetch from './hooks/useFetch';

function App() {

  const { data: stuData, loading, error, fetchData } = useFetch({
    url: 'students'
  });

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
