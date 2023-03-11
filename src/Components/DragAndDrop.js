import React, { useState, useRef } from 'react'
import "../Styles/styles.css"

const DragAndDrop = ({ data }) => {
    const [list, setList] = useState(data)
    const [isDragging, setIsDragging] = useState(false)
    const [addNewFree, setAddNewFree] = useState(true)
    const dragItem = useRef()
    const dragNode = useRef()

    const handleDragStart = (e, params) => {
        dragItem.current = params
        dragNode.current = e.target
        dragNode.current.addEventListener("dragend", handleDragEnd)
        setTimeout(() => { setIsDragging(true) }, 0)

    }

    const handleDragEnd = () => {
        setIsDragging(false)
        dragNode.current.removeEventListener("dragend", handleDragEnd)
        dragNode.current = null
        dragItem.current = null
    }

    const handleDragEnter = (e, params) => {
        const currentItem = dragItem.current
        if (e.target !== dragNode.current) {
            setList(oldList => {
                let newList = JSON.parse(JSON.stringify(oldList))
                newList[params.groupI].items.splice(params.itemI, 0, newList[currentItem.groupI].items.splice(currentItem.itemI, 1)[0])
                dragItem.current = params
                return newList
            })
        }
    }

    const isStarting = (params) => {
        const current = dragItem.current
        if (current.groupI === params.groupI && current.itemI === params.itemI)
            return "current group-item"
        return "group-item"
    }

    const addNewItem = (groupI) => {
        if (addNewFree)
            setList(oldList => {
                let newList = JSON.parse(JSON.stringify(oldList))
                newList[groupI].items.unshift("")
                setAddNewFree(false)
                return newList
            })
        else {
            alert("Please Enter an item at a time")
        }
    }
    const handleSubmit = (e, groupI) => {
        e.preventDefault()
        let text = e.target.input.value
        setList(oldList => {
            let newList = [...oldList]
            newList[groupI].items[0] = text
            return newList
        })
        setAddNewFree(true)
    }

    const addNewGroup = (e) => {
        e.preventDefault()
        const grpName = e.target.input.value
        if (grpName)
            setList([...list, { title: grpName, items: [] }])
    }


    return (
        <div className='parent'>
            <div className="drag-n-drop">
                {
                    list.map((group, groupI) => {
                        return (
                            <div
                                onDragEnter={
                                    isDragging && !group.items.length ?
                                        (e) => handleDragEnter(e, { groupI, itemI: 0 })
                                        : null
                                }
                                className="dnd-group"
                                key={groupI}
                            >
                                <div className="group-title">{group.title}
                                    <button className='add_new_item'
                                        onClick={() => {
                                            addNewItem(groupI)
                                        }}
                                    >+</button>
                                </div>
                                {
                                    group.items.map((item, itemI) => {

                                        return (
                                            <div
                                                key={itemI}
                                                draggable
                                                onDragStart={
                                                    (e) => handleDragStart(e, { groupI, itemI })
                                                }
                                                onDragEnter={(e) => handleDragEnter(e, { groupI, itemI })}
                                                className={isDragging ? isStarting({ groupI, itemI }) : "group-item"}
                                            >
                                                <div>
                                                    {
                                                        !item ?
                                                            (
                                                                <form onSubmit={(e) => handleSubmit(e, groupI)}
                                                                    className="item-input">
                                                                    <input type={"text"}
                                                                        placeholder={"Enter text"}
                                                                        name="input"
                                                                    />
                                                                    <button type='submit'>Add</button>
                                                                </form>
                                                            )
                                                            :
                                                            <p>{item}</p>
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
                <div className='dnd-group'>

                    <form onSubmit={addNewGroup}
                        className="item-input add-group">
                        <input type={"text"}
                            placeholder={"Enter Group Name"}
                            name="input"
                        />
                        <button type='submit'>Add</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default DragAndDrop