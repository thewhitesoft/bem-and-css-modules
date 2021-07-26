import React, {useState} from "react";
import ITask from "./ITask";
import "./Tasks.scss"


export default function Tasks(props: {
    tasks: ITask[],
    className?: string,
    onRemove: (id: ITask) => void,
    onDoubleClick: (id: ITask) => void,
    Header?: React.ReactElement
}) {
    let [chooseTask, setChooseTask] = useState<ITask | null>(null);

    function classNames(classFirst: string, classSecond: string | undefined) {
        return `${classFirst} ${classSecond}`;
    }

    return <div className={classNames("Tasks", props.className)}>
        {
            !!props.Header && props.Header
        }
        {
            props.tasks.map(task =>
                <div className={"Tasks__item" + (chooseTask === task ? " Tasks__item--choose" : "")} key={task.id}>
                    <span
                        className={"Tasks__item-value"}
                        onDoubleClick={() => props.onDoubleClick(task)}
                        onClick={() => setChooseTask(prevState => {
                            if (task === prevState) return null;

                            return task;
                        })}
                    >
                        {task.value}
                    </span>

                    <img className={"Tasks__item-remove"} src={process.env.PUBLIC_URL + '/close.png'}
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