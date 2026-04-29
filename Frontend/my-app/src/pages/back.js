   {tasks.map((item) => (
          // Use taskID.$oid for the key since it's unique
          <div className={styles.taskCard} key={item.taskID.$oid}>
            <div className={`${styles.taskCheck} ${item.done ? styles.taskCheckDone : ""}`}>
              {item.done && <div className={styles.checkmark} />}
            </div>
            <div className={styles.taskBody}>
              <div className={`${styles.taskTitle} ${item.done ? styles.taskTitleDone : ""}`}>
                {/* Access title via item.tasks.title */}
                {item.tasks.title}
              </div>
              {/* Access content and category via item.tasks */}
              <div className={styles.taskContent}>{item.tasks.content}</div>
              <div className={styles.taskMeta}>
                <span className={`${styles.badge} ${styles.badgeCat}`}>
                  {item.tasks.category}
                </span>
                <span className={`${styles.badge} ${item.tasks.priority}`}>
                  {item.tasks.priority}
                </span>
              </div>
            </div>
            <div className={styles.taskActions}>
              <button className={styles.iconBtn}>✎</button>
              <button className={`${styles.iconBtn} ${styles.iconBtnDelete}`}>✕</button>
            </div>
          </div>
        ))}