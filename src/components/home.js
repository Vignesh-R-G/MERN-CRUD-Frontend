import React,{useState,useEffect} from 'react'
import '../bootstrap.min.css'
import axios from 'axios'

export const Home=()=>{
    const [name,setName]=useState("")
    const [city,setCity]=useState("")
    const [age,setAge]=useState(0)
    const [edite,setEdite]=useState(false)
    const [editid,setEditid]=useState("")
    const [datas,setDatas]=useState([])
    useEffect(()=>{
        getall()
    },[])
    function getall(){
        axios.get("http://localhost:5000/student/").then((res)=>{
            setDatas(res.data)
        })
    }
    const formstyle={
        color:"blue"
    }
    const tablestyle={
        color:"green"
    }
    function del(x){
        const opt=window.confirm('Are you Sure to delete this record ?')
        if(opt){
        axios.delete(`http://localhost:5000/student/${x._id}`).then(res=>{
            console.log(res)
            getall()
        })
        }
    }

    function edit(x){
        setEditid(x._id)
        setEdite(true)
        setName(x.Name)
        setAge(x.Age)
        setCity(x.City)
    }
    const update=()=>{
        setEdite(false)
        const data={
            Name:name,
            Age:age,
            City:city
        }
        axios.put(`http://localhost:5000/student/${editid}`,data).then(res=>{
            console.log(res)
            getall()
        })
        setEditid("")
    }

    const create=(e)=>{
        const data={
            Name:name,
            Age:age,
            City:city
        }
        console.log(data)
        axios.post("http://localhost:5000/student/",data).then(res=>{
            console.log(res)
            getall()
        })
        e.preventDefault()
    }
    return(
        <div className='container-fluid'>
            <div className='row mt-4'>
                    <div className="col-6">
                        <h1 style={tablestyle}>Student Details</h1>
                        <hr></hr>
                        <br></br>
                        {(datas.length==0)?<h3 style={tablestyle}>No Students Records Found</h3>:
                        <table className='table'>
                            <tr>
                                <th>Name</th>
                                <th>Age</th>
                                <th>City</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                            {datas.map((x)=>
                                <tr>
                                <td>{x.Name}</td>
                                <td>{x.Age}</td>
                                <td>{x.City}</td>
                                <td><button className="btn btn-warning" onClick={()=>edit(x)}>Edit</button></td>
                                <td><button className="btn btn-warning" onClick={()=>del(x)}>Delete</button></td>
                                </tr>
                            )}
                            
                        </table>
                        }       
                    </div>
                    <div className="col-6">
                        <h1 style={formstyle}>Creation Form</h1>
                        <hr></hr>
                        <br></br>
                        <form>
                            <div className="form-group">
                                Name:<input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} className='form-control' placeholder="Enter Your Name"/>
                            </div>
                            <br></br>
                            <div className="form-group">
                                Age:<input type="number" value={age} onChange={(e)=>{setAge(e.target.value)}} className='form-control' placeholder="Enter Your Age"/>
                            </div>
                            <br></br>
                            <div className="form-group">
                                City:<input type="text" value={city} onChange={(e)=>{setCity(e.target.value)}} className='form-control' placeholder="Enter Your City"/>
                            </div>
                            <br></br>
                            {edite?<button className="btn btn-success" onClick={update}>Update</button>:<button className="btn btn-success" onClick={create}>Create</button>}
                        </form>
                        <hr></hr>
                    </div>
            </div>
        </div>
    )
}