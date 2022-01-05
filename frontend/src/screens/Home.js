import React,{useState,useEffect} from "react" ; 
import axios from 'axios'
import { Col, Container, Row } from "react-bootstrap";
import Note from "../components/Note.js";
import AddNoteModal from "../components/AddNoteModal.js";

const Home = () => {

    // let authorized = false ; 

    const [user,setUser] = useState({}) ; 
    const [notes,setNotes] = useState([]) ; 
    const [addNoteModal,setAddNoteModal] = useState(false); 

    useEffect(() => {

        const config = {
            headers: {
              Authorization: "Bearer "+localStorage.getItem('jwt_token'),
            },
          };
    
        axios.get('/getuserdetails',config).then(async(res)=>{
            console.log(res.data.user) ; 
            await setUser(res.data.user) ; 
            await setNotes(res.data.user.notes)
        })

    }, [])

    console.log(user)
    console.log(notes)

    return (
        <div className="text-white">
            <h1 className='text-center my-3' >Welcome {user.full_name}</h1>
            <hr />
            <Container className=" d-flex flex-row align-items-center justify-content-center">
                <h2 className="text-center" >Create a New Note</h2>
                <button className="btn btn-warning mx-4" onClick={()=>setAddNoteModal(true)}>Create</button>
            </Container>
            <AddNoteModal trigger={addNoteModal} setAddNoteModal={setAddNoteModal} />
            <hr />
            <Row className="mx-3 my-5" >
                {
                    notes.map((note)=>(
                        <Col sm={12} md={6} xl={3} >
                            <Note key={note._id} note={note} />
                        </Col>
                    ))
                }
            </Row>
        </div>
    )
}

export default Home
