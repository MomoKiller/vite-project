
import { useState, useCallback } from 'react';

/**
 * 自定义钩子 - 以 use 开头的函数
 * @param 
 * reqObj: {
 *  url,
 *  method,
 * } reqObj 
 * call: 回调
 * @returns 
 */
const useFetch = (reqObj, call) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    // 记录错误信息
    const [error, setError] = useState(null); 

    const fetchData = useCallback(async (body) => {
        try {
            setLoading(true);
            setError(null);
            const res = await fetch(`http://localhost:1337/api/${reqObj.url}`, {
                method: reqObj.method || 'get',
                headers: {
                    "Content-Type": "application/json"
                },
                body: body ? JSON.stringify({data: body}) : null
            });
            if(res.ok) {
                const data = await res.json();
                console.log(data.data);
                setData(data.data);
                // 回调函数
                call && call();
            }else {
                throw new Error('数据加载失败');
            }
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    }, []);

    // 设置返回值
    return {
        loading,
        error,
        data,
        fetchData,
    }
};

export default useFetch;