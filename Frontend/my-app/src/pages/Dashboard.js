import styles from "../style/Dashboard.module.css";

const tasks = [
  {
    id: 1,
    title: "Meeting 0111233",
    content: "Discuss the new dashboard layout and AI summary.",
    category: "Research Analyst",
    priority: "Medium",
    done: false,
  },
  {
    id: 2,
    title: "Design review",
    content: "Review new UI components with the team.",
    category: "Design",
    priority: "High",
    done: false,
  },
  {
    id: 3,
    title: "Write API docs",
    content: "Document all task endpoints for backend.",
    category: "Development",
    priority: "Low",
    done: true,
  },
  {
    id: 4,
    title: "Marketing campaign",
    content: "Plan the Q2 social media strategy and content calendar.",
    category: "Marketing",
    priority: "High",
    done: false,
  },
];



export default function UserDashboard() {


  return (
    <div className={styles.wrapper}>
      <div className={styles.dashboard}>

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h1>My Dashboard</h1>
            {/* <span>{dateStr}</span> */}
          </div>
          <div className={styles.avatar}>U</div>
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
              <button className={styles.addBtn}>+ Add task</button>
            </div>

            <div className={styles.filterRow}>
              <button className={`${styles.filterBtn} ${styles.filterBtnActive}`}>All</button>
              <button className={styles.filterBtn}>Pending</button>
              <button className={styles.filterBtn}>Completed</button>
              <button className={styles.filterBtn}>High</button>
              <button className={styles.filterBtn}>Medium</button>
            </div>

            {tasks.map((task) => (
              <div className={styles.taskCard} key={task.id}>
                <div className={`${styles.taskCheck} ${task.done ? styles.taskCheckDone : ""}`}>
                  {task.done && <div className={styles.checkmark} />}
                </div>
                <div className={styles.taskBody}>
                  <div className={`${styles.taskTitle} ${task.done ? styles.taskTitleDone : ""}`}>
                    {task.title}
                  </div>
                  <div className={styles.taskContent}>{task.content}</div>
                  <div className={styles.taskMeta}>
                    <span className={`${styles.badge} ${styles.badgeCat}`}>{task.category}</span>
                    <span className={`${styles.badge} ${(task.priority)}`}>{task.priority}</span>
                  </div>
                </div>
                <div className={styles.taskActions}>
                  <button className={styles.iconBtn}>✎</button>
                  <button className={`${styles.iconBtn} ${styles.iconBtnDelete}`}>✕</button>
                </div>
              </div>
            ))}
          </div>

          {/* Form panel */}
          <div className={styles.formPanel}>
            <div className={styles.formTitle}>Add new task</div>

            <div className={styles.formGroup}>
              <label>Title</label>
              <input type="text" placeholder="Task title" />
            </div>

            <div className={styles.formGroup}>
              <label>Content</label>
              <textarea placeholder="Describe the task..." />
            </div>

            <div className={styles.formGroup}>
              <label>Category</label>
              <select defaultValue="Research Analyst">
                <option>Research Analyst</option>
                <option>Design</option>
                <option>Development</option>
                <option>Marketing</option>
                <option>Management</option>
                <option>Other</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Priority</label>
              <select defaultValue="Medium">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <button className={styles.submitBtn}>Save task</button>
            <button className={styles.cancelBtn}>Cancel</button>
          </div>

        </div>
      </div>
    </div>
  );
}
