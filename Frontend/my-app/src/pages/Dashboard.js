import styles from "../style/Dashboard.module.css";
import{useAuthContext} from '../context/AuthContext'
import { useState } from "react";

// const tasks = [
//   {
//     id: 1,
//     title: "Meeting 0111233",
//     content: "Discuss the new dashboard layout and AI summary.",
//     category: "Research Analyst",
//     priority: "Medium",
//     done: false,
//   },
//   {
//     id: 2,
//     title: "Design review",
//     content: "Review new UI components with the team.",
//     category: "Design",
//     priority: "High",
//     done: false,
//   },
//   {
//     id: 3,
//     title: "Write API docs",
//     content: "Document all task endpoints for backend.",
//     category: "Development",
//     priority: "Low",
//     done: true,
//   },
//   {
//     id: 4,
//     title: "Marketing campaign",
//     content: "Plan the Q2 social media strategy and content calendar.",
//     category: "Marketing",
//     priority: "High",
//     done: false,
//   },
// ];



export default function UserDashboard({children}) {
 const {user, loading, createTask, tasks} = useAuthContext();


 const handleSubmit = async (e)=>{
  e.preventDefault();
  const form = e.currentTarget;
  const formData = new FormData(form);
  const taskdata = Object.fromEntries(formData.entries())
  try{
     const result = await createTask(taskdata)
     console.log("Success! New Task:", result.tasks);

     form.reset();
     
  }
  catch(err){
    console.log("Failed to create task", err);
  }
 }
 console.log("Task List in Dashboard Componet", tasks.tasks)
 
  return (
    <div className={styles.wrapper}>
      <div className={styles.dashboard}>

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h1>My Dashboard</h1>
            {/* <span>{dateStr}</span> */}
          </div>
          <div className={styles.avatar}>{user.name[0].toUpperCase()}</div>
        </div>

        {/* Stats */}
        <div className={styles.stats}>
          <div className={styles.stat}>
            <div className={styles.statLabel}>Total tasks</div>
            <div className={styles.statVal}>4</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statLabel}>Completed</div>
            <div className={styles.statVal}>1</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statLabel}>Pending</div>
            <div className={styles.statVal}>3</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statLabel}>High priority</div>
            <div className={styles.statVal}>2</div>
          </div>
        </div>

        {/* Main */}
        <div className={styles.main}>

          {/* Tasks list */}
          <div className={styles.tasksPanel}>
            <div className={styles.panelHeader}>
              <span className={styles.panelTitle}>Tasks</span>
              {/* <button className={styles.addBtn}>+ Add task</button> */}
            </div>

            <div className={styles.filterRow}>
              <button className={`${styles.filterBtn} ${styles.filterBtnActive}`}>All</button>
              <button className={styles.filterBtn}>Pending</button>
              <button className={styles.filterBtn}>Completed</button>
              <button className={styles.filterBtn}>High</button>
              <button className={styles.filterBtn}>Medium</button>
            </div>

{console.log("tasks state:", tasks),
console.log("first item:", tasks[0]),
console.log("first item.tasks:", tasks[0]?.tasks),

tasks.map((item, index) => {
  // item.tasks is the nested object { title, content, category, priority }
  const { title, content, category, priority } = item.tasks || {};

  return (
    <div className={styles.taskCard} key={item.taskID?.$oid || item.taskID || index}>
      <div className={styles.taskBody}>
        <div className={styles.taskTitle}>
          {title || "Untitled Task"}
        </div>
        <div className={styles.taskContent}>
          {content}
        </div>
        <div className={styles.badgeRow}>
          <span className={styles.badgeCat}>{category}</span>
          <span className={`${styles.badge} ${styles[priority?.toLowerCase()]}`}>
            {priority}
          </span>
        </div>
      </div>
      <div className={styles.taskActions}>
        <button className={styles.iconBtn}>✎</button>
        <button className={styles.iconBtnDelete}>✕</button>
      </div>
    </div>
  );
})}
     
          </div>

          {/* Form panel */}
          <div className={styles.formPanel}>
            <div className={styles.formTitle}>Add new task</div>
            <form onSubmit={handleSubmit}>  
            <div className={styles.formGroup}>
              <label>Title</label>
              <input type="text" name='title' placeholder="Task title" />
            </div>

            <div className={styles.formGroup}>
              <label>Content</label>
              <textarea name='content' placeholder="Describe the task..." />
            </div>

            <div className={styles.formGroup}>
              <label>Category</label>
              <select defaultValue="Research Analyst" name='category'>
                <option value='Research Analyst'>Research Analyst</option>
                <option value='design'>Design</option>
                <option value='development'>Development</option>
                <option value='marketing'>Marketing</option>
                <option value='management'>Management</option>
                <option value='others'>Other</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label>Priority</label>
              <select defaultValue="Medium" name="priority">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <button type="submit" className={styles.submitBtn}>Save task</button>
            <button type="reset" className={styles.cancelBtn}>Cancel</button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
