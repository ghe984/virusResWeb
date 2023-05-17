import http from '../utils/request'
import axiosInstance from "./index";
import qs from "qs";
const axios=axiosInstance

export const admLogin=(Form)=>{
    return axios.post('http://127.0.0.1:8000/admlogin/',
        qs.stringify({"username":Form.username,"password":Form.password}))
}
//数据统计
export const resCount=()=>{
    return axios.get('http://127.0.0.1:8000/res_count/')
}
export const serverCount=()=>{
    return axios.get('http://127.0.0.1:8000/server_count/')
}
export const serveCount=()=>{
    return axios.get('http://127.0.0.1:8000/serve_count/')
}


export const getData=()=>{
    return http.get('/home/getData')
}
export const getResidents=(page)=>{return axios.get('http://localhost:8000/residents',{params:page})}
export const getRes=(id)=>{return axios.get(`http://127.0.0.1:8000/residents/${id}/`)}
export const searchResname=(res_name)=>{return axios.get(`http://127.0.0.1:8000/residents/?res_name=${res_name}`)}
export const searchResid=(res_id)=>{return axios.get(`http://127.0.0.1:8000/residents/?res_id=${res_id}`)}
// export  const PutRes=(id,pass,sex,name,add,bir,tel,isres)=>{return axios.put(`http://127.0.0.1:8000/residents/`+id+`/`,
//     qs.stringify({"res_id":id,"res_password":pass,"res_name":name,"res_sex":sex,"res_address":add,"isresided":isres}))}
export  const PuteditRes=(id,pass,name,sex,add,tel,bir)=>{return axios.put(`http://127.0.0.1:8000/residents/`+id+`/`,
    qs.stringify({"res_id":id,"res_password":pass,"res_sex":sex,"res_name":name,"res_address":add,"res_tel":tel,"res_birth":bir}))}
export const postRes=(ruleForm)=>{return axios.post(`http://127.0.0.1:8000/residents/`,
    qs.stringify({"res_id":ruleForm.res_id,"res_password":ruleForm.res_password,"res_name":ruleForm.res_name,"res_address":ruleForm.res_address,
        "res_tel":ruleForm.res_tel,"res_birth":ruleForm.res_birth,"res_sex":ruleForm.res_sex,"isresided":1}))}
export const deleteRes=(id)=>{return axios.delete(`http://127.0.0.1:8000/residents/${id}/`)}

//serve
export const getServe=()=>{return axios.get('http://127.0.0.1:8000/serve/?ordering=-start_time')}
export const postServeInfo=(ruleForm)=>{return axios.post('http://127.0.0.1:8000/serveinfo/',
    qs.stringify({"serve_id":ruleForm.serve_id,"manager":ruleForm.manager,"serve_title":ruleForm.serve_title,
    "serve_text":ruleForm.serve_text,"start_time":ruleForm.start_time,"span_time":ruleForm.span_time}))}
export const getServeInfo=()=>{return axios.get('http://127.0.0.1:8000/serveinfo/?ordering=-start_time')}
export const deleteServeInfo=(id)=>{return axios.delete(`http://127.0.0.1:8000/serveinfo/${id}/`)}
export const putServeInfo=(id)=>{
    return axios.put(`http://127.0.0.1:8000/serveinfo/${id}/`,
        qs.stringify({"isend":1}))
}

export const deleteServeReg=(id)=>{return axios.delete(`http://127.0.0.1:8000/servereg/${id}/`)}
export const postSerReg=(ruleForm)=>{
    console.log('rule',ruleForm)
    return axios.post('http://127.0.0.1:8000/servereg/',
    qs.stringify({"id":ruleForm.id,"serve":ruleForm.serve_id,"res":ruleForm.res_id}))}
export const searchSeverId=(id)=>{return axios.get(`http://127.0.0.1:8000/serve/?serve_id=${id}`)}
export const searchSeverName=(name)=>{return axios.get(`http://127.0.0.1:8000/serve/?res_name=${name}`)}

//materials
export const getMats=()=>{return axios.get('http://127.0.0.1:8000/viewmaterials/?ordering=-apply_time')}
export const postMats=(ruleForm)=>{return axios.post('http://127.0.0.1:8000/materials/',
    qs.stringify({"applicant":ruleForm.applicant,"material":ruleForm.material}))}
export const deleteMats=(id)=>{return axios.delete(`http://127.0.0.1:8000/materials/${id}/`)}
export const searchMatId=(id)=>{return axios.get(`http://127.0.0.1:8000/viewmaterials/?ordering=-apply_time&applicant_id=${id}`)}
export const searchMatName=(name)=>{return axios.get(`http://127.0.0.1:8000/viewmaterials/?ordering=-apply_time&res_name=${name}`)}



//abnormal
export const postAbno=(Form)=>{
    return axios.post('http://127.0.0.1:8000/abnormaltable/',
        qs.stringify({"abnormal":Form.abnormal,"abcondition":Form.abcondition,"registrant":Form.registrant}))
}
export const  getAbnList=()=>{
    return axios.get('http://127.0.0.1:8000/abnormals/?ordering=-regis_time')
}
export const putAbno=(id,abnormal)=>{
    return axios.put(`http://127.0.0.1:8000/abnormaltable/${id}/`,
        qs.stringify({"abnormal":abnormal,"ishealed":1}))
}
export const searchAbnoID=(id)=>{
    return axios.get(`http://127.0.0.1:8000/abnormals/?abnormal_id=${id}&ordering=-regis_time`)
}
export const searchAbnoName=(name)=>{
    return axios.get(`http://127.0.0.1:8000/abnormals/?res_name=${name}&ordering=-regis_time`)
}
export const deleteAbn=(id)=>{
    return axios.delete(`http://127.0.0.1:8000/abnormaltable/${id}/`)
}

//informs
export const getinfo=()=>{
    return axios.get('http://127.0.0.1:8000/inform/?ordering=-inform_time')
}
export const putInfo=(id)=>{
    return axios.put(`http://127.0.0.1:8000/inform/${id}/`,
        qs.stringify({"ispubliced":0}))
}
export const deleteInfo=(id)=>{
    return axios.delete(`http://127.0.0.1:8000/inform/${id}/`)
}
export const postInfo=(Form)=>{
    return axios.post('http://127.0.0.1:8000/inform/',
        qs.stringify({"info_type":Form.info_type,"inform_title":Form.inform_title,"info_abstract":Form.info_abstract,
        "inform_text":Form.inform_text}))
}

//inout
export const getInout=()=>{
    return axios.get('http://127.0.0.1:8000/inout/?ordering=-access_time')
}
export const postInout=(Form)=>{
    return axios.post('http://127.0.0.1:8000/inoutable/',
        qs.stringify({"access_adr":Form.access_adr,"res":Form.res,"reg":Form.reg}))
}
export const deleteInout=(id)=>{
    return axios.delete(`http://127.0.0.1:8000/inoutable/${id}/`)
}


