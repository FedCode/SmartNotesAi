import styles from "../style/Dashboard.module.css";
import{useAuthContext} from '../context/AuthContext'
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';

export default function UserDashboard({children}) {
 const {user, loading, createTask, tasks, deletTaskHandler, handlerEdittask} = useAuthContext();
 const [loadding, setLoading] = useState(false)
const [filter , setFilter] =  useState('All')
const [limit , setLimit] = useState(4)
 const [editmode, setEditmode] = useState(null);
 //const [status, setStatus] = useState([]);

const openEdit = (item) => {
    setEditmode({
        taskID: item.taskID,
        title: item.tasks.title,
        content: item.tasks.content,
        category: item.tasks.category,
        priority: item.tasks.priority
    });
}

 const handleSubmit = async (e)=>{
  e.preventDefault();
  const form = e.currentTarget;
  const formData = new FormData(form);
  const taskdata = Object.fromEntries(formData.entries())
  try{

    if(editmode){
      await handlerEdittask(user._id, editmode.taskID, taskdata);
       setEditmode(null);
    }
 else{
     
     await createTask(taskdata);
     toast.success('Task Added Successfully !')
 }
   form.reset();
    // const result = await createTask(taskdata)
    //  console.log("Success! New Task:", result.tasks);
 }
  catch(err){
    console.log("Failed to create task", err);
  }
 }
 console.log("Total task", tasks.length);

const handleFilter = (type) =>{
  setLoading(true)
  setFilter(type)
  setTimeout(() => {
     setLoading(false)
  }, 500);
  
}

  // ✅ Filter tasks based on current filter
  const filteredTasks = tasks.filter((item) => {
    if(filter === 'all') return true;
    if(filter === 'High') return item.tasks?.priority === 'High';
    if(filter === 'Medium') return item.tasks?.priority === 'Medium';
    // if(filter === 'Low') return item.tasks?.priority === 'Low';
   
    return true;
    
  });


const loadCount = filteredTasks.length;
const handleLoadMore = ()=>{
  setLimit((prevLimit)=> prevLimit === 4 ? loadCount:4)
}

// const handleStatusSubmit = async(e)=>{

//   const form = e.currentTarget;
//   const formData = new FormData(form);
//   const taskdata = Object.fromEntries(formData.entries())
//   try{
//        const result = await toggleStatushandler(taskdata)
//   }
//   catch(err){
//     console.log('Server Error', err)
//   }
// }

  //alert('Pending Task Clicked')

   if(loading || !user) return null;

  return (
    <div className={styles.wrapper}>
      <ToastContainer />
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
            <div className={styles.statVal}>{tasks.length}</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statLabel}>Completed</div>
            <div className={styles.statVal}>1</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statLabel}>Pending</div>
            <div className={styles.statVal}>{tasks.reduce((sum, cur) => cur.tasks?.priority === 'Medium' ? sum + 1 : sum, 0)}</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statLabel}>High priority</div>
            <div className={styles.statVal}>{tasks.reduce((sum, cur) => cur.tasks?.priority === 'High' ? sum + 1 : sum, 0)}</div>
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
              <button className={`${styles.filterBtn} ${filter === 'All' ? styles.filterBtnActive:''}`} onClick={()=>handleFilter('All')}>All</button>
              <button className={styles.filterBtn} >Pending</button>
              <button className={styles.filterBtn} >Completed</button>
              <button className={`${styles.filterBtn} ${filter === 'High' ? styles.filterBtnActive:''} `} onClick={()=>handleFilter('High')}>High</button>
              <button className={`${styles.filterBtn} ${filter === 'Medium' ? styles.filterBtnActive:''} `} onClick={()=>handleFilter('Medium')}>Medium</button>
            </div>
{
  loadding ?  <ThreeDots
  height="20"
  width="20"
  radius="9"
  margin="0 auto"
  display="block"
  color="#f97316"
  ariaLabel="three-dots-loading"
  wrapperStyle={{ margin: '20px auto', justifyContent:'center' }}
  wrapperClass="custom-loader"
  visible={true}
/>
  :(<>{filteredTasks.length === 0 ? (<p style={{padding: '20px', color: '#999'}}>No tasks found.</p>):(<>
{filteredTasks.slice(0, limit).map((item, index) => {
  // item.tasks is the nested object { title, content, category, priority }
  const { title, content, category, priority } = item.tasks || {};
   console.log("item", item)  
  const taskid = item.taskID;


  return (
    <div className={styles.taskCard} key={index}>
      <div className={styles.taskBody}>
        
        <div className={styles.taskTitle} style={{display:'flex'}}>
          {/* <form>
           <input 
            type="checkbox" 
            checked={item.tasks.status === 'completed'} 
            onChange={() => toggleStatushandler(item._id, item.tasks.status)} 
        />
        <span style={{ textDecoration: item.tasks.status === 'completed' ? 'line-through' : 'none' }}>
            {item.tasks.title}
        </span>
          </form> */}
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
              <button className={styles.iconBtn} onClick={() => openEdit(item)}>✎</button>
              <button className={`${styles.iconBtn} ${styles.iconBtnDelete}`} onClick={()=>deletTaskHandler(taskid)}>✕ </button>
            </div>
    </div>
  );
})}
</>)}</>)
 }

{ filteredTasks.length > 0 ? <button type="buttom" onClick={handleLoadMore} style={{backgroundColor:'transparent',color:'white', cursor:'pointer', width:'150px', height:'35px', borderRadius:'6px', border:'0', margin:'20px auto', display:'block'}}>{limit === 4 ? "Load More":"Collpase All"}</button>:""}


     
          </div>

          {/* Form panel */}
          <div className={styles.formPanel}>
            <div className={styles.formTitle}>
                   {editmode ? "Edit Task":"Add New Task"}

            </div>
            
            <form onSubmit={handleSubmit}>  
            <div className={styles.formGroup}>
              <label>Title</label> 
              <input type="text" name='title' placeholder="Task title" defaultValue={editmode?.title || ''} key ={editmode?.taskID || 'new'} />
            </div>

            <div className={styles.formGroup}>
              <label>Content</label>
              <textarea name='content' placeholder="Describe the task..."  defaultValue={editmode?.content || ''} key ={editmode?.taskID || 'new'}/>
            </div>

            <div className={styles.formGroup}>
              <label>Category</label>
              <select defaultValue="Research Analyst" name='category' defaultValue={editmode?.category || ''} key ={editmode?.taskID || 'Research Analyst'}>
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
              <select defaultValue="Medium" name="priority" defaultValue={editmode?.category || ''} key ={editmode?.taskID || 'Medium'}>
                <option value='Low'>Low</option>
                <option value='Medium'>Medium</option>
                <option value='High'>High</option>
              </select>
            </div>

            <button type="submit" className={styles.submitBtn}>   
                       {editmode ? 'Update Task' : 'Save Task'}  {/* ✅ button text changes */}
</button>
             <button type="button" className={styles.cancelBtn}
            onClick={() => setEditmode(null)}>
            {editmode ? 'Cancel Edit' : 'Cancel'}
        </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
