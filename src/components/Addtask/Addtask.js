import React from 'react'
import "./Addtask.css"
import { useState } from 'react'
import axios from "axios"

function Addtask({setkeeperList}) {

    const [keeperObj, setKeeperObj] = useState({
        title: "",
        description: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setKeeperObj({
            ...keeperObj,
            [name]: value
        })
    }

    const add = () => {
        if (keeperObj.title) {
            axios.post('http://localhost:8000/api/addNew', keeperObj)
                .then(res => setkeeperList(res.data));
                setKeeperObj({
                    title: "",
                    description: ""
                })
        }
    }
    return (
        <>
            <div className="addKeeper">
                <input
                    className="inputBox titleInput"
                    type="text"
                    name="title"
                    autoComplete="off"
                    placeholder="Add Title"
                    onChange={handleChange}
                    value={keeperObj.title}
                />
                <textarea
                    className="inputBox description"
                    name="description"
                    placeholder="Add Description Here"
                    onChange={handleChange}
                    value={keeperObj.description}
                />
                <div className="addButton" onClick={add}>ADD</div>
            </div>
        </>
    )
}

export default Addtask;