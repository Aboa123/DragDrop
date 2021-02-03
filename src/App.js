import './App.css';
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable, resetServerContext } from 'react-beautiful-dnd';
import {v4} from "uuid";
import _ from "lodash";

const item1 = {
    id: v4(),
    name: "AAA"
}

const item2 = {
    id: v4(),
    name: "BBB"
}

const item3 = {
    id: v4(),
    name: "CCC"
}

const App = () =>{
    resetServerContext();

    const [state,setState] = useState({
        "todo": {
            title:"Todo",
            items:[item1]
        },
        "In-progress": {
            title:"In progress",
            items:[item2,item3]
        },
        "done": {
            title:"clear",
            items:[]
        }
    })

    const dragEnd = ({destination,source}) => {
        // from source, to destination
        if(!destination) return;
        const copy = {...state[source.droppableId].items[source.index]}
        setState(prev => {
            prev = {...prev}
            // remove "from array"
            prev[source.droppableId].items.splice(source.index,1)
            // add new "to array"
            prev[destination.droppableId].items.splice(destination.index, 0, copy)
            return prev
        })
    }
    
    return (
        <div className="App">
            <DragDropContext onDragEnd={dragEnd}>
                {_.map(state, (data,key)=>
                    <div key={key} className={"column"}>
                        <h1>{data.title}</h1>
                        추가
                        <Droppable droppableId={key}>
                            {(provided) => 
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className={"list"}
                                >
                                    {data.items.map((element,index) => 
                                        <Draggable draggableId={element.id} key={element.id} index={index}>
                                            {(provided) => 
                                                <div 
                                                    className={"item"}
                                                    ref={provided.innerRef}
                                                    {...provided.dragHandleProps}
                                                    {...provided.draggableProps}
                                                >
                                                    {element.name}
                                                </div>
                                            }
                                        </Draggable>
                                    )}
                                    {provided.placeholder}
                                </div>
                            }
                        </Droppable>
                    </div>
                )}
            </DragDropContext>
        </div>
    );
}

export default App;
