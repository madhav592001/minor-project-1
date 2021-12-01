import React,{useState,useEffect} from "react" ; 
import axios from 'axios'

const Home = () => {

    // let authorized = false ; 

    const [user,setUser] = useState({}) ; 


    useEffect(() => {

        const config = {
            headers: {
              Authorization: "Bearer "+localStorage.getItem('jwt_token'),
            },
          };
    
        axios.get('/getuserdetails',config).then(async(res)=>{
            console.log(res.data.user) ; 
            await setUser(res.data.user) ; 
        })

    }, [])

    console.log(user)

    return (
        <div>
            <h1 className='text-center mt-5' >Welcome {user.full_name}</h1>
        </div>
    )
}

export default Home
