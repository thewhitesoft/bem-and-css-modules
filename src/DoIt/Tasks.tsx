import React from "react";
import ITask from "./ITask";


export default function Tasks(props: {
    tasks: ITask[],
    onRemove: (id: ITask) => void,
    onDoubleClick: (id: ITask) => void,
    Header?: React.ReactElement
}) {
    return <div>
        {
            !!props.Header && props.Header
        }
        {
            props.tasks.map(task =>
                <div key={task.id}>
                    <span onDoubleClick={() => props.onDoubleClick(task)}>
                        {task.value}
                    </span>

                    <img src={process.env.PUBLIC_URL + '/close.png'}
                         width={'10px'}
                         height={'10px'}
                         onClick={() => props.onRemove(task)}
                         alt={'Удалить задачу'}
                         title={'Удалить задачу'}/>
                </div>
            )
        }
    </div>;
}