
// 封装登录的api登录请求
import request from "../utils/request";

export const login=({username,password})=>{
    return request.post('/login',{
        account:username,
        password
    })
}


// 数据分析 图表数据分析 /analysis
export const Analysis=()=>{
    return request.get('/analysis',{

    })
}


// 折线图分类
export const switchCate=(cateid)=>{
    return request.get('/switchCate',{
        params:{
            cateid
        }
    })
}



//用户列表数据
export const pulluserlist=(data)=>{
    return request.get('/pulluserlist',{
        params:data
        
    })
}


//用户列表数据
export const getTable=()=>{
    return request.get('/getTable',{
        
        
    })
}


//订单列表数据
export const obtainorder=(data)=>{
    return request.get('/obtainorder',{
        params:data
        
    })
}


//查看详细菜单
export const vieworder=(data)=>{
    return request.get('/vieworder',{
        params:data
        
    })
}


//菜品列表数据
export const obtaindishes=(data)=>{
    return request.get('/obtaindishes',{
        params:data
    })
}


//员工详情列表数据
export const getemployees=(data)=>{
    return request.get('/getemployees',{
        params:data
    })
}


//添加菜品类目数据
export const obtaincate=()=>{
    return request.get('/obtaincate',{
        
    })
}


//添加菜品单位数据
export const obtainunit=()=>{
    return request.get('/obtainunit',{
        
    })
}


//添加菜品 上架菜品
export const putdishes =(data)=>{
    return request.post('/putdishes ',data)
}


//添加菜品 编辑菜品
export const editdishes  =(data)=>{
    return request.post('/editdishes  ',data)
}


//修改员工离职状态
export const modifyresi  =(data)=>{
    return request.get('/modifyresi  ',{
        params: data})
}


//添加员工
export const addem  =(data)=>{
    return request.post('/addem  ',data)
}


//员工的批量删除
export const deleteemp  =(data)=>{
    return request.post('/deleteemp  ',data)
}