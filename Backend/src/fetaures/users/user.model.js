export default class UserModel{

constructor(userID, name, email, password, createdAt){
    this.userID = userID
    this.name = name
    this.email = email
    this.password = password
    this.createdAt = createdAt;
}
  
static userRegister (name, email , password){
  const newUser = {
    userID: Date.now(),
    name:name,
    email:email,
    password:password,
    createdAt:  Date.now()
  }

  allUsers.push(newUser)

  return newUser
}


static userLogin(email, password){
    const userExixts = allUsers.find((user)=> user.email == email && user.password == password);
    // find return first matching reslut if find true elese false
    return userExixts;
}

    
}

let allUsers = [
    {
      userID:1,
      name:'',
      email:"",
      password:"",
      createdAt:""
        
     },
]