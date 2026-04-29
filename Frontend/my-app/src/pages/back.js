 {tasks.map((item, index) => {
                      const { title, content, category, priority } = item.tasks || {};

            return(
                <div className={styles.taskCard} key={index}>
            <div className={`${styles.taskCheck} ${item.done ? styles.taskCheckDone : ""}`}>
              {item.done && <div className={styles.checkmark} />}
            </div>
            <div className={styles.taskBody}>
              <div className={`${styles.taskTitle} ${item.done ? styles.taskTitleDone : ""}`}>
                {/* Access title via item.tasks.title */}
                {title}
              </div>
              {/* Access content and category via item.tasks */}
              <div className={styles.taskContent}>{content}</div>
              <div className={styles.taskMeta}>
                <span className={`${styles.badge} ${styles.badgeCat}`}>
                  {category}
                </span>
                <span className={`${styles.badge} ${priority}`}>
                  {priority}
                </span>
              </div>
            </div>
            <div className={styles.taskActions}>
              <button className={styles.iconBtn}>✎</button>
              <button className={`${styles.iconBtn} ${styles.iconBtnDelete}`}>✕</button>
            </div>
          </div>
            )
          }
        
        )}