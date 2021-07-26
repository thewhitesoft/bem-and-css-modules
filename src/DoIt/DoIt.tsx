import React, {useState} from 'react';
import {randomBytes} from "crypto";
import ITask from "./ITask";
import Tasks from "./Tasks";

function DoIt() {
    let [newTask, setNewTask] = useState<string>('');
    let [tasks, setTasks] = useState<ITask[]>([]);
    let [solvedTasks, setSolvedTasks] = useState<ITask[]>([]);

    return (
        <div className="DoIt">
            <h1>Do It</h1>

            <input type="text"
                   minLength={1}
                   placeholder={"Новая задача"}
                   value={newTask}
                   autoFocus={true}
                   onChange={event => setNewTask(event.currentTarget.value)}
                   onKeyUp={
                       event => {
                           if (event.key !== 'Enter') return;

                           setTasks([{
                               id: String(randomBytes(6)),
                               value: event.currentTarget.value
                           }].concat(tasks))

                           setNewTask('');
                       }
                   }/>

            <Tasks tasks={tasks}
                   onRemove={(task) => setTasks(prev => {
                       let tasks = [...prev];

                       tasks.splice(prev.indexOf(task), 1);

                       return tasks;
                   })}
                   onDoubleClick={(task) => setTasks(prev => {
                       let tasks = [...prev];

                       tasks.splice(prev.indexOf(task), 1);
                       setSolvedTasks([task].concat(solvedTasks))

                       return tasks;
                   })}/>


            {
                solvedTasks.length !== 0 && <Tasks
                    tasks={solvedTasks}
                    onRemove={(task) => setSolvedTasks(prev => {
                        let tasks = [...prev];

                        tasks.splice(prev.indexOf(task), 1);

                        return tasks;
                    })}
                    onDoubleClick={(task) => {
                    }}
                    Header={
                        <h3>
                            <img src={process.env.PUBLIC_URL + '/OK.svg'}
                                 width={'17px'}
                                 height={'17px'}
                                 alt={'Решенные задачи'}
                                 title={'Решенные задачи'}/>
                            Решенные задачи
                        </h3>
                    }
                />
            }
        </div>
    );
}

export default DoIt;
