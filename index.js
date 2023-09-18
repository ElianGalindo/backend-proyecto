import express  from 'express'
import cors from 'cors'
import {initializeApp} from 'firebase/app'
import { getFirestore, collection, getDocs, setDoc, addDoc, deleteDoc, doc, getDoc, updateDoc} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDAOSH0NPRM2QX3hDp4g8uTiUxqQJOetPQ",
    authDomain: "eagv-backfront.firebaseapp.com",
    projectId: "eagv-backfront",
    storageBucket: "eagv-backfront.appspot.com",
    messagingSenderId: "875002850213",
    appId: "1:875002850213:web:df842b6f866f580cf9d64c"
  }
  
const firebase = initializeApp(firebaseConfig)
const db = getFirestore(firebase)

//settings de la aplicacion
const app = express()
app.use(express.json())
app.use(cors())



//creacion de rutas
app.get('/', async (req, res) => {
  try{
    const Users = await collection(db, 'Users')
    const listUsers = await getDocs(Users)
    const aux = []
    listUsers.forEach((doc) => {
      const obj = {
        id: doc.id,
      ...doc.data()
      }
       aux.push(obj)
    })
    res.send({
        'msg': 'success',
        'data': aux
    })
  }catch(error){
    res.send({
      'msg': 'error',
      'data': aux
  })
  }

})

app.post('/create', async (req, res) => {
  try{
    const body = req.body
    const Users = await collection(db, "Users")
    await addDoc(Users, body)
    res.send({
      'msg': 'success'
    })
  } catch(error) {
      res.send({
        'msg': 'error',
        'data': error
      })
  }
})

app.get('/delete/:id', async (req, res) => {
  console.log('$$ param => ', req.params.id)
  const id = req.params.id
  try{
    await deleteDoc(doc(db, 'Users', id))
    res.send({
      'msg': 'user deleted'
    })
  }catch (error) {
    res.send({
      'msg': 'error',
      'data': error
    })
  }
})

app.get('/get-update/:id', async (req, res) => {
  const id = req.params.id

  const userRef = doc(db, 'Users', id)
  const user = await getDoc(userRef)

  if (user.exists()) {
    res.send({
      'msg': 'success',
      'data': user.data()
    })
  } else {
    res.send({
      'msg': 'user doesnt exists'
    })
  }
})

app.post('/update', async (req, res) => {
  const {id, firstname, lastname, address, phone, city, cp} = req.body
  const newData = {
    firstname,
    lastname,
    address,
    phone,
    city,
    cp
  }
  await updateDoc(doc(db, 'Users', id), newData)
  res.send({
    'msg': 'success'
  })
  //console.log('$$ body => ', result)
})
//prendemos el servidor
app.listen(9000, () => {
    console.log('servidor trabajando')
})