



export default class TaskModel{

constructor(userID, name, email, password, createdAt){
    this.userID = userID
    this.name = name
    this.email = email
    this.password = password
    this.createdAt = createdAt;
}
// task 
// title
//"userId": "ObjectId('...')", // Link to the user who created it
// "title": "Meeting with Design Team",
// "content": "Discuss the new dashboard layout and AI summary feature.",
// "category": "Work",          // Simple categorization
// "priority": "High",
// "isCompleted": false,
// "createdAt": new Date(),     // Always add timestamps manually
// "updatedAt": new Date()

}
