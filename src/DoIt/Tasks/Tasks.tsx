import React, {useState} from "react";
import ITask from "./ITask";
import styles from "./Tasks.module.scss"


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

    return <div className={classNames(styles.Tasks, props.className)}>
        {
            !!props.Header && props.Header
        }
        {
            props.tasks.map(task =>
                <div className={styles.Tasks__item + (chooseTask === task ? " " + styles.Tasks__item_choose : "")} key={task.id}>
                    <span
                        className={styles.Tasks__itemValue}
                        onDoubleClick={() => props.onDoubleClick(task)}
                        onClick={() => setChooseTask(prevState => {
                            if (task === prevState) return null;

                            return task;
                        })}
                    >
                        {task.value}
                    </span>

                    <img className={styles.Tasks__itemRemove} src={process.env.PUBLIC_URL + '/close.png'}
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